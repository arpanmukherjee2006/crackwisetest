'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function AttemptTestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const questionsData = sessionStorage.getItem('aiTestQuestions');
    const configData = sessionStorage.getItem('aiTestConfig');
    
    if (!questionsData || !configData) {
      router.push('/mock-tests/ai-test');
      return;
    }

    const parsedQuestions = JSON.parse(questionsData);
    const config = JSON.parse(configData);
    
    setQuestions(parsedQuestions);
    setTimeLeft(config.numQuestions * 90); // 90 seconds per question
  }, [router]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: (correct / questions.length) * 100 };
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-primary">Loading test...</div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg-card border border-border rounded-xl p-8 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-white" size={48} />
            </div>
            
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Test Completed!
            </h1>
            <p className="text-text-secondary mb-8">Here's how you performed</p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-bg-secondary rounded-lg p-6">
                <div className="text-3xl font-bold text-text-primary mb-1">{score.correct}</div>
                <div className="text-sm text-text-secondary">Correct</div>
              </div>
              <div className="bg-bg-secondary rounded-lg p-6">
                <div className="text-3xl font-bold text-text-primary mb-1">{score.total - score.correct}</div>
                <div className="text-sm text-text-secondary">Incorrect</div>
              </div>
              <div className="bg-bg-secondary rounded-lg p-6">
                <div className="text-3xl font-bold text-accent-orange mb-1">{score.percentage.toFixed(1)}%</div>
                <div className="text-sm text-text-secondary">Score</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="text-left space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Question Review</h2>
              {questions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <div key={index} className="bg-bg-secondary rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                      ) : (
                        <XCircle className="text-error flex-shrink-0 mt-1" size={20} />
                      )}
                      <div className="flex-1">
                        <p className="text-text-primary font-semibold mb-2">Q{index + 1}. {q.question}</p>
                        <div className="text-sm space-y-1">
                          <p className="text-text-secondary">
                            Your answer: <span className={isCorrect ? 'text-success' : 'text-error'}>{userAnswer || 'Not answered'}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-text-secondary">
                              Correct answer: <span className="text-success">{q.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                        {q.explanation && (
                          <details className="mt-2">
                            <summary className="text-sm text-accent-orange cursor-pointer">View Explanation</summary>
                            <p className="text-sm text-text-secondary mt-2 pl-4 border-l-2 border-accent-orange/20">
                              {q.explanation}
                            </p>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push('/mock-tests')}
                className="flex-1 bg-bg-secondary text-text-primary rounded-lg px-6 py-3 font-semibold hover:bg-accent-gray transition-all"
              >
                Back to Tests
              </button>
              <button
                onClick={() => router.push('/mock-tests/ai-test')}
                className="flex-1 bg-accent-orange text-white rounded-lg px-6 py-3 font-semibold hover:bg-orange-700 transition-all"
              >
                Take Another Test
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Timer and Progress */}
        <div className="bg-bg-card border border-border rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-accent-orange" size={20} />
            <span className="text-text-primary font-semibold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="text-text-secondary text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-bg-card border border-border rounded-xl p-8 mb-6"
        >
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {Object.entries(currentQ.options).map(([key, value]: [string, any]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  answers[currentQuestion] === key
                    ? 'border-accent-orange bg-accent-orange/10 text-text-primary'
                    : 'border-border bg-bg-secondary text-text-primary hover:border-accent-orange/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-bg-primary rounded-full flex items-center justify-center text-sm font-semibold">
                    {key}
                  </span>
                  <span>{value}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-bg-secondary text-text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-gray transition-all"
          >
            Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-accent-orange text-white rounded-lg hover:bg-orange-700 transition-all"
            >
              Submit Test
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-accent-orange text-white rounded-lg hover:bg-orange-700 transition-all"
            >
              Next
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
