'use client'

import { Loader2, Zap } from 'lucide-react'

export default function GenerateButton({ 
  isGenerating, 
  disabled, 
  onClick,
  selectedAvatar,
  uploadedActorImage,  // ← ADD THIS
  selectedVoice,
  script,
  generationProgress,
}) {
  // Check what's missing
  const hasAvatar = selectedAvatar || uploadedActorImage  // ← Updated
  const hasVoice = selectedVoice
  const hasScript = script && script.trim().length > 0

  const missingItems = []
  if (!hasAvatar) missingItems.push('avatar')
  if (!hasVoice) missingItems.push('voice')
  if (!hasScript) missingItems.push('script')

  const isDisabled = disabled || isGenerating || missingItems.length > 0

  return (
    <div>
      {/* Generate Button */}
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-3 ${
          isDisabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/50'
        }`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            Generate Video
          </>
        )}
      </button>

      {/* Missing Items Warning */}
      {missingItems.length > 0 && !isGenerating && (
        <div className="mt-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <p className="text-xs text-yellow-400 font-semibold mb-1">
            ⚠️ Missing Required:
          </p>
          <ul className="text-xs text-yellow-400/80 space-y-0.5">
            {missingItems.map(item => (
              <li key={item}>• {item.charAt(0).toUpperCase() + item.slice(1)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Generation Progress */}
      {isGenerating && generationProgress && (
        <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">
            {generationProgress.message}
          </p>
          {generationProgress.step && (
            <p className="text-xs text-gray-400 mb-2">
              Step {generationProgress.step} of 5
            </p>
          )}
          {generationProgress.progress > 0 && (
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
                style={{ width: `${generationProgress.progress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}