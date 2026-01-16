'use client'

import { useState } from 'react'
import { Volume2, ChevronDown, Play, Pause } from 'lucide-react'
import { VOICES } from '../../lib/constants'

export default function VoiceSelector({
  selectedVoice, // This is now just the ID string
  showVoiceDropdown,
  setShowVoiceDropdown,
  playingVoiceId,
  onSelectVoice,
  onPlayVoice,
}) {
  // Find the voice object from the ID
  const selectedVoiceData = selectedVoice 
    ? VOICES.find(v => v.id === selectedVoice) 
    : null

  console.log('🎤 VoiceSelector render:', {
    selectedVoiceId: selectedVoice,
    selectedVoiceData: selectedVoiceData,
    foundVoice: !!selectedVoiceData
  })

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold flex items-center gap-2">
        <Volume2 className="w-4 h-4" />
        Voice Actor
      </label>

      {/* Selected Voice Display */}
      <button
        onClick={() => setShowVoiceDropdown(!showVoiceDropdown)}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-green-500 transition flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            🎤
          </div>
          <div className="text-left min-w-0">
            <p className="font-semibold text-sm truncate">
              {selectedVoiceData?.name || 'Select a voice'}
            </p>
            {selectedVoiceData && (
              <p className="text-xs text-gray-400 truncate">
                {selectedVoiceData.gender} • {selectedVoiceData.accent}
              </p>
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${showVoiceDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Voice Dropdown */}
      {showVoiceDropdown && (
        <div className="bg-white/5 border border-white/10 rounded-lg max-h-64 overflow-y-auto">
          {VOICES.map((voice) => (
            <div
              key={voice.id}
              onClick={() => onSelectVoice(voice)} // Pass the voice object
              className={`p-3 hover:bg-white/10 cursor-pointer transition flex items-center justify-between ${
                selectedVoice === voice.id ? 'bg-green-500/20 border-l-2 border-green-500' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{voice.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {voice.gender} • {voice.accent}
                </p>
              </div>
              
              <button
                onClick={(e) => onPlayVoice(voice.id, e, voice.previewUrl)}
                className="ml-2 p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
              >
                {playingVoiceId === voice.id ? (
                  <Pause className="w-4 h-4 text-green-400" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}