'use client'


import { useState , useEffect } from 'react'
import { ACTORS } from '../../lib/constants'
import { useAvatarSelection } from '../../hooks/useAvatarSelection'
import { useVoiceSelection } from '../../hooks/useVoiceSelection'
import DashboardSidebar from './DashboardSidebar'
import ControlPanel from './ControlPanel'
import VideoPreview from './VideoPreview'
import ActorLibraryModal from '../../components/ActorLibraryModal'
import MagicEditModal from '../../components/MagicEditModal'
import { generateSpeech ,  generateVideo, pollVideoUntilComplete , uploadReferenceVideo } from '../../lib/api/backend'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter , useSearchParams  } from 'next/navigation'
import ActorSelector from './ActorSelector'
import CustomActorUpload from './CustomActorUpload'
import { Loader2, Menu, X } from 'lucide-react'

export default function DashboardPage() {




  const { user, loading } = useAuth()
  const router = useRouter()

  
  // const [activeTab, setActiveTab] = useState('actor-library')
  const [script, setScript] = useState('')
  const [action, setAction] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(null)
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const [generatedAudio, setGeneratedAudio] = useState(null)
  const [editedImage, setEditedImage] = useState(null)
  const [showActorLibrary, setShowActorLibrary] = useState(false)
  const [showMagicEditModal, setShowMagicEditModal] = useState(false)

  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Hooks
  const {
    selectedAvatar,
    uploadedActorImage,
    uploadedActorVideo,      // From hook
    referenceType,           // From hook
    isUploading,
    isUploadingVideo,        // From hook
    handleSelectActor,
    handleUploadActorImage,
    handleUploadActorVideo,  // From hook
    handleRemoveUploadedImage,
    handleRemoveUploadedVideo, // From hook
  } = useAvatarSelection()

  const {
    selectedVoice,
    showVoiceDropdown,
    setShowVoiceDropdown,
    playingVoiceId,
    handleSelectVoice,
    handlePlayVoice,
  } = useVoiceSelection()

  // Get selected avatar image URL

  const selectedActorData = ACTORS.find(a => a.id === selectedAvatar)
const selectedAvatarImage = selectedActorData?.imageUrl

  // Handle OAuth callback if code is present
  useEffect(() => {
    
    if (code) {
      console.log('🔄 Processing OAuth code on dashboard...')
      // Supabase will automatically exchange the code
      // Just remove the code from URL to clean it up
      router.replace('/dashboard')
    }
  }, [router])



  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

    // Show loading spinner while checking auth
    if (loading) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      )
    }

  if (!user) {
    return null
  }



  // Handlers
  const handleOpenActorLibrary = () => {
    setShowActorLibrary(true)
  }

  const handleEditComplete = (editedImageUrl) => {
    console.log('✅ Edit complete:', editedImageUrl)
    setEditedImage(editedImageUrl)
  }

  const handleGenerate = async () => {
    // Validation
    if (!selectedAvatar && !uploadedActorImage && !uploadedActorVideo) {
      alert('Please select an avatar, upload an image, or upload a reference video')
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

    try {
      console.log('🎬 Starting full video generation pipeline...')

      // Determine reference (video takes priority)
      let finalImageUrl = null
      let finalVideoUrl = null
      let finalReferenceType = referenceType

      if (referenceType === 'video' && uploadedActorVideo) {
        finalVideoUrl = uploadedActorVideo
        console.log('🎥 Using video reference:', finalVideoUrl)
      } else {
        finalImageUrl = editedImage || uploadedActorImage || selectedAvatarImage
        console.log('🖼️ Using image reference:', finalImageUrl)
      }

      if (!finalImageUrl && !finalVideoUrl) {
        throw new Error('No reference image or video available')
      }

      // Generate speech
      setGenerationProgress({ step: 2, message: 'Generating speech...' })
      console.log('🎙️ Generating speech...')

      const speechData = await generateSpeech(script, selectedVoice, {
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
      setGenerationProgress({ step: 5, message: 'Complete!', progress: 100 })
      setIsGenerating(false)
      
      alert('✅ Video generated successfully!')

    } catch (error) {
      console.error('❌ Generation error:', error)
      setIsGenerating(false)
      setGenerationProgress(null)
      
      if (error.message.includes('timeout')) {
        alert('⏱️ Video generation timeout. Please try again.')
      } else {
        alert('Failed to generate video: ' + error.message)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar - Desktop: Always visible, Mobile: Hidden */}
      <DashboardSidebar className="hidden lg:flex" />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 border-b border-white/10 bg-[#111111]">
        <h1 className="text-lg font-bold">UGC Builder</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row pt-16 lg:pt-0">
        {/* Control Panel - Desktop: Always visible, Mobile: Slide-in */}
        <div className={`
          fixed lg:static inset-0 z-40 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-full lg:w-[420px]
          bg-[#111111] lg:border-r border-white/10
          overflow-y-auto
          mt-16 lg:mt-0
        `}>
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-bold">Controls</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <ControlPanel
            // activeTab={activeTab}
            // setActiveTab={setActiveTab}
            selectedAvatar={selectedAvatar}
            onSelectActor={handleSelectActor}
            uploadedActorImage={uploadedActorImage}
            onUploadActorImage={handleUploadActorImage}
            onRemoveUploadedImage={handleRemoveUploadedImage}
            onOpenActorLibrary={handleOpenActorLibrary}
            onOpenMagicEdit={() => setShowMagicEditModal(true)}
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
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            generationProgress={generationProgress}
            isUploading={isUploading}

            uploadedActorVideo={uploadedActorVideo}              // NEW
            referenceType={referenceType}                        // NEW
            onUploadActorVideo={handleUploadActorVideo}          // NEW
            onRemoveUploadedVideo={handleRemoveUploadedVideo}    // NEW
            isUploadingVideo={isUploadingVideo}  
          />
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-30 mt-16"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Video Preview */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <VideoPreview
  selectedAvatarImage={selectedAvatarImage}  // ← Add this
  uploadedActorImage={uploadedActorImage}
  editedImage={editedImage}
  generatedAudio={generatedAudio}
  generatedVideo={generatedVideo}
  isGenerating={isGenerating}
  generationProgress={generationProgress}
/>
        </div>
      </div>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-20">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-base transition-all shadow-lg"
        >
          {isGenerating ? 'Generating...' : 'Open Controls'}
        </button>
      </div>

      {/* Modals */}
      <ActorLibraryModal
        isOpen={showActorLibrary}
        onClose={() => setShowActorLibrary(false)}
        onSelectActor={(actorId) => {
          handleSelectActor(actorId)
          setShowActorLibrary(false)
        }}
        selectedAvatar={selectedAvatar}
      />

      <MagicEditModal
        isOpen={showMagicEditModal}
        onClose={() => setShowMagicEditModal(false)}
        selectedAvatar={selectedAvatar}
        uploadedActorImage={uploadedActorImage}
        editedImage={editedImage}
        onEditComplete={handleEditComplete}
      />
    </div>
  )
}