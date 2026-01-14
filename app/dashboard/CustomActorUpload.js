'use client'

import { useRef } from 'react'
import { Upload, X, Loader2, Sparkles } from 'lucide-react'

export default function CustomActorUpload({
  uploadedActorImage,
  referenceType,
  onUploadActorImage,
  onRemoveUploadedImage,
  onOpenMagicEdit,
  isUploading,
}) {
  const fileInputRef = useRef(null)

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate image file
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image file must be less than 10MB')
      return
    }

    onUploadActorImage(file)
  }

  const handleBoxClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div>
      <label className="text-xs sm:text-sm font-semibold mb-3 block">Upload Custom Avatar</label>

      {/* Preview - Clickable when empty */}
      <div 
        className={`relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-white/10 mb-3 ${
          !uploadedActorImage && !isUploading ? 'cursor-pointer hover:border-green-500/50 transition' : ''
        }`}
        onClick={!uploadedActorImage && !isUploading ? handleBoxClick : undefined}
      >
        {uploadedActorImage && referenceType === 'image' ? (
          <>
            <img 
              src={uploadedActorImage} 
              alt="Uploaded Actor" 
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemoveUploadedImage()
              }}
              disabled={isUploading}
              className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition disabled:opacity-50 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm font-semibold">Custom Upload</p>
              <p className="text-xs text-blue-400">Your image</p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <Upload className="w-12 h-12 mb-2" />
            <p className="text-sm text-center px-4">Upload custom image</p>
            <p className="text-xs text-gray-600 mt-1">Click to browse</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
            <Loader2 className="w-8 h-8 animate-spin text-green-400 mb-2" />
            <p className="text-sm">Uploading...</p>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        disabled={isUploading}
      />

      {/* Upload Button - Alternative way */}
      <label className={`block w-full py-2.5 sm:py-3 rounded-lg transition cursor-pointer text-center text-sm font-semibold mb-3 ${
        isUploading
          ? 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
          : 'bg-white/5 hover:bg-white/10 border border-white/10'
      }`}>
        <Upload className="w-4 h-4 inline mr-2" />
        Upload Custom Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          disabled={isUploading}
        />
      </label>

      {/* Magic Edit Button - Only show if image uploaded */}
      {uploadedActorImage && referenceType === 'image' && (
        <button
          onClick={onOpenMagicEdit}
          disabled={isUploading}
          className="w-full py-2.5 sm:py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg transition text-sm font-semibold mb-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          Magic Edit Image
        </button>
      )}

      {/* Info Boxes */}
      <div className="space-y-3">
        {/* Current Selection Info */}
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-1">🖼️ Image Reference</p>
          <p className="text-xs text-gray-400">
            Upload a photo for static poses. Best for product shots and portraits. Max 10MB.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
          <p className="text-xs text-blue-400 font-semibold mb-1">💡 Pro Tips</p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Best for clear faces and products</li>
            <li>• Use Magic Edit to add products</li>
            <li>• JPG or PNG format recommended</li>
          </ul>
        </div>
      </div>
    </div>
  )
}