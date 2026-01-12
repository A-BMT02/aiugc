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
    <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          {generatedVideo ? (
            <>
              <video
                ref={videoRef}
                src={generatedVideo}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={handlePlayVideo}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={handlePlayVideo}
                    className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-black" />
                    ) : (
                      <Play className="w-8 h-8 text-black ml-1" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <button 
                      onClick={handlePlayVideo}
                      className="p-2 hover:bg-white/10 rounded transition"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="p-2 hover:bg-white/10 rounded transition">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded transition">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : displayImage ? (
            <img 
              src={displayImage} 
              alt="Preview" 
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
          )}
        </div>

        {generatedAudio && !generatedVideo && (
          <div>
            <div className="mt-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayAudio}
                  className="w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>

                <div className="flex-1">
                  <p className="text-sm font-semibold">Generated Audio</p>
                  <p className="text-xs text-gray-400">Click to play voice</p>
                </div>

                <a
                  href={generatedAudio}
                  download="generated-audio.mp3"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
                  title="Download audio"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>

              <audio ref={audioRef} src={generatedAudio} className="hidden" />
            </div>
          </div>
        )}

        {generatedVideo ? (
          <a
            href={generatedVideo}
            download="ugc-video.mp4"
            className="w-full mt-4 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <Download className="w-4 h-4" />
            Download Video
          </a>
        ) : (
          <button 
            className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-lg cursor-not-allowed opacity-50 flex items-center justify-center gap-2 text-sm font-semibold"
            disabled
          >
            <Download className="w-4 h-4" />
            Download Video
          </button>
        )}
      </div>
    </div>
  )
}
