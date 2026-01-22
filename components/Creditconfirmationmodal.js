'use client'

import { X, Zap, Video } from 'lucide-react'

export default function CreditConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  creditsNeeded, 
  creditsRemaining,
  estimatedDuration 
}) {
  if (!isOpen) return null

  const creditsAfter = creditsRemaining - creditsNeeded

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full border border-white/10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Confirm Generation</h3>
              <p className="text-sm text-gray-400">Check your credits</p>
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
              <span className="text-sm text-gray-400">Estimated Duration</span>
              <span className="text-sm font-semibold">{estimatedDuration}s</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Credits Cost</span>
              <span className="text-lg font-bold text-green-400">{creditsNeeded.toFixed(1)}</span>
            </div>
            <div className="h-px bg-white/10 my-3"></div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Current Balance</span>
              <span className="text-sm font-semibold">{creditsRemaining.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">After Generation</span>
              <span className={`text-lg font-bold ${creditsAfter < 10 ? 'text-yellow-400' : 'text-white'}`}>
                {creditsAfter.toFixed(1)}
              </span>
            </div>
          </div>

          {creditsAfter < 10 && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-400 font-semibold">⚠️ Low Credits Warning</p>
              <p className="text-xs text-gray-400 mt-1">
                You'll have less than 10 credits remaining after this generation.
              </p>
            </div>
          )}

          <p className="text-sm text-gray-400 text-center">
            Do you want to proceed with video generation?
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}