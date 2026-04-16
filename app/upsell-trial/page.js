'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Eye, EyeOff, CircleCheckBig, Loader2, AlertCircle, Zap, Video, Headphones, BookOpen } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

export default function UpsellTrialPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const sessionId = searchParams.get('session_id') || ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )

      // Create the account
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) throw signUpError

      const userId = data.user?.id
      if (!userId) throw new Error('Account creation failed. Please try again.')

      // If they paid the upsell, activate the subscription
      if (sessionId) {
        await fetch('/api/activate-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, userId }),
        })
      }

      router.push('/app/course')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto py-12 px-4">

        {/* ── HEADER ── */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
            <CircleCheckBig className="w-9 h-9 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 leading-tight">
            How the Course &amp;{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Software Works
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            You've got full access to everything you purchased today. Set your password below to access the course.
          </p>
        </div>

        {/* ── NOTICE CARD ── */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 mb-6">
          <p className="text-green-100 text-sm leading-relaxed">
            <span className="font-bold text-green-400">Important:</span> You can cancel your Growth subscription at any time.
          </p>
        </div>

        {/* ── ACCOUNT DETAILS ── */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-6 mb-6">
          <h2 className="text-base font-bold mb-5 text-center">Your Account Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
              <p className="text-green-400 text-xs mb-1 font-semibold">Course Purchase</p>
              <p className="text-white font-semibold text-sm flex items-center gap-2">
                <CircleCheckBig className="w-4 h-4 text-green-400 flex-shrink-0" />
                Successful — Lifetime Access
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
              <p className="text-green-400 text-xs mb-1 font-semibold">Blobbi Growth Subscription</p>
              <p className="text-white font-semibold text-sm flex items-center gap-2">
                <CircleCheckBig className="w-4 h-4 text-green-400 flex-shrink-0" />
                {sessionId ? 'Active — $47/month' : 'Not activated'}
              </p>
              {sessionId && <p className="text-gray-400 text-xs mt-1">Cancel anytime from your settings</p>}
            </div>
          </div>

          {/* What's included */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 space-y-3">
            {[
              { icon: BookOpen, text: 'Full lifetime access to the course' },
              { icon: Video,     text: '20+ AI UGC videos/month with Blobbi Growth' },
              { icon: Zap,       text: 'UGC Studio, AI Editor, product holding & more' },
              { icon: Headphones,text: 'Priority support from our team' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-gray-300 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PASSWORD FORM ── */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-6 mb-6">
          <h3 className="text-base font-bold mb-1 flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-400" />
            Set Your Password to Access the Course
          </h3>
          <p className="text-gray-500 text-xs mb-5">
            Account: <span className="text-gray-400">{email}</span> · Minimum 8 characters
          </p>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-green-500 focus:outline-none text-sm text-white placeholder-gray-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-green-500 focus:outline-none text-sm text-white placeholder-gray-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password strength indicators */}
            <div className="flex gap-3 text-xs text-gray-500">
              <span className={password.length >= 8 ? 'text-green-400' : ''}>8+ chars</span>
              <span className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>Uppercase</span>
              <span className={/[0-9]/.test(password) ? 'text-green-400' : ''}>Number</span>
              <span className={password && password === confirmPassword ? 'text-green-400' : ''}>Passwords match</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-green-500/25 transform hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Setting up your account...</>
              ) : (
                'Take Me To My Course'
              )}
            </button>
          </form>
        </div>

        {/* ── BILLING INFO ── */}
        {sessionId && (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6 text-center">
            <p className="text-gray-500 text-xs leading-relaxed">
              <span className="text-gray-300 font-semibold">Billing:</span> $47/month starting today. Cancel anytime. You'll keep access to everything you ordered today.
            </p>
          </div>
        )}

        {/* ── HELP ── */}
        <div className="text-center">
          <p className="text-gray-600 text-xs">
            Need help?{' '}
            <a href="mailto:hello@blobbi.ai" className="text-green-400 hover:text-green-300 transition font-semibold">
              Email hello@blobbi.ai
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
