'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Loader2, CreditCard, Zap, X, AlertTriangle, CheckCircle } from 'lucide-react'
import DashboardSidebar from '../dashboard/DashboardSidebar'

const PLAN_INFO = {
  free:    { label: 'Free',    price: 0,   credits: 0,   color: 'text-gray-400',  border: 'border-white/10' },
  starter: { label: 'Starter', price: 49,  credits: 40,  color: 'text-blue-400',  border: 'border-blue-500/30' },
  growth:  { label: 'Growth',  price: 69,  credits: 70,  color: 'text-green-400', border: 'border-green-500/30' },
  pro:     { label: 'Pro',     price: 119, credits: 125, color: 'text-purple-400', border: 'border-purple-500/30' },
}

const CANCEL_REASONS = [
  "It's too expensive",
  "I'm not using it enough",
  "Missing a feature I need",
  "Switching to a competitor",
  "Technical issues",
  "Just taking a break",
  "Other",
]

const STEPS = { IDLE: 'idle', REASON: 'reason', FEEDBACK: 'feedback', CONFIRM: 'confirm', DONE: 'done' }

export default function BillingPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()

  const [cancelStep, setCancelStep] = useState(STEPS.IDLE)
  const [selectedReason, setSelectedReason] = useState('')
  const [feedback, setFeedback] = useState('')
  const [canceling, setCanceling] = useState(false)
  const [canceledUntil, setCanceledUntil] = useState(null)
  const [error, setError] = useState('')

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    )
  }

  if (!user) { router.push('/login'); return null }

  const tier = profile?.subscription_tier || 'free'
  const status = profile?.subscription_status || 'inactive'
  const plan = PLAN_INFO[tier] || PLAN_INFO.free
  const isActive = ['active', 'trialing'].includes(status)
  const isCanceling = status === 'canceling'
  const endDate = profile?.subscription_end_date
    ? new Date(profile.subscription_end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  const handleCancel = async () => {
    setCanceling(true)
    setError('')
    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, reason: selectedReason, feedback }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCanceledUntil(new Date(data.cancelAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
      setCancelStep(STEPS.DONE)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setCanceling(false)
    }
  }

  const closeModal = () => {
    setCancelStep(STEPS.IDLE)
    setSelectedReason('')
    setFeedback('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <DashboardSidebar />

      <div className="flex-1 p-6 lg:p-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-1">Billing</h1>
          <p className="text-gray-400 text-sm">Manage your subscription and plan</p>
        </div>

        {/* Current Plan Card */}
        <div className={`bg-white/5 border ${plan.border} rounded-2xl p-6 mb-6`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Current Plan</p>
              <h2 className={`text-2xl font-black ${plan.color}`}>{plan.label}</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isActive ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              isCanceling ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
              'bg-gray-500/20 text-gray-400 border border-white/10'
            }`}>
              {isCanceling ? 'Canceling' : isActive ? 'Active' : status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-black/30 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Monthly price</p>
              <p className="text-xl font-bold">{plan.price > 0 ? `$${plan.price}` : 'Free'}</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Credits remaining</p>
              <p className="text-xl font-bold text-green-400">{(profile?.credits_remaining || 0).toFixed(1)}</p>
            </div>
          </div>

          {isCanceling && endDate && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-sm text-yellow-300">
              Your subscription will end on <strong>{endDate}</strong>. You keep full access until then.
            </div>
          )}
          {isActive && endDate && !isCanceling && (
            <p className="text-xs text-gray-500">Next billing date: {endDate}</p>
          )}
        </div>

        {/* Upgrade Section */}
        {tier !== 'pro' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="font-bold mb-1">Upgrade your plan</h3>
            <p className="text-sm text-gray-400 mb-4">Get more credits and unlock higher limits.</p>
            <button
              onClick={() => router.push('/onboarding')}
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-semibold text-sm transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              View Plans
            </button>
          </div>
        )}

        {/* Cancel Section */}
        {(isActive || isCanceling) && !isCanceling && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-1 text-red-400">Cancel subscription</h3>
            <p className="text-sm text-gray-400 mb-4">
              You'll keep access until the end of your billing period.
            </p>
            <button
              onClick={() => setCancelStep(STEPS.REASON)}
              className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-semibold text-sm transition"
            >
              Cancel subscription
            </button>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {cancelStep !== STEPS.IDLE && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg">

            {/* Step: Reason */}
            {cancelStep === STEPS.REASON && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">Why are you canceling?</h3>
                  <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-5">Your feedback helps us improve Blobbi for everyone.</p>
                <div className="space-y-2 mb-6">
                  {CANCEL_REASONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedReason(r)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition ${
                        selectedReason === r
                          ? 'bg-green-500/10 border-green-500/50 text-green-400'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={closeModal} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl font-semibold text-sm transition">
                    Never mind
                  </button>
                  <button
                    onClick={() => selectedReason && setCancelStep(STEPS.FEEDBACK)}
                    disabled={!selectedReason}
                    className="flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl font-semibold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step: Feedback */}
            {cancelStep === STEPS.FEEDBACK && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">One more thing</h3>
                  <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-1">Reason: <span className="text-white">{selectedReason}</span></p>
                <p className="text-sm text-gray-400 mb-4">Is there anything we could have done better? (optional)</p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what we could improve..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-green-500 focus:outline-none resize-none mb-5"
                />
                <div className="flex gap-3">
                  <button onClick={() => setCancelStep(STEPS.REASON)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl font-semibold text-sm transition">
                    Back
                  </button>
                  <button
                    onClick={() => setCancelStep(STEPS.CONFIRM)}
                    className="flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl font-semibold text-sm transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step: Confirm */}
            {cancelStep === STEPS.CONFIRM && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold">Are you sure?</h3>
                  </div>
                  <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-5 text-sm text-gray-300 space-y-1">
                  <p>✗ You'll lose access to {plan.credits} credits/month</p>
                  <p>✗ Video generation will stop at the end of your billing period</p>
                  {endDate && <p>✓ You keep full access until <strong>{endDate}</strong></p>}
                </div>
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <div className="flex gap-3">
                  <button onClick={closeModal} disabled={canceling} className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 rounded-xl font-semibold text-sm transition disabled:opacity-50">
                    Keep my plan
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={canceling}
                    className="flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {canceling ? <><Loader2 className="w-4 h-4 animate-spin" /> Canceling...</> : 'Yes, cancel'}
                  </button>
                </div>
              </div>
            )}

            {/* Step: Done */}
            {cancelStep === STEPS.DONE && (
              <div className="p-6 text-center">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Subscription canceled</h3>
                <p className="text-sm text-gray-400 mb-6">
                  {canceledUntil
                    ? `You have full access until ${canceledUntil}. We hope to see you back.`
                    : "Your subscription has been canceled. You keep access until your billing period ends."}
                </p>
                <button
                  onClick={() => { closeModal(); router.refresh() }}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-sm transition"
                >
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
