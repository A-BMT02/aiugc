'use client'

import { useState } from 'react'
import { uploadToSupabase } from '../lib/api/backend'

export function useAvatarSelection() {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [uploadedActorImage, setUploadedActorImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // ✅ Quick actors for preview - MAKE SURE THESE IDS EXIST IN YOUR ACTORS ARRAY
  const quickActors = [
    'emma',
    'noah', 
    'olivia',
    'liam',
    'ava',
    'william',
  ]

  const handleSelectActor = (actorId) => {
    setSelectedAvatar(actorId)
    setUploadedActorImage(null)
  }

  const handleUploadActorImage = async (file) => {
    if (!file) return

    try {
      setIsUploading(true)
      console.log('📤 Uploading custom actor image...')

      const publicUrl = await uploadToSupabase(file, 'avatars')
      
      console.log('✅ Actor image uploaded:', publicUrl)

      setUploadedActorImage(publicUrl)
      setSelectedAvatar(null)

    } catch (error) {
      console.error('❌ Upload error:', error)
      alert('Failed to upload image: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveUploadedImage = () => {
    setUploadedActorImage(null)
  }

  return {
    selectedAvatar,
    uploadedActorImage,
    quickActors,
    isUploading,
    handleSelectActor,
    handleUploadActorImage,
    handleRemoveUploadedImage,
  }
}