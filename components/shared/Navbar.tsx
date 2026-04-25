'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading font-bold text-text-primary">
            CrackWise
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-text-primary hover:text-accent-orange transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-accent-gray text-text-primary hover:bg-[#3a3a3a] rounded-lg px-6 py-2 font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="text-text-primary hover:text-accent-orange transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-2 font-semibold transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-secondary border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/about"
              className="block text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-accent-gray text-text-primary hover:bg-[#3a3a3a] rounded-lg px-6 py-3 font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="block w-full text-center bg-accent-gray text-text-primary hover:bg-[#3a3a3a] rounded-lg px-6 py-3 font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="block w-full text-center bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
