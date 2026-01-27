'use client'

import { useState, useEffect, useRef } from 'react'
import { ACTORS, getVoices } from '../../../lib/constants'
import { useAvatarSelection } from '../../../hooks/useAvatarSelection'
import { useVoiceSelection } from '../../../hooks/useVoiceSelection'
import DashboardSidebar from '../../dashboard/DashboardSidebar'
import ControlPanel from '../../dashboard/ControlPanel'
import VideoPreview from '../../dashboard/VideoPreview'
import ActorLibraryModal from '../../../components/ActorLibraryModal'
import MagicEditModal from '../../../components/MagicEditModal'
import { generateSpeech, generateVideo, pollVideoUntilComplete } from '../../api/backend'
import { useAuth } from '../../../contexts/AuthContext'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase/client'

import { 
  getWorkspace, 
  updateWorkspace, 
  updateWorkspaceVideo, 
  updateWorkspaceFailed 
} from '../../../lib/database'
import { Loader2, Menu, X, Check ,Zap  } from 'lucide-react'
import { set } from 'zod'

export const dynamic = 'force-dynamic'

export default function WorkspacePage() {
  const { user, profile, loading: authLoading , updateCredits } = useAuth()

  const router = useRouter()
  const params = useParams()
  const workspaceId = params.id
  const [voices, setVoices] = useState([])

  const [workspace, setWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [workspaceName, setWorkspaceName] = useState('')
  const [script, setScript] = useState('')
  const [action, setAction] = useState('')
  const [language, setLanguage] = useState('en')
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(null)
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const [generatedAudio, setGeneratedAudio] = useState(null)
  const [editedImage, setEditedImage] = useState(null)
  const [showActorLibrary, setShowActorLibrary] = useState(false)
  const [showMagicEditModal, setShowMagicEditModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastSaved, setLastSaved] = useState(null) // Track last save time
  const [isSaving, setIsSaving] = useState(false)  // For save indicator
  const [isInitialLoad, setIsInitialLoad] = useState(true) 
  const [estimatedCredits , setEstimatedCredits] = useState(0) ;

  const hasLoadedWorkspace = useRef(false)
  const {
    selectedAvatar,
    uploadedActorImage,
    uploadedActorVideo,
    referenceType,
    isUploading,
    isUploadingVideo,
    setSelectedAvatar,
    setUploadedActorImage,
    handleSelectActor,
    handleUploadActorImage,
    handleUploadActorVideo,
    handleRemoveUploadedImage,
    handleRemoveUploadedVideo,
  } = useAvatarSelection()

  const {
    selectedVoice,
    showVoiceDropdown,
    setShowVoiceDropdown,
    playingVoiceId,
    setSelectedVoice,
    handleSelectVoice,
    handlePlayVoice,
  } = useVoiceSelection()

  useEffect(() => {
    getVoices().then(setVoices).catch(() => setVoices([]))
  }, [])

  // Load workspace data
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user && workspaceId && !hasLoadedWorkspace.current) {
      hasLoadedWorkspace.current = true
      loadWorkspace()
    }
  }, [user, authLoading, workspaceId])

  useEffect(() => {
    setEstimatedCredits(estimateCreditsFromScript(script))
  } , [script])

  const loadWorkspace = async () => {
    try {
      setLoading(true)
      setIsInitialLoad(true)
      
      const data = await getWorkspace(workspaceId)
      
      if (data.user_id !== user.id) {
        alert('You do not have access to this workspace')
        router.push('/history')
        return
      }
  
      console.log('📂 Loading workspace data:', {
        id: data.id,
        name: data.workspace_name,
        script: data.script?.substring(0, 50) + '...',
        actorId: data.actor_id,
        actorIdType: typeof data.actor_id,
        voiceId: data.voice_id,
        voiceIdType: typeof data.voice_id,
      })
  
      setWorkspace(data)
      
      // Set all basic fields
      setWorkspaceName(data.workspace_name || '')
      setScript(data.script || '')
      setAction(data.action || '')
      setLanguage(data.language || 'en')
      setAspectRatio(data.aspect_ratio || '9:16')
      
      // Set media URLs
      setGeneratedVideo(data.video_url || null)
      setGeneratedAudio(data.audio_url || null)
      setEditedImage(data.edited_image_url || null)
      
      // Set actor - IMPORTANT: Convert to number if it's a string
      if (data.actor_id) {
        // Actor IDs are numbers (1, 2, 3, etc.)
        const actorId = typeof data.actor_id === 'string' ? parseInt(data.actor_id, 10) : data.actor_id
        
        console.log('🎭 Restoring actor:', actorId, 'Type:', typeof actorId)
        console.log('🎭 Found in ACTORS?', ACTORS.find(a => a.id === actorId))
        
        handleSelectActor(actorId)
      }
      
      // Set uploaded image
      if (data.image_url && !data.actor_id) {
        console.log('🖼️ Restoring uploaded image:', data.image_url)
        setUploadedActorImage(data.image_url)
      }
      
      // Set voice
      if (data.voice_id) {
        let voiceId = data.voice_id
        
        if (typeof data.voice_id === 'string' && data.voice_id.startsWith('{')) {
          try {
            const voiceObj = JSON.parse(data.voice_id)
            voiceId = voiceObj.id
            console.log('🎤 Parsed voice ID from JSON:', voiceId)
          } catch (e) {
            console.error('❌ Failed to parse voice JSON:', e)
          }
        }
        
        console.log('🎤 Restoring voice:', voiceId)
        handleSelectVoice(voiceId)
      }
  
      console.log('✅ Workspace loaded')
  
      setTimeout(() => {
        setIsInitialLoad(false)
        console.log('🎯 Initial load complete - auto-save now enabled')
      }, 500)
  
    } catch (error) {
      console.error('❌ Error loading workspace:', error)
      alert('Failed to load workspace')
      router.push('/history')
    } finally {
      setLoading(false)
    }
  }

