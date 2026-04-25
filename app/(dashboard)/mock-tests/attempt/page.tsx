'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, TrendingDown, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeMistakes } from '@/lib/gemini';
import { saveTestAttempt } from '@/lib/progress';

export default function AttemptTestPage() {
  const router = useRouter();
  const [testData, setTestData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [showLoadingNotification, setShowLoadingNotification] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('currentTest');
    
    if (!data) {
      router.push('/mock-tests');
      return;
    }

    const parsed = JSON.parse(data);
    setTestData(parsed);
    setTimeLeft(parsed.duration * 60); // Convert to seconds
    
    // If test is partial, listen for updates
    if (parsed.isPartial) {
      console.log('Test is partial, waiting for full questions...');
      setShowLoadingNotification(true);
      
      // Check for updates every 2 seconds
      const interval = setInterval(() => {
        const updatedData = sessionStorage.getItem('currentTest');
        if (updatedData) {
          const updatedParsed = JSON.parse(updatedData);
          if (!updatedParsed.isPartial && updatedParsed.questions.length > parsed.questions.length) {
            console.log('Full test loaded! Updating from', parsed.questions.length, 'to', updatedParsed.questions.length, 'questions');
            setTestData(updatedParsed);
            setShowLoadingNotification(false);
            clearInterval(interval);
          }
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [router]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults && testData) {
      handleSubmit();
    }
  }, [timeLeft, showResults, testData]);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setShowResults(true);
    
    // Calculate score
    const score = calculateScore();
    
    // Get incorrect questions for AI analysis
    const incorrectQuestions = testData.questions
      .map((q: any, index: number) => ({
        ...q,
        userAnswer: answers[index],
        index,
      }))
      .filter((q: any) => q.userAnswer && q.userAnswer !== q.correctAnswer);

    let analysis = '';
    if (incorrectQuestions.length > 0) {
      setLoadingAnalysis(true);
      try {
        analysis = await analyzeMistakes(incorrectQuestions);
        setAiAnalysis(analysis);
      } catch (error) {
        console.error('Error getting AI analysis:', error);
        analysis = 'Unable to generate AI analysis at this time.';
      } finally {
        setLoadingAnalysis(false);
      }
    } else {
      analysis = 'Great job! All answers are correct. Keep up the excellent work!';
    }
    
    // Save test attempt with full details to localStorage
    const testAttempt = {
      testId: `${testData.type}-${Date.now()}`,
      date: new Date().toISOString(),
      score: score.percentage,
      totalQuestions: testData.questions.length,
      correctAnswers: score.correct,
      questions: testData.questions,
      answers: answers,
      analysis: analysis,
    };
    
    console.log('Saving test attempt:', testAttempt); // Debug log
    saveTestAttempt(testAttempt);
  };

  const calculateScore = () => {
    let correct = 0;
    let attempted = 0;
    const subjectWise: Record<string, { correct: number; total: number }> = {};
    const topicWise: Record<string, { correct: number; total: number }> = {};

    testData.questions.forEach((q: any, index: number) => {
      const userAnswer = answers[index];
      if (userAnswer) attempted++;
      
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correct++;

      // Subject-wise analysis
      const subject = q.subject || testData.config.subject;
      if (!subjectWise[subject]) {
        subjectWise[subject] = { correct: 0, total: 0 };
      }
      subjectWise[subject].total++;
      if (isCorrect) subjectWise[subject].correct++;

      // Topic-wise analysis
      const topic = q.topic || 'General';
      if (!topicWise[topic]) {
        topicWise[topic] = { correct: 0, total: 0 };
      }
      topicWise[topic].total++;
      if (isCorrect) topicWise[topic].correct++;
    });

    return {
      correct,
      incorrect: attempted - correct,
      unattempted: testData.questions.length - attempted,
      total: testData.questions.length,
      percentage: (correct / testData.questions.length) * 100,
      subjectWise,
      topicWise,
    };
  };

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-primary">Loading test...</div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const weakTopics = Object.entries(score.topicWise)
      .filter(([_, data]) => (data.correct / data.total) < 0.5)
      .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));

    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center mb-4 ${
                score.percentage >= 75 ? 'bg-gradient-to-br from-green-500 to-green-700' :
                score.percentage >= 50 ? 'bg-gradient-to-br from-yellow-500 to-yellow-700' :
                'bg-gradient-to-br from-red-500 to-red-700'
              }`}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{score.percentage.toFixed(1)}%</div>
                  <div className="text-xs md:text-sm text-white/80">Score</div>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
                Test Completed!
              </h1>
              <p className="text-sm md:text-base text-text-secondary">
                {score.percentage >= 75 ? 'Excellent performance! 🎉' :
                 score.percentage >= 50 ? 'Good effort! Keep practicing 💪' :
                 'Need more practice. Don\'t give up! 📚'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-bg-secondary rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-success mb-1">{score.correct}</div>
                <div className="text-xs md:text-sm text-text-secondary">Correct</div>
              </div>
              <div className="bg-bg-secondary rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-error mb-1">{score.incorrect}</div>
                <div className="text-xs md:text-sm text-text-secondary">Incorrect</div>
              </div>
              <div className="bg-bg-secondary rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-text-secondary mb-1">{score.unattempted}</div>
                <div className="text-xs md:text-sm text-text-secondary">Unattempted</div>
              </div>
              <div className="bg-bg-secondary rounded-lg p-3 md:p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent-orange mb-1">{score.total}</div>
                <div className="text-xs md:text-sm text-text-secondary">Total</div>
              </div>
            </div>

            {/* Subject-wise Performance */}
            {Object.keys(score.subjectWise).length > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Subject-wise Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(score.subjectWise).map(([subject, data]) => {
                    const percentage = (data.correct / data.total) * 100;
                    return (
                      <div key={subject} className="bg-bg-secondary rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-text-primary">{subject}</span>
                          <span className="text-sm text-text-secondary">{data.correct}/{data.total}</span>
                        </div>
                        <div className="w-full bg-bg-primary rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              percentage >= 70 ? 'bg-success' :
                              percentage >= 50 ? 'bg-yellow-500' :
                              'bg-error'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weak Topics */}
            {weakTopics.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <TrendingDown className="text-error" size={20} />
                  Topics Needing Attention
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {weakTopics.slice(0, 6).map(([topic, data]) => (
                    <div key={topic} className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-sm text-text-primary">{topic}</span>
                      <span className="text-sm text-error font-semibold">
                        {((data.correct / data.total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Analysis */}
            {loadingAnalysis && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                  <span className="text-text-secondary">AI is analyzing your performance...</span>
                </div>
              </div>
            )}

            {aiAnalysis && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <AlertCircle className="text-purple-500" size={20} />
                  AI Performance Analysis
                </h3>
                <div className="text-xs md:text-sm text-text-secondary leading-relaxed space-y-3">
                  {aiAnalysis.split('\n').map((line, i) => {
                    // Skip empty lines
                    if (!line.trim()) return null;
                    
                    // Main headings (lines with numbers like "1.", "2.")
                    if (/^\d+\./.test(line.trim())) {
                      return (
                        <div key={i} className="font-semibold text-text-primary mt-4 first:mt-0">
                          {line}
                        </div>
                      );
                    }
                    
                    // Bullet points
                    if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                      return (
                        <div key={i} className="ml-4 flex gap-2">
                          <span className="text-purple-500 shrink-0">•</span>
                          <span>{line.replace(/^[-*]\s*/, '')}</span>
                        </div>
                      );
                    }
                    
                    // Regular text
                    return <div key={i}>{line}</div>;
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Detailed Question Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-bg-card border border-border rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Question Review</h2>
            <div className="space-y-4">
              {testData.questions.map((q: any, index: number) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                const isAttempted = !!userAnswer;
                
                return (
                  <div key={index} className={`rounded-lg p-5 border ${
                    !isAttempted ? 'bg-bg-secondary border-border' :
                    isCorrect ? 'bg-success/5 border-success/20' :
                    'bg-error/5 border-error/20'
                  }`}>
                    <div className="flex items-start gap-3 mb-3">
                      {!isAttempted ? (
                        <div className="w-6 h-6 bg-text-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs text-white">-</span>
                        </div>
                      ) : isCorrect ? (
                        <CheckCircle className="text-success flex-shrink-0 mt-1" size={24} />
                      ) : (
                        <XCircle className="text-error flex-shrink-0 mt-1" size={24} />
                      )}
                      <div className="flex-1">
                        <p className="text-text-primary font-semibold mb-3">
                          Q{index + 1}. {q.question}
                        </p>
                        
                        {/* Options */}
                        <div className="space-y-2 mb-3">
                          {Object.entries(q.options).map(([key, value]: [string, any]) => (
                            <div
                              key={key}
                              className={`p-2 rounded text-sm ${
                                key === q.correctAnswer ? 'bg-success/10 text-success font-semibold' :
                                key === userAnswer && !isCorrect ? 'bg-error/10 text-error' :
                                'text-text-secondary'
                              }`}
                            >
                              {key}. {value}
                              {key === q.correctAnswer && ' ✓'}
                              {key === userAnswer && !isCorrect && ' ✗'}
                            </div>
                          ))}
                        </div>

                        {/* Explanation */}
                        {q.explanation && (
                          <details className="mt-3">
                            <summary className="text-sm text-accent-orange cursor-pointer font-semibold">
                              View Detailed Explanation
                            </summary>
                            <div className="mt-3 p-4 bg-bg-primary rounded-lg border-l-4 border-accent-orange">
                              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                                {q.explanation}
                              </p>
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6">
            <button
              onClick={() => router.push('/mock-tests')}
              className="flex-1 bg-bg-secondary text-text-primary rounded-lg px-4 md:px-6 py-2.5 md:py-3 font-semibold hover:bg-accent-gray transition-all text-sm md:text-base"
            >
              Back to Tests
            </button>
            <button
              onClick={() => router.push(`/mock-tests/${testData.type}`)}
              className="flex-1 bg-accent-orange text-white rounded-lg px-4 md:px-6 py-2.5 md:py-3 font-semibold hover:bg-orange-700 transition-all text-sm md:text-base"
            >
              Take Another Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = testData.questions[currentQuestion];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Timer and Progress */}
        <div className="bg-bg-card border border-border rounded-xl p-3 md:p-4 mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className={`${timeLeft < 300 ? 'text-error animate-pulse' : 'text-accent-orange'}`} size={18} />
            <span className={`font-semibold text-sm md:text-base ${timeLeft < 300 ? 'text-error' : 'text-text-primary'}`}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="text-text-secondary text-xs md:text-sm">
            Question {currentQuestion + 1} of {testData.questions.length}
          </div>
          <div className="text-text-secondary text-xs md:text-sm">
            Attempted: {Object.keys(answers).length}/{testData.questions.length}
          </div>
        </div>

        {/* Loading Notification */}
        {showLoadingNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4 flex items-center gap-3"
          >
            <Loader2 className="animate-spin text-blue-500" size={20} />
            <div className="text-sm text-text-secondary">
              <span className="text-blue-500 font-semibold">Loading more questions...</span> You can start with the first {testData.questions.length} questions. Remaining questions will be added automatically.
            </div>
          </motion.div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
          >
            <h2 className="text-base md:text-lg lg:text-xl font-semibold text-text-primary mb-4 md:mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-2 md:space-y-3">
              {Object.entries(currentQ.options).map(([key, value]: [string, any]) => (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  className={`w-full text-left p-3 md:p-4 rounded-lg border transition-all ${
                    answers[currentQuestion] === key
                      ? 'border-accent-orange bg-accent-orange/10 text-text-primary'
                      : 'border-border bg-bg-secondary text-text-primary hover:border-accent-orange/40'
                  }`}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="w-7 h-7 md:w-8 md:h-8 bg-bg-primary rounded-full flex items-center justify-center text-xs md:text-sm font-semibold shrink-0">
                      {key}
                    </span>
                    <span className="text-sm md:text-base">{value}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-bg-secondary text-text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-gray transition-all text-sm md:text-base"
          >
            <ArrowLeft size={18} className="md:w-5 md:h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          {currentQuestion === testData.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-accent-orange text-white rounded-lg hover:bg-orange-700 transition-all text-sm md:text-base"
            >
              <span>Submit Test</span>
              <CheckCircle size={18} className="md:w-5 md:h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-accent-orange text-white rounded-lg hover:bg-orange-700 transition-all text-sm md:text-base"
            >
              <span>Next</span>
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
