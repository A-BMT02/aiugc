'use client'

import { Video, Wand2 } from 'lucide-react'
import ActorSelector from './ActorSelector'
import VoiceSelector from './VoiceSelector'
import ScriptEditor from './ScriptEditor'
import ActionEditor from './ActionEditor'
import AdvancedSettings from './AdvancedSettings'
import GenerateButton from './GenerateButton'

export default function ControlPanel({
  activeTab,
  setActiveTab,
  quickActors,
  selectedAvatar,
  onSelectActor,
  uploadedActorImage,
  onUploadActorImage,
  onRemoveUploadedImage,
  onOpenActorLibrary,
  onOpenMagicEdit,
  totalActors,
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
  isGenerating,
  onGenerate,
  generationProgress,
  isUploading
}) {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6 pb-24 lg:pb-6">
        {/* Header - Hide on mobile (shown in dashboard header) */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">UGC Video Builder</h1>
              <p className="text-xs text-gray-400">Create authentic UGC content with AI</p>
            </div>
          </div>
        </div>
  
        {/* Actor Selector */}
        <ActorSelector
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedAvatar={selectedAvatar}
          onSelectActor={onSelectActor}
          uploadedActorImage={uploadedActorImage}
          onUploadActorImage={onUploadActorImage}
          onRemoveUploadedImage={onRemoveUploadedImage}
          onOpenActorLibrary={onOpenActorLibrary}
          isUploading={isUploading}
        />
  
        {/* Magic Edit Button */}
        <button 
          onClick={onOpenMagicEdit}
          disabled={!selectedAvatar && !uploadedActorImage}
          className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold"
        >
          <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Magic Edit - Add Product
          </span>
        </button>
  
        {/* Divider */}
        <div className="border-t border-white/10"></div>
  
        {/* Voice Section Header */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-300">Voice & Script</h3>
            <span className="text-[10px] sm:text-xs text-gray-500">Step 2</span>
          </div>
        </div>
  
        {/* Voice Selector */}
        <VoiceSelector
          selectedVoice={selectedVoice}
          showVoiceDropdown={showVoiceDropdown}
          setShowVoiceDropdown={setShowVoiceDropdown}
          playingVoiceId={playingVoiceId}
          onSelectVoice={onSelectVoice}
          onPlayVoice={onPlayVoice}
        />
  
        {/* Script Editor */}
        <ScriptEditor 
          script={script} 
          onChange={onScriptChange}
        />
  
        {/* Action Editor */}
        <ActionEditor 
          action={action} 
          onChange={onActionChange}
        />
  
        {/* Divider */}
        <div className="border-t border-white/10"></div>
  
        {/* Advanced Settings (Optional) */}
        <AdvancedSettings />
  
        {/* Divider */}
        <div className="border-t border-white/10"></div>
  
        {/* Generate Button */}
        <GenerateButton
          isGenerating={isGenerating}
          disabled={!selectedAvatar && !uploadedActorImage || !selectedVoice || !script}
          onClick={onGenerate}
          selectedAvatar={selectedAvatar}
          uploadedActorImage={uploadedActorImage}  
          selectedVoice={selectedVoice}
          script={script}
          generationProgress={generationProgress}
        />
  
        {/* Generation Progress */}
        {isGenerating && generationProgress && (
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs sm:text-sm font-semibold text-green-400">
                {generationProgress.message}
              </p>
              {generationProgress.step && (
                <span className="text-[10px] sm:text-xs text-gray-400">
                  {generationProgress.step}/5
                </span>
              )}
            </div>
            {generationProgress.progress > 0 && (
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
  
        {/* Help Text */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-300">💡 Tips:</strong>
            <br />
            • Choose or upload an actor
            <br />
            • Use Magic Edit to add your product
            <br />
            • Select a natural-sounding voice
            <br />
            • Write a compelling 30-60 second script
            <br />
            • Add actions for more realistic movements
          </p>
        </div>
      </div>
    </div>
  )
}