// Auto-save functionality with debouncing
// Auto-save functionality with debouncing
// Auto-save functionality with debouncing
useEffect(() => {
  // Skip auto-save during initial load
  if (loading || !workspace || isInitialLoad) {
    return
  }

  // Debounce auto-save by 2 seconds
  const timer = setTimeout(async () => {
    try {
      setIsSaving(true)
      
      // Get actor and voice data for display names
      const actorData = selectedAvatar ? ACTORS.find(a => a.id === selectedAvatar) : null
      const voiceData = selectedVoice ? voices.find(v => v.id === selectedVoice) : null
      
      // Ensure IDs are saved correctly
      const actorId = selectedAvatar ? String(selectedAvatar) : null
      const voiceId = typeof selectedVoice === 'object' ? selectedVoice.id : selectedVoice
      
      await updateWorkspace(workspaceId, {
        workspace_name: workspaceName,
        script,
        action,
        language,
        aspect_ratio: aspectRatio,
        actor_id: actorId,
        actor_name: actorData?.name || '',
        voice_id: voiceId,
        voice_name: voiceData?.name || '',
        image_url: uploadedActorImage,
        edited_image_url: editedImage,
      })
      
      setLastSaved(new Date())
      console.log('✅ Auto-saved')
    } catch (error) {
      console.error('❌ Auto-save error:', error)
    } finally {
      setIsSaving(false)
    }
  }, 2000) // 2 second debounce

  return () => clearTimeout(timer)
}, [
  workspaceName,
  script,
  action,
  language,
  aspectRatio,
  selectedAvatar,
  selectedVoice,
  uploadedActorImage,
  editedImage,
  workspace,
  loading,
  isInitialLoad,
  workspaceId,
])


const WORDS_PER_MINUTE = 150
const CREDITS_PER_MINUTE = 10

const estimateCreditsFromScript = (script) => {
  const words = script.trim().split(/\s+/).length
  const minutes = words / WORDS_PER_MINUTE
  return Math.ceil(minutes * CREDITS_PER_MINUTE * 10) / 10
}


