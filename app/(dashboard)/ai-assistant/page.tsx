'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Send, Loader2, ArrowLeft, BookOpen, Lightbulb, Calculator, Zap, History, Trash2, MessageCircle } from 'lucide-react';
import { getStudyHelp } from '@/lib/gemini';
import { updateDailyActivity } from '@/lib/progress';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  chapterId: string;
  chapterTitle: string;
  messages: Message[];
  lastUpdated: string;
}

export default function AIAssistantPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your AI Study Assistant for JEE/NEET preparation. 

I can help you with:
• Explaining concepts and theories
• Solving problems step-by-step
• Clarifying doubts
• Providing formulas and equations
• Giving exam tips and strategies

Ask me anything about Physics, Chemistry, Mathematics, or Biology!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadChatHistories();
  }, []);

  const loadChatHistories = () => {
    const histories: ChatHistory[] = [];
    
    // Get all localStorage keys that start with 'ai-chat-'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ai-chat-')) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            const chapterId = key.replace('ai-chat-', '');
            
            // Convert timestamp strings back to Date objects
            const messagesWithDates = parsed.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }));
            
            // Get chapter title from first message or use chapterId
            const chapterTitle = messagesWithDates[0]?.content.includes('AI study assistant for') 
              ? messagesWithDates[0].content.split('AI study assistant for ')[1]?.split('.')[0] || chapterId
              : chapterId;
            
            histories.push({
              chapterId,
              chapterTitle,
              messages: messagesWithDates,
              lastUpdated: messagesWithDates[messagesWithDates.length - 1]?.timestamp || new Date(),
            });
          }
        } catch (error) {
          console.error('Error loading chat history:', error);
        }
      }
    }
    
    // Sort by last updated (most recent first)
    histories.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    setChatHistories(histories);
  };

  const clearHistory = (chapterId: string) => {
    if (confirm('Are you sure you want to delete this chat history?')) {
      localStorage.removeItem(`ai-chat-${chapterId}`);
      loadChatHistories();
    }
  };

  const clearAllHistory = () => {
    if (confirm('Are you sure you want to delete all chat histories?')) {
      chatHistories.forEach(history => {
        localStorage.removeItem(`ai-chat-${history.chapterId}`);
      });
      loadChatHistories();
    }
  };

  const loadChat = (history: ChatHistory) => {
    setMessages(history.messages);
    setShowHistory(false);
  };

  const quickQuestions = [
    { icon: BookOpen, text: 'Explain Newton\'s Laws', color: 'from-blue-500 to-blue-700' },
    { icon: Calculator, text: 'Solve quadratic equations', color: 'from-purple-500 to-purple-700' },
    { icon: Lightbulb, text: 'What is Ohm\'s Law?', color: 'from-yellow-500 to-yellow-700' },
    { icon: Zap, text: 'Organic Chemistry basics', color: 'from-green-500 to-green-700' },
  ];

  const handleSend = async (question?: string) => {
    const questionText = question || input;
    if (!questionText.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: questionText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await getStudyHelp(questionText);
      
      // Update streak when AI query is made
      updateDailyActivity('ai_query');

      // Clean up markdown formatting and add proper line breaks
      let cleanedResponse = response
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/\$\$/g, '')
        .replace(/\$/g, '')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1/$2)')
        .replace(/\\rho/g, 'ρ')
        .replace(/\\sigma/g, 'σ')
        .replace(/\\tau/g, 'τ')
        .replace(/\\pi/g, 'π')
        .replace(/\\theta/g, 'θ')
        .replace(/\\alpha/g, 'α')
        .replace(/\\beta/g, 'β')
        .replace(/\\gamma/g, 'γ')
        .replace(/\\Delta/g, 'Δ')
        .replace(/\\lambda/g, 'λ')
        .replace(/\\mu/g, 'μ')
        .replace(/\\omega/g, 'ω')
        .replace(/\\\\/g, '')
        .replace(/\\left/g, '')
        .replace(/\\right/g, '')
        .replace(/\{/g, '')
        .replace(/\}/g, '')
        .replace(/\.\s+/g, '.\n\n')
        .replace(/(\d+\.)\s+/g, '\n$1 ')
        .replace(/([A-Z][^:]*:)/g, '\n\n$1\n')
        .replace(/\s+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      const assistantMessage: Message = {
        role: 'assistant',
        content: cleanedResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent-orange" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-text-secondary hover:text-accent-orange mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-heading font-bold text-text-primary">AI Study Assistant</h1>
                <p className="text-text-secondary">Your personal JEE/NEET preparation tutor</p>
              </div>
            </div>
            
            {/* History Toggle Button */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-lg hover:border-accent-orange transition-all"
            >
              <History size={20} className="text-accent-orange" />
              <span className="hidden md:inline text-text-primary font-semibold">
                {showHistory ? 'Hide History' : 'Chat History'}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && !showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="text-sm font-semibold text-text-secondary mb-3">Quick Questions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(q.text)}
                  className="flex items-center gap-3 p-4 bg-bg-card border border-border rounded-lg hover:border-accent-orange/40 transition-all text-left group"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${q.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <q.icon className="text-white" size={20} />
                  </div>
                  <span className="text-text-primary group-hover:text-accent-orange transition-colors">
                    {q.text}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat History Section */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-text-primary">Chat History</h2>
              {chatHistories.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-semibold">Clear All</span>
                </button>
              )}
            </div>
            
            {chatHistories.length === 0 ? (
              <div className="bg-bg-card border border-border rounded-xl p-12 text-center">
                <MessageCircle className="mx-auto mb-4 text-text-secondary opacity-50" size={48} />
                <p className="text-text-secondary">No chat history yet. Start chatting with chapters!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {chatHistories.map((history) => (
                  <div
                    key={history.chapterId}
                    className="bg-bg-card border border-border rounded-xl p-4 hover:border-accent-orange/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 cursor-pointer" onClick={() => loadChat(history)}>
                        <h3 className="font-semibold text-text-primary mb-1 hover:text-accent-orange transition-colors">
                          {history.chapterTitle}
                        </h3>
                        <p className="text-sm text-text-secondary mb-2">
                          {history.messages.length} messages • Last updated: {new Date(history.lastUpdated).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <div className="text-sm text-text-secondary line-clamp-2 mb-3">
                          {history.messages[history.messages.length - 1]?.content.substring(0, 150)}...
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            loadChat(history);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-accent-orange text-white rounded-lg hover:bg-orange-700 transition-all text-sm font-semibold"
                        >
                          <MessageCircle size={16} />
                          Open Chat
                        </button>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearHistory(history.chapterId);
                        }}
                        className="text-error hover:bg-error/10 p-2 rounded-lg transition-all"
                        title="Delete history"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Chat Container */}
        {!showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
            style={{ height: 'calc(100vh - 350px)', minHeight: '500px' }}
          >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-6 py-4 ${
                    message.role === 'user'
                      ? 'bg-accent-orange text-white'
                      : 'bg-bg-secondary text-text-primary border border-border'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={16} className="text-purple-500" />
                      <span className="text-xs font-semibold text-purple-500">AI Assistant</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content.split('\n').map((line, i) => {
                      if (line.trim().match(/^[A-Z][^.!?]*:$/)) {
                        return (
                          <span key={i} className="block font-semibold text-base mt-3 mb-1">
                            {line}
                          </span>
                        );
                      }
                      if (line.trim().match(/^\d+\./)) {
                        return (
                          <span key={i} className="block ml-2 my-1">
                            {line}
                          </span>
                        );
                      }
                      if (line.trim().match(/^[-•]/)) {
                        return (
                          <span key={i} className="block ml-2 my-1">
                            {line}
                          </span>
                        );
                      }
                      return line.trim() ? (
                        <span key={i} className="block my-2">
                          {line}
                        </span>
                      ) : (
                        <br key={i} />
                      );
                    })}
                  </div>
                  {typeof window !== 'undefined' && (
                    <p className="text-xs opacity-60 mt-3">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-bg-secondary border border-border rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-purple-500" size={20} />
                    <span className="text-sm text-text-secondary">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-border bg-bg-secondary">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about JEE/NEET topics..."
                disabled={loading}
                className="flex-1 bg-bg-card border border-border rounded-xl px-6 py-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-purple-500 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-6 py-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={20} />
                <span className="hidden md:inline">Send</span>
              </button>
            </div>
            <p className="text-xs text-text-secondary mt-3 text-center">
              AI-Powered Assistant • Press Enter to send
            </p>
          </div>
        </motion.div>
        )}
      </div>
    </div>
  );
}
