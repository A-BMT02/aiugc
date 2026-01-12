'use client'


import { useState } from 'react'
import { ACTORS } from '../../lib/constants'
import { useAvatarSelection } from '../../hooks/useAvatarSelection'
import { useVoiceSelection } from '../../hooks/useVoiceSelection'
import DashboardSidebar from './DashboardSidebar'
import ControlPanel from './ControlPanel'
import VideoPreview from './VideoPreview'
import ActorLibraryModal from '../../components/ActorLibraryModal'
import MagicEditModal from '../../components/MagicEditModal'
import { generateSpeech ,  generateVideo, pollVideoUntilComplete } from '../../lib/api/backend'

export default function Dashboard() {
  // State
  const [activeTab, setActiveTab] = useState('actor-library')
  const [script, setScript] = useState('')
  const [action, setAction] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showActorModal, setShowActorModal] = useState(false)
  const [showMagicEditModal, setShowMagicEditModal] = useState(false)
  const [editedImage, setEditedImage] = useState(null)
  const [generatedAudio, setGeneratedAudio] = useState(null)
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const [generationProgress, setGenerationProgress] = useState(null)

  // Custom Hooks
  const {
    selectedAvatar,
    uploadedActorImage,
    quickActors,
    isUploading, 
    handleSelectActor,
    handleUploadActorImage,
    handleRemoveUploadedImage,
  } = useAvatarSelection()

  const {
    selectedVoice,
    showVoiceDropdown,
    playingVoiceId,
    setShowVoiceDropdown,
    handleSelectVoice,
    handlePlayVoice,
  } = useVoiceSelection()

  // Get selected avatar image URL
  const selectedAvatarData = ACTORS.find(a => a.id === selectedAvatar)
  const selectedAvatarImage = selectedAvatarData?.imageUrl || null

  // Handlers
  const handleGenerate = async () => {
    // Validation
    if (!selectedAvatar && !uploadedActorImage) {
      alert('Please select an avatar')
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

    try {
      console.log('🎬 Starting full video generation pipeline...')
      console.log('👤 Avatar:', selectedAvatarData?.name)
      console.log('🎙️ Voice:', selectedVoice.name)
      console.log('📝 Script:', script)
      console.log('🎭 Action:', action || 'None')

    
// Step 1: Get avatar image - PRIORITY: Edited > Uploaded > Selected
const finalImage = editedImage || uploadedActorImage || selectedAvatarImage
console.log('🖼️ Using image:', finalImage)

      if (!finalImage) {
        throw new Error('No avatar image available')
      }

      // Step 2: Generate speech from script
      setGenerationProgress({ step: 2, message: 'Generating speech...' })
      console.log('🎙️ Generating speech...')
      
      const speechData = await generateSpeech(script, selectedVoice.elevenLabsId)
      console.log('✅ Speech generated:', speechData.audioUrl)
      
      // Save generated audio for preview
      setGeneratedAudio(speechData.audioUrl)

      // Step 3: Generate video with lip-sync
      setGenerationProgress({ step: 3, message: 'Creating video with lip-sync...' })
      console.log('🎬 Generating video with InfiniTalk...')
      
      const { requestId } = await generateVideo({
        imageUrl: finalImage,
        audioUrl: speechData.audioUrl,
        prompt: action || 'make natural body and hand movements',
        seed: Date.now(),
      })
      
      console.log('✅ Video task created:', requestId)
      setGenerationProgress({ step: 4, message: 'Processing video... (30-60s)' })

      // Step 4: Poll for video completion
      const videoUrl = await pollVideoUntilComplete(requestId, (status) => {
        console.log('📊 Video status:', status.status)
        
        const messages = {
          processing: 'Processing video...',
          completed: 'Video complete!',
          failed: 'Video generation failed',
        }
        
        setGenerationProgress({
          step: 4,
          message: messages[status.status] || 'Processing...',
          status: status.status,
          progress: status.progress || 0,
        })
      })

      console.log('✅ Video generated:', videoUrl)
      
      // Save generated video
      setGeneratedVideo(videoUrl)
      setGenerationProgress({ step: 5, message: 'Complete!' })

      setIsGenerating(false)
      
      // Success notification
      alert('✅ Video generated successfully!\n\nYour video is ready to preview and download.')

    } catch (error) {
      console.error('❌ Generation error:', error)
      setIsGenerating(false)
      setGenerationProgress(null)
      alert('Failed to generate video: ' + error.message)
    }
  }

  const handleOpenActorLibrary = () => {
    setShowActorModal(true)
  }

  const handleSelectActorFromModal = (actorId) => {
    handleSelectActor(actorId)
    setActiveTab('actor-library')
  }

  const handleEditComplete = (editedImageUrl) => {
    setEditedImage(editedImageUrl)
    console.log('✅ Dashboard received edited image:', editedImageUrl)
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Control Panel */}
        <ControlPanel
         isUploading={isUploading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          quickActors={quickActors}
          selectedAvatar={selectedAvatar}
          onSelectActor={handleSelectActor}
          uploadedActorImage={uploadedActorImage}
          onUploadActorImage={handleUploadActorImage}
          onRemoveUploadedImage={handleRemoveUploadedImage}
          onOpenActorLibrary={handleOpenActorLibrary}
          onOpenMagicEdit={() => setShowMagicEditModal(true)}
          totalActors={ACTORS.length}
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
        />

        {/* Video Preview */}
        <VideoPreview 
          uploadedActorImage={uploadedActorImage}
          selectedAvatarImage={selectedAvatarImage}
          editedImage={editedImage}
          generatedAudio={generatedAudio}
          generatedVideo={generatedVideo}
          isGenerating={isGenerating}
          generationProgress={generationProgress}
        />
      </div>

      {/* Modals */}
      <ActorLibraryModal
        isOpen={showActorModal}
        onClose={() => setShowActorModal(false)}
        onSelectActor={handleSelectActorFromModal}
        selectedAvatar={selectedAvatar}
      />

  

<MagicEditModal
  isOpen={showMagicEditModal}
  onClose={() => setShowMagicEditModal(false)}
  selectedAvatar={selectedAvatar}
  uploadedActorImage={uploadedActorImage}
  editedImage={editedImage}  // ← ADD THIS
  onEditComplete={handleEditComplete}
/>
    </div>
  )
}