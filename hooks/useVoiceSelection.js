'use client'

import { useState, useRef } from 'react'

export function useVoiceSelection() {
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false)
  const [playingVoiceId, setPlayingVoiceId] = useState(null)
  const audioRef = useRef(null)

  const handleSelectVoice = (voiceOrId) => {
    console.log('🎤 handleSelectVoice called with:', voiceOrId, 'Type:', typeof voiceOrId)
    
    // Handle both voice object and voice ID string
    if (typeof voiceOrId === 'string') {
      // It's a voice ID, just store it
      setSelectedVoice(voiceOrId)
      console.log('✅ Voice ID selected:', voiceOrId)
    } else if (voiceOrId && typeof voiceOrId === 'object') {
      // It's a voice object, extract the ID
      setSelectedVoice(voiceOrId.id)
      console.log('✅ Voice object selected:', voiceOrId.name, '(ID:', voiceOrId.id + ')')
    } else {
      console.warn('⚠️ Invalid voice selection:', voiceOrId)
      setSelectedVoice(null)
    }
    
    setShowVoiceDropdown(false)
  }

  const handlePlayVoice = async (voiceId, event, previewUrl) => {
    event?.stopPropagation()
  
    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  
    // If clicking same voice, just stop
    if (playingVoiceId === voiceId) {
      setPlayingVoiceId(null)
      return
    }
  
    try {
      setPlayingVoiceId(voiceId)
  
      // Check if static preview exists
      if (previewUrl) {
        console.log('🎵 Playing static preview (no credits used)')
        audioRef.current = new Audio(previewUrl)
      } else {
        console.log('⚠️ No preview available for this voice')
        alert('Preview not available for this voice yet')
        setPlayingVoiceId(null)
        return
      }
      
      audioRef.current.onended = () => {
        setPlayingVoiceId(null)
        audioRef.current = null
      }
  
      audioRef.current.onerror = () => {
        console.error('Audio playback error')
        setPlayingVoiceId(null)
        audioRef.current = null
      }
  
      await audioRef.current.play()
  
    } catch (error) {
      console.error('Voice preview error:', error)
      setPlayingVoiceId(null)
    }
  }

  return {
    selectedVoice,
    setSelectedVoice,
    showVoiceDropdown,
    playingVoiceId,
    setShowVoiceDropdown,
    handleSelectVoice,
    handlePlayVoice,
  }
}