'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  BookOpen, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Zap,
  Sparkles,
  BookMarked
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mock user data for testing
  const user = { email: 'test@example.com' }
  const profile = { full_name: 'Test User', target_exam: 'JEE', plan: 'free' }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    router.push('/')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Study', href: '/subjects', icon: BookOpen },
    { name: 'Mock Tests', href: '/mock-tests', icon: FileText },
    { name: 'My Notes', href: '/notes', icon: BookMarked },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg-secondary border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/dashboard" className="text-xl font-heading font-bold text-text-primary">
            CrackWise
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-text-primary"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-bg-secondary border-r border-border transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center h-16 px-6 border-b border-border">
            <Link href="/dashboard" className="text-2xl font-heading font-bold text-text-primary">
              CrackWise
            </Link>
          </div>

          {/* User Info */}
          {mounted && user && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.email?.[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text-primary truncate">
                    {profile?.full_name || user.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-text-secondary flex items-center gap-1">
                    <GraduationCap size={12} />
                    {profile?.target_exam || 'JEE'}
                  </div>
                </div>
              </div>
              {profile?.plan === 'free' && (
                <Link
                  href="/pricing"
                  className="mt-3 flex items-center justify-center gap-2 bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
                >
                  <Zap size={14} />
                  Upgrade to Premium
                </Link>
              )}
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent-orange text-white'
                      : 'text-text-secondary hover:bg-bg-card hover:text-text-primary'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-card hover:text-error transition-colors w-full"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {children}
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
