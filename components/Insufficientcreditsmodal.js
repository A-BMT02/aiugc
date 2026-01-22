'use client'

import { X, Zap, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function InsufficientCreditsModal({ isOpen, onClose, creditsNeeded, creditsRemaining }) {
  const router = useRouter()

  if (!isOpen) return null

  const shortage = creditsNeeded - creditsRemaining

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full border border-white/10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Insufficient Credits</h3>
              <p className="text-sm text-gray-400">You need more credits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Credits Needed</span>
              <span className="text-lg font-bold text-white">{creditsNeeded.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Your Balance</span>
              <span className="text-lg font-bold text-red-400">{creditsRemaining.toFixed(1)}</span>
            </div>
            <div className="h-px bg-white/10 my-3"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Shortage</span>
              <span className="text-lg font-bold text-red-400">-{shortage.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center">
            Upgrade your plan to get more credits and continue creating amazing videos!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onClose()
              router.push('/onboarding')
            }}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Upgrade Plan
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}