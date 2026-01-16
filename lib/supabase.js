import { createClient } from './supabase/client'

// Create a singleton instance
let supabaseInstance = null

export const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient()
  }
  return supabaseInstance
}

// Export the instance
export const supabase = getSupabase()

// Keep all your existing functions but use the singleton
export async function uploadBase64ProductImage(base64Data, userId = 'anonymous') {
  try {
    const supabase = getSupabase() // Use singleton
    
    console.log('📤 Starting upload...')
    console.log('👤 User ID:', userId)
    console.log('📏 Base64 length:', base64Data.length)

    // Extract base64 string and convert to blob
    const base64Match = base64Data.match(/^data:image\/(\w+);base64,(.+)$/)
    if (!base64Match) {
      console.error('❌ Invalid base64 format:', base64Data.substring(0, 50))
      throw new Error('Invalid base64 image format')
    }

    const extension = base64Match[1]
    const base64String = base64Match[2]
    
    console.log('📸 Image type:', extension)
    console.log('📦 Base64 string length:', base64String.length)
    
    // Convert base64 to blob
    const byteCharacters = atob(base64String)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: `image/${extension}` })

    console.log('💾 Blob size:', blob.size, 'bytes')

    // Create File object
    const file = new File([blob], `product.${extension}`, { type: `image/${extension}` })

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${userId}/${timestamp}-product.${extension}`

    console.log('📝 Upload path:', filename)
    console.log('📤 Uploading to bucket: products')

    // Upload file
    const { data, error } = await supabase.storage
      .from('products')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: `image/${extension}`,
      })

    if (error) {
      console.error('❌ Supabase upload error:', error)
      throw error
    }

    console.log('✅ Upload successful:', data)

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(filename)

    console.log('🔗 Public URL:', urlData.publicUrl)

    return {
      path: filename,
      url: urlData.publicUrl,
    }

  } catch (error) {
    console.error('💥 Upload failed:', error)
    throw error
  }
}

export async function deleteProductImage(path) {
  try {
    const supabase = getSupabase()
    console.log('🗑️ Deleting from Supabase:', path)

    const { error } = await supabase.storage
      .from('products')
      .remove([path])

    if (error) {
      console.error('❌ Delete error:', error)
      throw error
    }

    console.log('✅ Delete successful')

  } catch (error) {
    console.error('Delete failed:', error)
    throw error
  }
}

export async function uploadAudioToSupabase(audioUrl) {
  try {
    const supabase = getSupabase()
    console.log('📤 Uploading audio to Supabase:', audioUrl)

    const response = await fetch(audioUrl)
    const blob = await response.blob()

    const timestamp = Date.now()
    const filename = `speech-${timestamp}.mp3`
    const filepath = `generated/${filename}`

    const { data, error } = await supabase.storage
      .from('audio')
      .upload(filepath, blob, {
        contentType: 'audio/mpeg',
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('❌ Supabase upload error:', error)
      throw error
    }

    const { data: { publicUrl } } = supabase.storage
      .from('audio')
      .getPublicUrl(filepath)

    console.log('✅ Audio uploaded to Supabase:', publicUrl)
    return publicUrl

  } catch (error) {
    console.error('❌ Failed to upload audio:', error)
    throw error
  }
}

export async function uploadImageToSupabase(imageBuffer, bucketType, originalName = 'image.jpg') {
  try {
    const supabase = getSupabase()
    const allowedBuckets = ['avatars', 'products']
    if (!allowedBuckets.includes(bucketType)) {
      throw new Error(`Invalid bucket type. Use: ${allowedBuckets.join(', ')}`)
    }

    const ext = originalName.split('.').pop() || 'jpg'
    const fileName = `${bucketType}-${Date.now()}.${ext}`
    
    const { data, error } = await supabase.storage
      .from(bucketType)
      .upload(fileName, imageBuffer, {
        contentType: `image/${ext}`,
        upsert: false,
      })

    if (error) {
      console.error('❌ Supabase upload error:', error)
      throw error
    }

    const { data: urlData } = supabase.storage
      .from(bucketType)
      .getPublicUrl(fileName)

    console.log(`✅ Image uploaded to ${bucketType}:`, urlData.publicUrl)
    return urlData.publicUrl
  } catch (error) {
    console.error('❌ Supabase upload error:', error)
    throw error
  }
}

export async function uploadVideoToSupabase(videoBuffer, originalName = 'video.mp4') {
  try {
    const supabase = getSupabase()
    const ext = originalName.split('.').pop() || 'mp4'
    const fileName = `reference-video-${Date.now()}.${ext}`
    
    const { data, error } = await supabase.storage
      .from('reference-videos')
      .upload(fileName, videoBuffer, {
        contentType: 'video/mp4',
        upsert: false,
      })

    if (error) {
      console.error('❌ Supabase video upload error:', error)
      throw error
    }

    const { data: urlData } = supabase.storage
      .from('reference-videos')
      .getPublicUrl(fileName)

    console.log('✅ Video uploaded to Supabase:', urlData.publicUrl)
    return urlData.publicUrl
  } catch (error) {
    console.error('❌ Supabase video upload error:', error)
    throw error
  }
}