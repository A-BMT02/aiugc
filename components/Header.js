'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/blobbi-logo-green500-exact.png"
            alt="Blobbi"
            className="h-10 md:h-12 object-contain"
          />
          <span className="text-2xl md:text-3xl font-black tracking-tight">
            blobbi<span className="text-green-400">.</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm hover:text-green-400 transition">Features</a>
          <a href="/#pricing" className="text-sm hover:text-green-400 transition">Pricing</a>
          <a href="/#how-it-works" className="text-sm hover:text-green-400 transition">How It Works</a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm hover:text-green-400 transition">
                Sign In
              </Link>
              <Link href="/signup" className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all">
                Try Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}