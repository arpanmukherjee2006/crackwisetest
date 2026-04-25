'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Clock, Target, Zap, TrendingUp, Sparkles, History, Calendar, Award, Eye, X, CheckCircle, XCircle } from 'lucide-react'
import { getTestAttempts } from '@/lib/progress'
import { useState, useEffect } from 'react'

export default function MockTestsPage() {
  const router = useRouter();
  const [testHistory, setTestHistory] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    const attempts = getTestAttempts();
    // Sort by date descending (most recent first)
    const sorted = attempts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTestHistory(sorted.slice(0, 20)); // Show last 20 attempts
  }, []);

  const viewTestDetails = (attempt: any) => {
    setSelectedTest(attempt);
    setShowDetails(true);
  };
  
  const testTypes = [
    {
      title: 'Speed Test',
      description: 'Quick AI-powered practice',
      duration: '10 min',
      questions: 10,
      icon: Zap,
      color: 'from-purple-500 to-purple-700',
      premium: false,
      href: '/mock-tests/speed-test',
      comingSoon: false,
    },
    {
      title: 'Chapter Test',
      description: 'Test specific chapters with AI',
      duration: '30 min',
      questions: 25,
      icon: Clock,
      color: 'from-green-500 to-green-700',
      premium: false,
      href: '/mock-tests/chapter-test',
      comingSoon: false,
    },
    {
      title: 'Weak Area Test',
      description: 'AI focuses on weak topics',
      duration: '40 min',
      questions: 30,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-700',
      premium: false,
      href: '/mock-tests/weak-area',
      comingSoon: false,
    },
    {
      title: 'Full Mock Test',
      description: 'Complete exam simulation with AI',
      duration: '3 hours',
      questions: 90,
      icon: Target,
      color: 'from-blue-500 to-blue-700',
      premium: false,
      href: null,
      comingSoon: true,
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-2"
        >
          Mock Tests
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary mb-8"
        >
          Test your preparation with AI-generated mock tests
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testTypes.map((test, index) => (
            <motion.div
              key={test.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent-orange/40 transition-all"
            >
              <div className={`h-32 bg-gradient-to-br ${test.color} p-6 flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <test.icon className="text-white relative z-10" size={48} />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-text-primary mb-1">
                      {test.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{test.description}</p>
                  </div>
                  {test.premium && (
                    <span className="bg-accent-orange/10 text-accent-orange text-xs font-semibold px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
                  <span>{test.duration}</span>
                  <span>•</span>
                  <span>{test.questions} questions</span>
                </div>
                <button 
                  onClick={() => test.href ? router.push(test.href) : null}
                  disabled={!test.href || test.comingSoon}
                  className="w-full bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-4 py-3 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {test.comingSoon ? (
                    'Coming Soon'
                  ) : test.href ? (
                    <>
                      <Sparkles size={16} />
                      Start AI Test
                    </>
                  ) : (
                    'Coming Soon'
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Test History Section */}
        {testHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <History className="text-accent-orange" size={24} />
              <h2 className="text-2xl font-heading font-bold text-text-primary">Recent Test History</h2>
            </div>
            
            <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg-secondary border-b border-border">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Test Type</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-text-primary">Questions</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-text-primary">Correct</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-text-primary">Score</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-text-primary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testHistory.map((attempt, index) => (
                      <tr key={index} className="border-b border-border last:border-0 hover:bg-bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-text-secondary text-sm">
                            <Calendar size={16} />
                            {new Date(attempt.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-primary font-medium">
                          {attempt.testId.includes('speed') ? 'Speed Test' : 
                           attempt.testId.includes('chapter') ? 'Chapter Test' : 
                           attempt.testId.includes('weak') ? 'Weak Area Test' : 'Mock Test'}
                        </td>
                        <td className="px-6 py-4 text-center text-text-secondary">
                          {attempt.totalQuestions}
                        </td>
                        <td className="px-6 py-4 text-center text-text-secondary">
                          {attempt.correctAnswers}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Award 
                              size={18} 
                              className={
                                attempt.score >= 80 ? 'text-success' : 
                                attempt.score >= 60 ? 'text-yellow-500' : 
                                'text-error'
                              } 
                            />
                            <span className={`font-bold ${
                              attempt.score >= 80 ? 'text-success' : 
                              attempt.score >= 60 ? 'text-yellow-500' : 
                              'text-error'
                            }`}>
                              {attempt.score.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => viewTestDetails(attempt)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-orange text-white rounded-lg hover:bg-orange-700 transition-all text-sm font-semibold"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Test Details Modal */}
        <AnimatePresence>
          {showDetails && selectedTest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-white mb-1">Test Results</h2>
                    <p className="text-white/80 text-sm">
                      {selectedTest.testId.includes('speed') ? 'Speed Test' : 
                       selectedTest.testId.includes('chapter') ? 'Chapter Test' : 
                       selectedTest.testId.includes('weak') ? 'Weak Area Test' : 'Mock Test'}
                      {' • '}
                      {new Date(selectedTest.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Score Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-bg-secondary border border-border rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-text-primary mb-1">
                        {selectedTest.totalQuestions}
                      </div>
                      <div className="text-sm text-text-secondary">Total Questions</div>
                    </div>
                    <div className="bg-bg-secondary border border-border rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-success mb-1">
                        {selectedTest.correctAnswers}
                      </div>
                      <div className="text-sm text-text-secondary">Correct Answers</div>
                    </div>
                    <div className="bg-bg-secondary border border-border rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold mb-1 ${
                        selectedTest.score >= 80 ? 'text-success' : 
                        selectedTest.score >= 60 ? 'text-yellow-500' : 
                        'text-error'
                      }`}>
                        {selectedTest.score.toFixed(1)}%
                      </div>
                      <div className="text-sm text-text-secondary">Score</div>
                    </div>
                  </div>

                  {/* Performance Analysis */}
                  {selectedTest.analysis && (
                    <div className="bg-bg-secondary border border-border rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-heading font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Sparkles className="text-purple-500" size={20} />
                        AI Analysis
                      </h3>
                      <div className="text-text-secondary whitespace-pre-wrap leading-relaxed">
                        {selectedTest.analysis}
                      </div>
                    </div>
                  )}

                  {/* Questions Review */}
                  {selectedTest.questions && selectedTest.answers && (
                    <div>
                      <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                        Questions Review
                      </h3>
                      <div className="space-y-4">
                        {selectedTest.questions.map((question: any, index: number) => {
                          const userAnswer = selectedTest.answers[index];
                          const isCorrect = userAnswer === question.correctAnswer;
                          
                          return (
                            <div
                              key={index}
                              className={`bg-bg-secondary border-2 rounded-xl p-4 ${
                                isCorrect ? 'border-success/30' : 'border-error/30'
                              }`}
                            >
                              <div className="flex items-start gap-3 mb-3">
                                {isCorrect ? (
                                  <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                                ) : (
                                  <XCircle className="text-error flex-shrink-0 mt-1" size={20} />
                                )}
                                <div className="flex-1">
                                  <div className="font-semibold text-text-primary mb-2">
                                    Q{index + 1}. {question.question}
                                  </div>
                                  <div className="space-y-1 text-sm">
                                    <div className={`${userAnswer === question.correctAnswer ? 'text-success font-semibold' : 'text-text-secondary'}`}>
                                      Your Answer: {userAnswer || 'Not Answered'}
                                    </div>
                                    {!isCorrect && (
                                      <div className="text-success font-semibold">
                                        Correct Answer: {question.correctAnswer}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* If no detailed data available */}
                  {!selectedTest.questions && !selectedTest.analysis && (
                    <div className="text-center py-12 text-text-secondary">
                      <p>Detailed test data not available for this attempt.</p>
                      <p className="text-sm mt-2">Only basic score information is saved.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
