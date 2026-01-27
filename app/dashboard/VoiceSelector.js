'use client'

import { useState, useEffect } from 'react'
import { Volume2, ChevronDown, Play, Pause, Loader2 } from 'lucide-react'
import { getVoices } from '../../lib/constants'

export default function VoiceSelector({
  selectedVoice, // This is now just the ID string
  showVoiceDropdown,
  setShowVoiceDropdown,
  playingVoiceId,
  onSelectVoice,
  onPlayVoice,
}) {
  const [voices, setVoices] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch voices on mount
  useEffect(() => {
    async function loadVoices() {
      try {
        const fetchedVoices = await getVoices()
        setVoices(fetchedVoices)
      } catch (error) {
        console.error('Failed to load voices:', error)
        // Set empty array on error - you could also set fallback voices here
        setVoices([])
      } finally {
        setLoading(false)
      }
    }
    
    loadVoices()
  }, [])

  // Find the voice object from the ID
  const selectedVoiceData = selectedVoice 
    ? voices.find(v => v.id === selectedVoice) 
    : null

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
        disabled={loading}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '🎤'}
          </div>
          <div className="text-left min-w-0">
            <p className="font-semibold text-sm truncate">
              {loading ? 'Loading voices...' : (selectedVoiceData?.name || 'Select a voice')}
            </p>
            {selectedVoiceData && !loading && (
              <p className="text-xs text-gray-400 truncate">
                {selectedVoiceData.gender} • {selectedVoiceData.accent}
              </p>
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${showVoiceDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Voice Dropdown */}
      {showVoiceDropdown && !loading && (
        <div className="bg-white/5 border border-white/10 rounded-lg max-h-64 overflow-y-auto">
          {voices.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No voices available
            </div>
          ) : (
            voices.map((voice) => (
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
            ))
          )}
        </div>
      )}
    </div>
  )
}