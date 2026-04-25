'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, User, GraduationCap, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    targetExam: 'JEE_MAIN' as 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET',
    targetYear: new Date().getFullYear() + 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    
    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          target_exam: formData.targetExam,
          target_year: formData.targetYear,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (authData.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: formData.fullName,
          target_exam: formData.targetExam,
          target_year: formData.targetYear,
          plan: 'free',
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
      }

      router.push('/dashboard')
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-bg-card border border-border rounded-xl p-8">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Start Your Journey
        </h2>
        <p className="text-text-secondary mb-8">
          Create your account and begin smart preparation
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your name"
                required
                className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
              />
            </div>
          </div>

          <div>
            <label htmlFor="targetExam" className="block text-sm font-medium text-text-primary mb-2">
              Target Exam
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              <select
                id="targetExam"
                value={formData.targetExam}
                onChange={(e) => setFormData({ ...formData, targetExam: e.target.value as any })}
                className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:border-accent-orange appearance-none"
              >
                <option value="JEE_MAIN">JEE Main</option>
                <option value="JEE_ADVANCED">JEE Advanced</option>
                <option value="NEET">NEET</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="targetYear" className="block text-sm font-medium text-text-primary mb-2">
              Target Year
            </label>
            <input
              id="targetYear"
              type="number"
              value={formData.targetYear}
              onChange={(e) => setFormData({ ...formData, targetYear: parseInt(e.target.value) })}
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 5}
              className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-orange"
            />
          </div>

          {error && (
            <div className="bg-error/10 border border-error text-error rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="text-accent-orange hover:underline font-semibold">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}
