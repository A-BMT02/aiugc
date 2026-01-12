'use client'

import { ChevronDown, Play, Pause, Check } from 'lucide-react'
import { VOICES } from '../../lib/constants'

export default function VoiceSelector({
  selectedVoice,
  showVoiceDropdown,
  setShowVoiceDropdown,
  playingVoiceId,
  onSelectVoice,
  onPlayVoice
}) {
  return (
    <div className="relative">
      <label className="text-sm font-semibold mb-2 block">Select a voice...</label>
      
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setShowVoiceDropdown(!showVoiceDropdown)}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 transition flex items-center justify-between text-sm"
      >
        <span className={selectedVoice ? 'text-white' : 'text-gray-400'}>
          {selectedVoice ? selectedVoice.name : 'Choose a voice...'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showVoiceDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Voice Dropdown */}
      {showVoiceDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl z-10 max-h-80 overflow-y-auto">
          {VOICES.map((voice) => (
            <div
              key={voice.id}
              onClick={() => onSelectVoice(voice)}
              className={`w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition border-b border-white/5 last:border-b-0 cursor-pointer ${
                selectedVoice?.id === voice.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onPlayVoice(voice.elevenLabsId, e, voice.previewUrl) // ✅ Pass previewUrl URL
                  }}
                  className="p-2 bg-white/10 hover:bg-green-500/20 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!voice.previewUrl} // ✅ Disable if no previewUrl
                  title={voice.previewUrl ? 'Play preview' : 'Preview not available'}
                >
                  {playingVoiceId === voice.elevenLabsId ? (
                    <Pause className="w-3 h-3 text-green-400" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </button>
                <div className="text-left">
                  <div className="text-sm font-semibold">{voice.name}</div>
                  <div className="text-xs text-gray-400">
                    {voice.gender} • {voice.accent}
                    {!voice.previewUrl && <span className="text-amber-400"> • No preview</span>}
                  </div>
                </div>
              </div>
              {selectedVoice?.id === voice.id && (
                <Check className="w-4 h-4 text-green-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}