'use client'

import { useState } from 'react'
import { uploadToSupabase, uploadReferenceVideo } from '../lib/api/backend'

export function useAvatarSelection() {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [uploadedActorImage, setUploadedActorImage] = useState(null)
  const [uploadedActorVideo, setUploadedActorVideo] = useState(null)  // NEW
  const [referenceType, setReferenceType] = useState('image')         // NEW
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)     // NEW

  // ✅ Quick actors for preview
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
    setUploadedActorVideo(null)  // NEW: Clear video too
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
      setUploadedActorVideo(null)  // NEW: Clear video
      setReferenceType('image')     // NEW

    } catch (error) {
      console.error('❌ Upload error:', error)
      alert('Failed to upload image: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  // NEW: Handle video upload
  const handleUploadActorVideo = async (file) => {
    if (!file) return

    try {
      setIsUploadingVideo(true)
      console.log('📹 Uploading reference video...')

      const videoUrl = await uploadReferenceVideo(file)
      
      console.log('✅ Video uploaded:', videoUrl)

      setUploadedActorVideo(videoUrl)
      setReferenceType('video')
      
      // Clear image if video is uploaded
      setUploadedActorImage(null)
      setSelectedAvatar(null)

    } catch (error) {
      console.error('❌ Video upload error:', error)
      alert('Failed to upload video: ' + error.message)
    } finally {
      setIsUploadingVideo(false)
    }
  }

  const handleRemoveUploadedImage = () => {
    setUploadedActorImage(null)
  }

  // NEW: Handle remove video
  const handleRemoveUploadedVideo = () => {
    setUploadedActorVideo(null)
    setReferenceType('image')
  }

  return {
    selectedAvatar,
    uploadedActorImage,
    uploadedActorVideo,     // NEW
    referenceType,          // NEW
    quickActors,
    isUploading,
    isUploadingVideo,       // NEW
    handleSelectActor,
    handleUploadActorImage,
    handleUploadActorVideo, // NEW
    handleRemoveUploadedImage,
    handleRemoveUploadedVideo, // NEW
  }
}