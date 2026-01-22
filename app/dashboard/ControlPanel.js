'use client'

import React, { useEffect } from 'react'
import { Users, Upload, ChevronRight, X } from 'lucide-react'
import ActorSelector from './ActorSelector'
import CustomActorUpload from './CustomActorUpload'
import VoiceSelector from './VoiceSelector'
import ScriptEditor from './ScriptEditor'
import ActionEditor from './ActionEditor'
import AdvancedSettings from './AdvancedSettings'

export default function ControlPanel({
  selectedAvatar,
  onSelectActor,
  uploadedActorImage,
  uploadedActorVideo,
  referenceType,
  onUploadActorImage,
  onUploadActorVideo,
  onRemoveUploadedImage,
  onRemoveUploadedVideo,
  onOpenActorLibrary,
  onOpenMagicEdit,
  selectedVoice,
  showVoiceDropdown,
  setShowVoiceDropdown,
  playingVoiceId,
  onSelectVoice,
  onPlayVoice,
  script,
  onScriptChange,
  action,
  onActionChange,
  language,
  onLanguageChange,
  aspectRatio,
  onAspectRatioChange,
  isGenerating,
  onGenerate,
  generationProgress,
  isUploading,
  isUploadingVideo,
  estimatedCredits,
}) {
  // Determine initial tab based on whether custom avatar exists
  const hasCustomAvatar = !!(uploadedActorImage || uploadedActorVideo)
  const [activeTab, setActiveTab] = React.useState(
    hasCustomAvatar ? 'custom-avatar' : 'actor-library'
  )

  // Auto-switch to custom tab when user uploads
  useEffect(() => {
    if (uploadedActorImage || uploadedActorVideo) {
      setActiveTab('custom-avatar')
    }
  }, [uploadedActorImage, uploadedActorVideo])

  return (
    <div className="w-full h-full overflow-y-auto bg-[#111111] pb-24 lg:pb-6">
      {/* Header - Hidden on mobile */}
      <div className="hidden lg:block p-4 sm:p-5 lg:p-6 border-b border-white/10">
        <h2 className="text-lg sm:text-xl font-bold">Create Video</h2>
        <p className="text-xs sm:text-sm text-gray-400">Generate UGC content with AI</p>
      </div>

      {/* ONLY 2 TABS - Actor Library & Custom Avatar */}
      <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6 border-b border-white/10">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('actor-library')}
            className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
              activeTab === 'actor-library'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Actor Library
          </button>
          <button
            onClick={() => setActiveTab('custom-avatar')}
            className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
              activeTab === 'custom-avatar'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Custom Avatar
            {hasCustomAvatar && (
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Tab Content - Actor Selection */}
        {activeTab === 'actor-library' ? (
          <ActorSelector
            selectedAvatar={selectedAvatar}
            onSelectActor={onSelectActor}
            onOpenActorLibrary={onOpenActorLibrary}
            onOpenMagicEdit={onOpenMagicEdit}
          />
        ) : (
          <CustomActorUpload
            uploadedActorImage={uploadedActorImage}
            uploadedActorVideo={uploadedActorVideo}
            referenceType={referenceType}
            onUploadActorImage={onUploadActorImage}
            onUploadActorVideo={onUploadActorVideo}
            onRemoveUploadedImage={onRemoveUploadedImage}
            onRemoveUploadedVideo={onRemoveUploadedVideo}
            onOpenMagicEdit={onOpenMagicEdit}
            isUploading={isUploading}
            isUploadingVideo={isUploadingVideo}
          />
        )}

        {/* Voice Selection - ALWAYS VISIBLE */}
        <VoiceSelector
          selectedVoice={selectedVoice}
          showVoiceDropdown={showVoiceDropdown}
          setShowVoiceDropdown={setShowVoiceDropdown}
          playingVoiceId={playingVoiceId}
          onSelectVoice={onSelectVoice}
          onPlayVoice={onPlayVoice}
        />

        {/* Script Editor - ALWAYS VISIBLE */}
        <ScriptEditor
          script={script}
          onScriptChange={onScriptChange}
        />

        {/* Action Prompt - ALWAYS VISIBLE */}
        <ActionEditor
          action={action}
          onActionChange={onActionChange}
        />

        {/* Advanced Settings - ALWAYS VISIBLE */}
        <AdvancedSettings
          language={language}
          onLanguageChange={onLanguageChange}
          aspectRatio={aspectRatio}
          onAspectRatioChange={onAspectRatioChange}
        />

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="hidden lg:flex w-full py-3 sm:py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              {generationProgress?.message || 'Generating...'}
            </>
          ) : (
            `Generate Video ( ~${estimatedCredits} credits )`
          )}
        </button>
      </div>
    </div>
  )
}