const handleGenerate = async () => {

  const VIDEO_GENERATION_COST = 10

if (!profile || profile.credits_remaining < VIDEO_GENERATION_COST) {
  alert('❌ Not enough credits (10 required)')
  return
}

  if (!selectedAvatar && !uploadedActorImage && !uploadedActorVideo) {
    alert('Please select an avatar or upload an image')
    return
  }

  if (!selectedVoice) {
    alert('Please select a voice')
    return
  }

  if (!script || script.trim().length === 0) {
    alert('Please enter a script')
    return
  }

  setIsGenerating(true)
  setGenerationProgress({ step: 1, message: 'Starting generation...' })
  setIsMobileMenuOpen(false)

  const startTime = Date.now()

  try {
    // 💳 Estimate credit cost from script
const estimatedCredits = estimateCreditsFromScript(script)

console.log('📝 Script words:', script.trim().split(/\s+/).length)
console.log('⏱ Estimated minutes:', (script.trim().split(/\s+/).length / WORDS_PER_MINUTE).toFixed(2))
console.log('💳 Estimated credit cost:', estimatedCredits)

// Optional safety check
if (profile.credits_remaining < estimatedCredits) {
  alert(`Not enough credits. This video requires ~${estimatedCredits} credits.`)
  return
}


    let finalImageUrl = null
    let finalVideoUrl = null
    let finalReferenceType = referenceType

    if (referenceType === 'video' && uploadedActorVideo) {
      finalVideoUrl = uploadedActorVideo
    } else {
      const actorImage = selectedAvatar 
        ? ACTORS.find(a => a.id === selectedAvatar)?.imageUrl
        : null
      finalImageUrl = editedImage || uploadedActorImage || actorImage
    }

    
    // Extract voice ID if selectedVoice is an object (shouldn't happen, but just in case)
    const voiceId = typeof selectedVoice === 'object' ? selectedVoice.id : selectedVoice

    setGenerationProgress({ step: 2, message: 'Generating speech...' })
    const speechData = await generateSpeech(script, voiceId, { // ← Use voiceId
      clarity: 0.75,
      tone: 0.40,
      emotion: 0.0,
      speed: 1.0,
    })

    console.log('✅ Speech generated:', speechData.audioUrl)
      setGeneratedAudio(speechData.audioUrl)


     // Generate video
     setGenerationProgress({ step: 3, message: 'Creating video with lip-sync...' })
     console.log('🎬 Generating video...')

     const videoData = await generateVideo({
       imageUrl: finalImageUrl,
       videoUrl: finalVideoUrl,
       referenceType: finalReferenceType,
       audioUrl: speechData.audioUrl,
       prompt: action || 'move body and hands naturally',
       seed: Date.now(),
     })

     console.log('✅ Video task created:', videoData.requestId)

     setGenerationProgress({ step: 4, message: 'Processing video... (30-60s)' })
     
     const videoUrl = await pollVideoUntilComplete(videoData.requestId, (status) => {
       console.log('📊 Video status:', status.status)
     })

     console.log('✅ Video generated:', videoUrl)
     
     setGeneratedVideo(videoUrl)
     setGenerationProgress({ step: 5, message: 'Saving to database...' })
     
     // Save video and audio URLs to database
     await updateWorkspaceVideo(workspaceId, {
       video_url: videoUrl,
       audio_url: speechData.audioUrl,
       generation_time: Math.round((Date.now() - startTime) / 1000), // in seconds
     })
     
     console.log('✅ Saved to database')

     // Deduct credits in DB
await supabase
.from('users')
.update({
  credits_remaining: profile.credits_remaining - VIDEO_GENERATION_COST,
})
.eq('id', user.id)

// Update UI immediately
updateCredits(-estimatedCredits)


     
     setGenerationProgress({ step: 5, message: 'Complete!', progress: 100 })
     setIsGenerating(false)
     
     alert('✅ Video generated successfully!')


   
  } catch (error) {
    console.error('Generation error:', error)
    await updateWorkspaceFailed(workspaceId, error.message)
    alert('Failed to generate video: ' + error.message)
  } finally {
    setIsGenerating(false)
    setGenerationProgress(null)
  }
}

  const handleOpenActorLibrary = () => setShowActorLibrary(true)
  const handleCloseActorLibrary = () => setShowActorLibrary(false)

  const handleOpenMagicEdit = () => {
    const currentAvatarImage = selectedAvatar 
      ? ACTORS.find(a => a.id === selectedAvatar)?.imageUrl
      : null
    
    const imageToEdit = editedImage || uploadedActorImage || currentAvatarImage
    
    if (!imageToEdit) {
      alert('Please select an avatar or upload an image first')
      return
    }
    
    setShowMagicEditModal(true)
  }

  const handleEditedImage = (newImageUrl) => {
    setEditedImage(newImageUrl)
    setShowMagicEditModal(false)
  }
  
  const selectedAvatarImage = selectedAvatar 
    ? ACTORS.find(a => a.id === selectedAvatar)?.imageUrl
    : null

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-green-500" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white flex">
      <DashboardSidebar />

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white/10 rounded-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Control Panel */}
        <div
          className={`${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-0 lg:inset-auto w-full lg:w-96 xl:w-[28rem] bg-[#111111] border-r border-white/10 overflow-y-auto transition-transform z-40`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Workspace Name with Auto-Save Indicator */}
           
            <div className="mb-6">
  <div className="flex items-center justify-between mb-2">
    <label className="text-sm font-semibold">Workspace Name</label>
    
    {/* Right side: Credit Badge + Save Indicator */}
    <div className="flex items-center gap-3">
      {/* Credit Badge */}
      {profile && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
          <Zap className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-bold text-green-400">
            {typeof profile.credits_remaining === 'number' 
              ? profile.credits_remaining.toFixed(1) 
              : profile.credits_remaining || 0}
          </span>
        </div>
      )}
      
      {/* Save Indicator */}
      {isSaving ? (
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Saving...
        </span>
      ) : lastSaved ? (
        <span className="text-xs text-green-400 flex items-center gap-1">
          <Check className="w-3 h-3" />
          Saved
        </span>
      ) : null}
    </div>
  </div>
  
  <input
    type="text"
    value={workspaceName}
    onChange={(e) => setWorkspaceName(e.target.value)}
    placeholder="My UGC Video"
    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-green-500 focus:outline-none transition"
  />
