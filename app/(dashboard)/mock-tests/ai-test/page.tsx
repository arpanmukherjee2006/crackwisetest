'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { generateMockTest } from '@/lib/gemini';

export default function AITestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: 'Physics',
    topic: '',
    difficulty: 'Medium',
    numQuestions: 10,
  });

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleGenerate = async () => {
    if (!formData.topic) {
      alert('Please enter a topic');
      return;
    }

    setLoading(true);
    try {
      const questions = await generateMockTest(
        formData.subject,
        formData.topic,
        formData.difficulty,
        formData.numQuestions
      );

      // Store questions in sessionStorage and navigate to test
      sessionStorage.setItem('aiTestQuestions', JSON.stringify(questions));
      sessionStorage.setItem('aiTestConfig', JSON.stringify(formData));
      router.push('/mock-tests/ai-test/attempt');
    } catch (error) {
      console.error('Error generating test:', error);
      alert('Failed to generate test. Please try again.');
    } finally {
      setLoading(false);
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">
                AI-Generated Mock Test
              </h1>
              <p className="text-text-secondary">Powered by Advanced AI</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-orange"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Topic
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., Kinematics, Thermodynamics, Calculus"
                className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setFormData({ ...formData, difficulty: diff })}
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      formData.difficulty === diff
                        ? 'bg-accent-orange text-white'
                        : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Number of Questions: {formData.numQuestions}
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={formData.numQuestions}
                onChange={(e) => setFormData({ ...formData, numQuestions: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>5</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-6 py-4 font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating Test...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate AI Test
                </>
              )}
            </button>

            {/* Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-text-secondary">
                <span className="text-blue-500 font-semibold">💡 Tip:</span> AI will generate unique questions based on your selected topic and difficulty. Each test is different!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
