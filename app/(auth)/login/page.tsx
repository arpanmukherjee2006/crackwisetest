'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email')
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMagicLinkSent(true)
    }
    setLoading(false)
  }

  if (magicLinkSent) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-bg-card border border-border rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-accent-orange" size={32} />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Check Your Email
          </h2>
          <p className="text-text-secondary mb-6">
            We've sent a magic link to <span className="text-text-primary font-semibold">{email}</span>
          </p>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="text-accent-orange hover:underline"
          >
            Try another email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-bg-card border border-border rounded-xl p-8">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Welcome Back
        </h2>
        <p className="text-text-secondary mb-8">
          Sign in to continue your preparation
        </p>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
              />
            </div>
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
            Sign In
          </button>

          <button
            type="button"
            onClick={handleMagicLink}
            disabled={loading}
            className="w-full bg-accent-gray text-text-primary hover:bg-[#3a3a3a] rounded-lg px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In with Magic Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link href="/signup" className="text-accent-orange hover:underline font-semibold">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  )
}
