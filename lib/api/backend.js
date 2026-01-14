const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// Upload file to Supabase (via backend)
export async function uploadToSupabase(file, bucketType = 'products') {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucketType', bucketType)

    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }

    const data = await response.json()
    return data.url

  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

// Edit image with product integration
export async function editImage(actorImageUrl, productImageUrl, prompt) {
  const response = await fetch(`${API_URL}/api/edit-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      actorImageUrl, 
      productImageUrl, 
      prompt 
    }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to edit image')
  }
  
  const data = await response.json()
  return data.editedImageUrl
}

// Generate speech
export async function generateSpeech(text, voiceId, settings = {}) {
  const response = await fetch(`${API_URL}/api/generate-speech`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      text, 
      voiceId,
      ...settings
    }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to generate speech')
  }
  
  return response.json()
}

// Get task status
export async function getTaskStatus(taskId) {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`)
  
  if (!response.ok) {
    throw new Error('Failed to get task status')
  }
  
  return response.json()
}

// Poll task until completion
export async function pollTaskUntilComplete(taskId, onProgress) {
  const maxAttempts = 60 // 2 minutes max
  const intervalMs = 2000 // Check every 2 seconds

  for (let i = 0; i < maxAttempts; i++) {
    const status = await getTaskStatus(taskId)
    
    // Call progress callback if provided
    if (onProgress) {
      onProgress(status)
    }

    if (status.state === 'success') {
      return status.resultUrls[0]
    }

    if (status.state === 'fail') {
      throw new Error(status.failMsg || 'Task failed')
    }

    // Wait before next check
    await new Promise(resolve => setTimeout(resolve, intervalMs))
  }

  throw new Error('Task timeout - please try again')
}

  
  // Get available voices
  export async function getVoices() {
    const response = await fetch(`${API_URL}/api/voices`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch voices')
    }
    
    return response.json()
  }

// Generate video with Wavespeed InfiniTalk
export async function generateVideo({ 
  imageUrl, 
  videoUrl,      // NEW
  referenceType, // NEW: 'image' or 'video'
  audioUrl, 
  prompt, 
  seed 
}) {
  const response = await fetch(`${API_URL}/api/generate-video`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      imageUrl, 
      videoUrl,      // NEW
      referenceType, // NEW
      audioUrl, 
      prompt, 
      seed 
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to generate video')
  }

  const data = await response.json()
  return data
}

// Get video status
export async function getVideoStatus(requestId) {
  const response = await fetch(`${API_URL}/api/video-status/${requestId}`)
  
  if (!response.ok) {
    throw new Error('Failed to get video status')
  }
  
  return response.json()
}

// Poll until video is ready
export async function pollVideoUntilComplete(requestId, onProgress) {
  const maxAttempts = 240
  const intervalMs = 1000

  for (let i = 0; i < maxAttempts; i++) {
    const status = await getVideoStatus(requestId)
    
    if (onProgress) {
      onProgress(status)
    }

    if (status.status === 'completed') {
      return status.outputs[0]
    }

    if (status.status === 'failed') {
      throw new Error(status.error || 'Video generation failed')
    }

    await new Promise(resolve => setTimeout(resolve, intervalMs))
  }

  throw new Error('Video generation timeout')
}

export async function uploadReferenceVideo(videoFile) {
  const formData = new FormData()
  formData.append('video', videoFile)

  const response = await fetch(`${API_URL}/api/upload-reference-video`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to upload video')
  }

  const data = await response.json()
  return data.videoUrl
}
