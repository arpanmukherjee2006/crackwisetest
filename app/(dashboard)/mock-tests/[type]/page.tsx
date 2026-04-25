'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Clock, Target, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { generateMockTest } from '@/lib/gemini';

const TEST_CONFIGS = {
  'full-mock': {
    title: 'Full Mock Test',
    icon: Target,
    color: 'from-blue-500 to-blue-700',
    defaultQuestions: 90,
    defaultDuration: 180, // minutes
    description: 'Complete JEE/NEET exam simulation with questions from all subjects',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    questionsPerSubject: 30,
  },
  'chapter-test': {
    title: 'Chapter Test',
    icon: Clock,
    color: 'from-green-500 to-green-700',
    defaultQuestions: 25,
    defaultDuration: 30,
    description: 'Test your knowledge on specific chapters',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    questionsPerSubject: 25,
  },
  'speed-test': {
    title: 'Speed Test',
    icon: Zap,
    color: 'from-purple-500 to-purple-700',
    defaultQuestions: 10,
    defaultDuration: 10,
    description: 'Quick practice session to test your speed and accuracy',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    questionsPerSubject: 10,
  },
  'weak-area': {
    title: 'Weak Area Test',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-700',
    defaultQuestions: 30,
    defaultDuration: 40,
    description: 'Focus on topics where you need more practice',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    questionsPerSubject: 30,
  },
  'ai-custom': {
    title: 'AI Custom Test',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    defaultQuestions: 15,
    defaultDuration: 20,
    description: 'Create your own custom test with AI',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    questionsPerSubject: 15,
  },
};

export default function TestConfigPage() {
  const params = useParams();
  const router = useRouter();
  const testType = params.type as string;
  const config = TEST_CONFIGS[testType as keyof typeof TEST_CONFIGS];

  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [formData, setFormData] = useState({
    exam: 'JEE',
    subject: config?.subjects[0] || 'Physics',
    topic: '',
    numQuestions: config?.defaultQuestions || 15,
  });

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Test Type Not Found</h1>
          <button
            onClick={() => router.push('/mock-tests')}
            className="bg-accent-orange text-white px-6 py-3 rounded-lg"
          >
            Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  const Icon = config.icon;

  const handleGenerate = async () => {
    if (testType === 'chapter-test' && !formData.topic) {
      alert('Please enter a topic/chapter name');
      return;
    }

    setLoading(true);
    setLoadingProgress(0);
    try {
      let allQuestions: any[] = [];

      if (testType === 'full-mock') {
        // Generate subjects sequentially to avoid rate limit
        setLoadingProgress(20);
        
        for (let i = 0; i < config.subjects.length; i++) {
          const subject = config.subjects[i];
          console.log(`Generating questions for ${subject} (${i + 1}/${config.subjects.length})`);
          
          const questions = await generateMockTest(
            subject,
            'All Topics',
            'Mixed',
            config.questionsPerSubject
          );
          
          allQuestions.push(...questions);
          
          // Update progress
          const progress = 20 + ((i + 1) / config.subjects.length) * 60;
          setLoadingProgress(Math.round(progress));
        }
        
        console.log('Successfully generated all', allQuestions.length, 'questions');
      } else {
        // Generate questions for selected subject/topic with mixed difficulty
        setLoadingProgress(30);
        const questions = await generateMockTest(
          formData.subject,
          formData.topic || 'All Topics',
          'Mixed',
          formData.numQuestions
        );
        allQuestions = questions;
        setLoadingProgress(80);
      }

      // Store test data
      setLoadingProgress(90);
      const testData = {
        type: testType,
        config: formData,
        questions: allQuestions,
        duration: config.defaultDuration,
        startTime: Date.now(),
      };

      sessionStorage.setItem('currentTest', JSON.stringify(testData));
      setLoadingProgress(100);
      router.push('/mock-tests/attempt');
    } catch (error: any) {
      console.error('Error generating test:', error);
      
      // Check for quota exceeded error
      if (error.message === 'RATE_LIMIT_EXCEEDED' || error.message?.includes('rate_limit')) {
        alert('⚠️ API Rate Limit Exceeded\n\nThe API rate limit has been reached temporarily.\n\nPlease try again:\n• In a few minutes\n• Or contact support\n\nSorry for the inconvenience!');
      } else {
        alert('Failed to generate test. Please try again.\n\nError: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
      setLoadingProgress(0);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/mock-tests')}
          className="flex items-center gap-2 text-text-secondary hover:text-accent-orange mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Mock Tests
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card border border-border rounded-xl p-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center`}>
              <Icon className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">
                {config.title}
              </h1>
              <p className="text-text-secondary">{config.description}</p>
            </div>
          </div>

          {/* Test Info */}
          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-bg-secondary rounded-lg">
            <div>
              <div className="text-sm text-text-secondary mb-1">Duration</div>
              <div className="text-lg font-semibold text-text-primary">{config.defaultDuration} min</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary mb-1">Questions</div>
              <div className="text-lg font-semibold text-text-primary">{config.defaultQuestions}</div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Exam Type (for full mock) */}
            {testType === 'full-mock' && (
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Exam Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['JEE', 'NEET'].map((exam) => (
                    <button
                      key={exam}
                      onClick={() => setFormData({ ...formData, exam })}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        formData.exam === exam
                          ? 'bg-accent-orange text-white'
                          : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
                      }`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subject Selection (not for full mock) */}
            {testType !== 'full-mock' && (
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-orange"
                >
                  {config.subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Topic Input (for chapter test) */}
            {testType === 'chapter-test' && (
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Chapter/Topic *
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Kinematics, Thermodynamics, Calculus"
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
                />
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full bg-gradient-to-r ${config.color} text-white rounded-lg px-6 py-4 font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    <span>AI is generating your test...</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/90">
                    {testType === 'full-mock' 
                      ? 'Generating 90 questions in batches (10 at a time). This may take 2-3 minutes...'
                      : 'Generating questions in batches for better quality...'}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles size={20} />
                  Generate Test
                </div>
              )}
            </button>

            {/* Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-text-secondary">
                <span className="text-blue-500 font-semibold">💡 AI-Powered:</span> Questions are generated using advanced AI with mixed difficulty levels (Easy, Medium, Hard). Questions are generated in batches of 10 for better quality and reliability.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
