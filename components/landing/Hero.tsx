'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Hero() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [])
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-heading font-bold text-text-primary mb-6"
        >
          Crack JEE & NEET with{' '}
          <span className="text-accent-orange">AI-Powered Precision</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8"
        >
          High-weightage chapters. AI study assistant. Adaptive mock tests.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {user ? (
            <Link
              href="/dashboard"
              className="bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-8 py-4 font-semibold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-8 py-4 font-semibold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Start for Free
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/pricing"
                className="bg-accent-gray text-text-primary hover:bg-[#3a3a3a] rounded-lg px-8 py-4 font-semibold text-lg transition-all hover:scale-105"
              >
                View Pricing
              </Link>
            </>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-text-primary mb-2">10,000+</div>
            <div className="text-text-secondary">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-text-primary mb-2">50+</div>
            <div className="text-text-secondary">Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent-orange mb-2">AI Powered</div>
            <div className="text-text-secondary">Smart Learning</div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-text-secondary text-sm"
        >
          Trusted by 5,000+ aspirants
        </motion.div>
      </div>
    </section>
  )
}
