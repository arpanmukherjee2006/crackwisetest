'use client'

import { motion } from 'framer-motion'
import { User, Mail, GraduationCap, Calendar, Crown, BookOpen, Target, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getCompletedChapters, getTotalTestsTaken, getCurrentStreak } from '@/lib/progress'

export default function ProfilePage() {
  // Mock data for testing
  const user = { email: 'test@example.com' }
  const profile = {
    full_name: 'Test User',
    target_exam: 'JEE Main',
    target_year: new Date().getFullYear() + 1,
    plan: 'free',
  }

  const [stats, setStats] = useState({
    chaptersCompleted: 0,
    testsCompleted: 0,
    currentStreak: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load actual stats from localStorage
    const chapters = getCompletedChapters()
    const tests = getTotalTestsTaken()
    const streak = getCurrentStreak()
    
    console.log('Profile Stats:', {
      chaptersCompleted: chapters.length,
      testsCompleted: tests,
      currentStreak: streak,
    })
    
    setStats({
      chaptersCompleted: chapters.length,
      testsCompleted: tests,
      currentStreak: streak,
    })
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-8"
        >
          Profile
        </motion.h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-card border border-border rounded-xl p-8 mb-6"
        >
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-accent-orange rounded-full flex items-center justify-center text-4xl font-bold text-white">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                {profile?.full_name || 'Student'}
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Mail size={16} />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <GraduationCap size={16} />
                  <span>{profile?.target_exam || 'JEE Main'}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar size={16} />
                  <span>Target Year: {profile?.target_year || new Date().getFullYear() + 1}</span>
                </div>
              </div>
            </div>
            <div>
              {profile?.plan === 'premium' ? (
                <div className="bg-accent-orange/10 text-accent-orange px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                  <Crown size={16} />
                  Premium
                </div>
              ) : (
                <div className="bg-accent-gray/10 text-text-secondary px-4 py-2 rounded-lg font-semibold">
                  Free Plan
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          >
            <div className="bg-bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-blue-500" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stats.chaptersCompleted}
              </div>
              <div className="text-sm text-text-secondary">Chapters Completed</div>
            </div>
            
            <div className="bg-bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Target className="text-purple-500" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stats.testsCompleted}
              </div>
              <div className="text-sm text-text-secondary">Tests Completed</div>
            </div>
            
            <div className="bg-bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="text-orange-500" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">
                {stats.currentStreak}
              </div>
              <div className="text-sm text-text-secondary">Day Streak 🔥</div>
            </div>
          </motion.div>
        )}

        {/* Upgrade Banner */}
        {profile?.plan === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-accent-orange to-orange-700 rounded-xl p-8 text-white"
          >
            <h3 className="text-2xl font-heading font-bold mb-2">
              Upgrade to Premium
            </h3>
            <p className="text-white/90 mb-6">
              Get unlimited AI queries, full mock tests, and detailed analytics
            </p>
            <button className="bg-white text-accent-orange hover:bg-gray-100 rounded-lg px-6 py-3 font-semibold transition-all">
              View Plans
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
