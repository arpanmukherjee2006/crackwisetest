'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Flame, 
  Clock,
  Award,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { getCompletedChapters, getTotalProgress, getAccuracy, getTotalTestsTaken, getCurrentStreak, getQuestionsAttempted } from '@/lib/progress'

export default function DashboardPage() {
  const router = useRouter()
  const [completedChapters, setCompletedChapters] = useState<any[]>([])
  const [progress, setProgress] = useState({ completed: 0, total: 0 })
  const [accuracy, setAccuracy] = useState(0)
  const [testsTaken, setTestsTaken] = useState(0)
  const [streak, setStreak] = useState(0)
  const [questionsAttempted, setQuestionsAttempted] = useState(0)
  
  useEffect(() => {
    const chapters = getCompletedChapters()
    setCompletedChapters(chapters.slice(-5).reverse()) // Show last 5, most recent first
    setProgress({ completed: chapters.length, total: 100 })
    setAccuracy(getAccuracy())
    setTestsTaken(getTotalTestsTaken())
    setStreak(getCurrentStreak())
    setQuestionsAttempted(getQuestionsAttempted())
  }, [])
  
  // Mock profile data for testing
  const profile = {
    full_name: 'Test User',
    target_exam: 'JEE',
    plan: 'free',
    streak_count: 0
  }

  const stats = [
    { label: 'Chapters Completed', value: progress.completed.toString(), icon: BookOpen, color: 'from-blue-500 to-blue-700' },
    { label: 'Accuracy', value: `${accuracy.toFixed(1)}%`, icon: Target, color: 'from-green-500 to-green-700' },
    { label: 'Tests Taken', value: testsTaken.toString(), icon: Award, color: 'from-purple-500 to-purple-700' },
    { label: 'Streak Days', value: streak.toString(), icon: Flame, color: 'from-orange-500 to-orange-700' },
  ]

  const quickActions = [
    { title: 'Continue Studying', description: 'Pick up where you left off', icon: BookOpen, href: '/subjects', color: 'orange' },
    { title: 'Take Mock Test', description: 'Test your preparation', icon: Clock, href: '/mock-tests', color: 'blue' },
    { title: 'AI Study Assistant', description: 'Get instant help', icon: Zap, href: '/ai-assistant', color: 'purple' },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-text-secondary">
            Ready to continue your {profile?.target_exam || 'JEE'} preparation?
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent-orange/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => router.push(action.href)}
                className="bg-bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-accent-orange/40 transition-all group"
              >
                <div className={`w-12 h-12 bg-${action.color}-500/10 rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className={`text-${action.color}-500`} size={24} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 group-hover:text-accent-orange transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">{action.description}</p>
                <div className="flex items-center gap-2 text-accent-orange font-semibold text-sm">
                  Get Started
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-accent-orange to-orange-700 rounded-2xl p-8 text-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={24} />
                <span className="font-semibold">AI Recommendation</span>
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">
                Start with High-Weightage Topics
              </h3>
              <p className="text-white/90 mb-6">
                Focus on chapters that contribute most to your exam score. Our AI has identified the best topics for you to start with.
              </p>
              <button
                onClick={() => router.push('/subjects')}
                className="bg-white text-accent-orange hover:bg-gray-100 rounded-lg px-6 py-3 font-semibold transition-all inline-flex items-center gap-2"
              >
                View Recommendations
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="hidden lg:block text-6xl">🎯</div>
          </div>
        </motion.div>

        {/* Recently Completed Chapters */}
        {completedChapters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-8 bg-bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary flex items-center gap-2">
                <CheckCircle className="text-success" size={24} />
                Recently Completed
              </h2>
              <button
                onClick={() => router.push('/subjects')}
                className="text-accent-orange hover:text-orange-700 text-sm font-semibold"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {completedChapters.map((chapter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg hover:bg-accent-gray transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-success" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary capitalize">
                        {chapter.chapterId.replace(/-/g, ' ')}
                      </div>
                      <div className="text-sm text-text-secondary capitalize">
                        {chapter.subjectId}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-text-secondary">
                    {new Date(chapter.completedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Upgrade Banner (for free users) */}
        {profile?.plan === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 bg-bg-card border border-accent-orange rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                  <Zap className="text-accent-orange" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    Upgrade to Premium
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Unlock unlimited AI queries, full mock tests, and detailed analytics
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push('/pricing')}
                className="bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-all"
              >
                Upgrade Now
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
