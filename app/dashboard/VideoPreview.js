'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Maximize, Video, Download, Sparkles, Music, Check, Loader2 } from 'lucide-react'

export default function VideoPreview({ 
  uploadedActorImage, 
  selectedAvatarImage, 
  editedImage,
  generatedAudio,
  generatedVideo,
  isGenerating,
  generationProgress,
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  const videoRef = useRef(null)

  // Priority: Generated Video > Edited Image > Uploaded > Selected
  const displayImage = editedImage || uploadedActorImage || selectedAvatarImage

  // ✅ FIX: define hasContent
  const hasContent = Boolean(
    generatedVideo || generatedAudio || displayImage
  )

  // Handle audio playback
  const handlePlayAudio = () => {
    if (!audioRef.current) return

    if (isPlayingAudio) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    } else {
      audioRef.current.play()
      setIsPlayingAudio(true)
    }
  }

  // Handle video playback
  const handlePlayVideo = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  // Setup audio events
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlayingAudio(false)
      audioRef.current.onerror = () => {
        console.error('Audio playback error')
        setIsPlayingAudio(false)
      }
    }
  }, [generatedAudio])

  // Setup video events
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current

      video.onplay = () => setIsPlaying(true)
      video.onpause = () => setIsPlaying(false)
      video.onended = () => setIsPlaying(false)
      
      video.ontimeupdate = () => {
        setCurrentTime(video.currentTime)
        setDuration(video.duration || 0)
      }

      video.onerror = () => {
        console.error('Video playback error')
        setIsPlaying(false)
      }
    }
  }, [generatedVideo])

  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Video/Image Preview */}
        <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
          {/* Loading Overlay */}
          {isGenerating && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4">
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 animate-spin mb-4" />
              <p className="text-sm sm:text-base font-semibold text-center">
                {generationProgress?.message || 'Processing...'}
              </p>
              {generationProgress?.step && (
                <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center">
                  Step {generationProgress.step} of 5
                </p>
              )}
              {generationProgress?.progress > 0 && (
                <div className="w-full max-w-xs mt-4">
                  <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${generationProgress.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video Player */}
          {generatedVideo ? (
            <>
              <video
                ref={videoRef}
                src={generatedVideo}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={handlePlayVideo}
              />

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={handlePlayVideo}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black ml-1" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : displayImage ? (
            <img 
              src={displayImage} 
              alt="Preview" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
        </div>

        {/* Audio Player */}
        {generatedAudio && !generatedVideo && (
          <div className="mt-3 sm:mt-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePlayAudio}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition flex-shrink-0"
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold truncate">Generated Audio</p>
                <p className="text-[10px] sm:text-xs text-gray-400">Click to play voice</p>
              </div>

              <a
                href={generatedAudio}
                download="generated-audio.mp3"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>

            <audio ref={audioRef} src={generatedAudio} className="hidden" />
          </div>
        )}

        {/* Download Button */}
        {generatedVideo ? (
          <a
            href={generatedVideo}
            download="ugc-video.mp4"
            className="w-full mt-3 sm:mt-4 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 rounded-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-lg"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Download Video
          </a>
        ) : (
          <button 
            className="w-full mt-3 sm:mt-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg cursor-not-allowed opacity-50 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold"
            disabled
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Download Video
          </button>
        )}

        {/* Info Text */}
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-[10px] sm:text-xs text-gray-400">
            {hasContent
              ? generatedVideo 
                ? 'Your video is ready to download'
                : generatedAudio
                ? 'Audio ready - generating video...'
                : 'Preview your avatar'
              : 'Select an avatar and generate your video'}
          </p>
        </div>
      </div>
    </div>
  )
}
