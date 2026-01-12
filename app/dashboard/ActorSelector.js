'use client'

import { Upload, ChevronRight, Check, X, Sparkles } from 'lucide-react'
import { ACTORS } from '../../lib/constants'

export default function ActorSelector({ 
  activeTab,
  setActiveTab,
  selectedAvatar,
  onSelectActor,
  uploadedActorImage,
  onUploadActorImage,
  onRemoveUploadedImage,
  onOpenActorLibrary,
  isUploading,
}) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Image must be less than 10MB')
        return
      }
      
      onUploadActorImage(file)
    }
  }

  // Get first 6 actors directly from ACTORS array
  const previewActors = ACTORS.slice(0, 6)

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        <button 
          onClick={() => setActiveTab('actor-library')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === 'actor-library' ? 'bg-white/10' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          Actor Library
        </button>
        <button 
          onClick={() => setActiveTab('upload-image')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === 'upload-image' ? 'bg-white/10' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          Upload Image
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'actor-library' ? (
        // Actor Library Tab
        <div>
          {/* 6 Actor Preview Grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {previewActors.map((actor) => (
              <button
                key={actor.id}
                onClick={() => onSelectActor(actor.id)}
                className={`aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden border-2 transition-all relative ${
                  selectedAvatar === actor.id 
                    ? 'border-green-500 ring-2 ring-green-500/50' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Actor Image */}
                {actor.imageUrl ? (
                  <img 
                    src={actor.imageUrl} 
                    alt={actor.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {actor.thumbnail || '👤'}
                  </div>
                )}
                
                {/* Actor Name */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-xs font-semibold">{actor.name}</div>
                </div>

                {/* Selected Badge */}
                {selectedAvatar === actor.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Browse More Button */}
          <button 
            onClick={onOpenActorLibrary}
            className="w-full py-2 text-sm text-gray-400 hover:text-white transition flex items-center justify-center gap-2 group"
          >
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            Show {ACTORS.length - 6} more actors
          </button>
        </div>
      ) : (
        // Upload Image Tab
        <div>
          <p className="text-sm text-gray-400 mb-4">Upload your own character image</p>
          
          {!uploadedActorImage ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="actor-image-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="actor-image-upload"
                className={`block aspect-[3/4] max-w-[280px] mx-auto border-2 border-dashed border-white/20 rounded-xl hover:border-green-500 transition-all cursor-pointer overflow-hidden group bg-white/5 ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-green-500 rounded-full animate-spin mb-4"></div>
                    <span className="font-semibold text-green-400">Uploading...</span>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-green-400 transition">
                    <Upload className="w-12 h-12 mb-4" />
                    <span className="font-semibold">Click to upload</span>
                    <span className="text-xs mt-2">PNG, JPG up to 10MB</span>
                    <span className="text-xs text-gray-500 mt-4 px-4 text-center">
                      Upload a clear photo of a person for best results
                    </span>
                  </div>
                )}
              </label>
            </div>
          ) : (
            <div className="relative max-w-[280px] mx-auto">
              <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-green-500 relative">
                <img 
                  src={uploadedActorImage} 
                  alt="Uploaded Actor" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 rounded-full p-2">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-400">
                <Check className="w-4 h-4" />
                Image uploaded successfully
              </div>
              <button
                onClick={onRemoveUploadedImage}
                className="mt-3 w-full py-2 text-sm text-red-400 hover:text-red-300 transition flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Remove Image
              </button>
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-xs mb-2 text-green-400">Upload Tips</h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li>• Use a clear, well-lit photo</li>
                  <li>• Face should be visible and centered</li>
                  <li>• Avoid group photos or blurry images</li>
                  <li>• Higher resolution gives better results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}