</div>


            <ControlPanel
              selectedAvatar={selectedAvatar}
              onSelectActor={handleSelectActor}
              uploadedActorImage={uploadedActorImage}
              uploadedActorVideo={uploadedActorVideo}
              referenceType={referenceType}
              onUploadActorImage={handleUploadActorImage}
              onUploadActorVideo={handleUploadActorVideo}
              onRemoveUploadedImage={handleRemoveUploadedImage}
              onRemoveUploadedVideo={handleRemoveUploadedVideo}
              onOpenActorLibrary={handleOpenActorLibrary}
              onOpenMagicEdit={handleOpenMagicEdit}
              selectedVoice={selectedVoice}
              showVoiceDropdown={showVoiceDropdown}
              setShowVoiceDropdown={setShowVoiceDropdown}
              playingVoiceId={playingVoiceId}
              onSelectVoice={handleSelectVoice}
              onPlayVoice={handlePlayVoice}
              script={script}
              onScriptChange={setScript}
              action={action}
              onActionChange={setAction}
              language={language}
              onLanguageChange={setLanguage}
              aspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              generationProgress={generationProgress}
              isUploading={isUploading}
              isUploadingVideo={isUploadingVideo}
              estimatedCredits={estimatedCredits}
            />
          </div>
        </div>

        {/* Video Preview */}
        <VideoPreview
          generatedVideo={generatedVideo}
          generatedAudio={generatedAudio}
          isGenerating={isGenerating}
          generationProgress={generationProgress}
          selectedAvatarImage={selectedAvatarImage}
          uploadedActorImage={uploadedActorImage}
          uploadedActorVideo={uploadedActorVideo}
          referenceType={referenceType}
          editedImage={editedImage}
        />
      </div>

      {/* Modals */}
      <ActorLibraryModal
        isOpen={showActorLibrary}
        onClose={handleCloseActorLibrary}
        onSelectActor={handleSelectActor}
        selectedActor={selectedAvatar}
      />

      <MagicEditModal
        isOpen={showMagicEditModal}
        onClose={() => setShowMagicEditModal(false)}
        selectedAvatar={selectedAvatar}
        uploadedActorImage={uploadedActorImage}
        editedImage={editedImage}
        onEditComplete={handleEditedImage}
      />
    </div>
  )
}