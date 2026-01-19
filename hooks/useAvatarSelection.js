'use client'

import { useState } from 'react'
import { uploadToSupabase, uploadReferenceVideo } from '../app/api/backend'

export function useAvatarSelection() {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [uploadedActorImage, setUploadedActorImage] = useState(null)
  const [uploadedActorVideo, setUploadedActorVideo] = useState(null)
  const [referenceType, setReferenceType] = useState('image')
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)

  const handleSelectActor = (actorId) => {
    console.log('🎭 handleSelectActor called with:', actorId, 'Type:', typeof actorId)
    
    // Make sure actorId is a number
    const numericId = typeof actorId === 'string' ? parseInt(actorId, 10) : actorId
    
    console.log('👤 Selecting actor:', numericId, 'Type:', typeof numericId)
    
    setSelectedAvatar(numericId)
    setUploadedActorImage(null)
    setUploadedActorVideo(null)
    setReferenceType('image')
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
      setUploadedActorVideo(null)
      setReferenceType('image')

    } catch (error) {
      console.error('❌ Upload error:', error)
      alert('Failed to upload image: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUploadActorVideo = async (file) => {
    if (!file) return

    try {
      setIsUploadingVideo(true)
      console.log('📹 Uploading reference video...')

      const videoUrl = await uploadReferenceVideo(file)
      
      console.log('✅ Video uploaded:', videoUrl)

      setUploadedActorVideo(videoUrl)
      setReferenceType('video')
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

  const handleRemoveUploadedVideo = () => {
    setUploadedActorVideo(null)
    setReferenceType('image')
  }

  return {
    selectedAvatar,
    setSelectedAvatar,
    uploadedActorImage,
    setUploadedActorImage,
    uploadedActorVideo,
    referenceType,
    isUploading,
    isUploadingVideo,
    handleSelectActor,
    handleUploadActorImage,
    handleUploadActorVideo,
    handleRemoveUploadedImage,
    handleRemoveUploadedVideo,
  }
}