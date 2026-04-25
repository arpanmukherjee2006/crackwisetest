'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { getStudyHelp } from '@/lib/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  chapterTitle: string;
  chapterContext?: string;
  chapterId?: string;
}

export default function AIAssistant({ chapterTitle, chapterContext, chapterId }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your AI study assistant for ${chapterTitle}. Ask me anything about this chapter - concepts, formulas, problems, or explanations!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    if (chapterId) {
      const historyKey = `ai-chat-${chapterId}`;
      const saved = localStorage.getItem(historyKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(messagesWithDates);
        } catch (error) {
          console.error('Error loading chat history:', error);
        }
      }
    }
  }, [chapterId]);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (chapterId && messages.length > 1) {
      const historyKey = `ai-chat-${chapterId}`;
      localStorage.setItem(historyKey, JSON.stringify(messages));
    }
  }, [messages, chapterId]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      console.log('Sending question to AI:', input);
      const context = `Chapter: ${chapterTitle}\n${chapterContext || ''}`;
      const response = await getStudyHelp(input, context);
      console.log('AI response received:', response.substring(0, 100));

      // Clean up markdown formatting and add proper line breaks
      let cleanedResponse = response
        // Remove markdown headers (###, ##, #)
        .replace(/^#{1,6}\s+/gm, '')
        // Remove bold markers (**text**)
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        // Remove italic markers (*text*)
        .replace(/\*([^*]+)\*/g, '$1')
        // Clean LaTeX math delimiters
        .replace(/\$\$/g, '')
        .replace(/\$/g, '')
        // Clean LaTeX commands
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
        // Add line breaks after sentences
        .replace(/\.\s+/g, '.\n\n')
        // Add line breaks after numbered items
        .replace(/(\d+\.)\s+/g, '\n$1 ')
        // Add line breaks before section titles (words ending with colon)
        .replace(/([A-Z][^:]*:)/g, '\n\n$1\n')
        // Clean up multiple spaces
        .replace(/\s+/g, ' ')
        // Clean up multiple line breaks
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      const assistantMessage: Message = {
        role: 'assistant',
        content: cleanedResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message || 'Please try again.'}`,
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

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg px-4 py-3 md:px-6 md:py-4 flex items-center gap-2 hover:shadow-xl transition-all font-semibold text-sm md:text-base"
      >
        <Sparkles size={18} className="md:w-5 md:h-5" />
        <span>Ask AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-4 bottom-4 right-4 left-4 md:bottom-24 md:right-6 md:left-auto md:top-auto z-50 md:w-96 md:h-[600px] bg-bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-white" size={20} />
                <div>
                  <h3 className="text-white font-semibold">AI Study Assistant</h3>
                  <p className="text-white/80 text-xs">{chapterTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-accent-orange text-white'
                        : 'bg-bg-secondary text-text-primary border border-border'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={14} className="text-purple-500" />
                        <span className="text-xs font-semibold text-purple-500">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content.split('\n').map((line, i) => {
                        // Check if line is a heading or important point
                        if (line.trim().match(/^[A-Z][^.!?]*:$/)) {
                          return (
                            <span key={i} className="block font-semibold text-base mt-3 mb-1">
                              {line}
                            </span>
                          );
                        }
                        // Check if line starts with number (numbered list)
                        if (line.trim().match(/^\d+\./)) {
                          return (
                            <span key={i} className="block ml-2 my-1">
                              {line}
                            </span>
                          );
                        }
                        // Check if line starts with bullet or dash
                        if (line.trim().match(/^[-•]/)) {
                          return (
                            <span key={i} className="block ml-2 my-1">
                              {line}
                            </span>
                          );
                        }
                        // Regular line
                        return line.trim() ? (
                          <span key={i} className="block my-2">
                            {line}
                          </span>
                        ) : (
                          <br key={i} />
                        );
                      })}
                    </p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-bg-secondary border border-border rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin text-purple-500" size={16} />
                      <span className="text-sm text-text-secondary">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-bg-secondary">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything about this chapter..."
                  disabled={loading}
                  className="flex-1 bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-purple-500 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-2 text-center">
                AI-Powered Study Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
