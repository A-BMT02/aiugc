import { supabase } from "./supabase/client"
/**
 * Create a new workspace
 */
export async function createWorkspace({
  userId,
  workspaceName,
  script,
  action,
  voiceId,
  voiceName,
  actorId,
  actorName,
  imageUrl,
  editedImageUrl,
  referenceType,
  audioUrl,
  voiceSettings,
  language,
  aspectRatio,
  requestId,
}) {
  try {
  
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      throw new Error('Not authenticated')
    }

    console.log('📝 Creating workspace for user:', session.user.id)

    const insertData = {
      user_id: session.user.id,
      workspace_name: workspaceName || `Workspace ${new Date().toLocaleDateString()}`,
      script,
      voice_id: voiceId,
      voice_name: voiceName,
      actor_id: actorId,
      actor_name: actorName,
      image_url: imageUrl,
      reference_type: referenceType,
      voice_clarity: voiceSettings?.clarity || 0.75,
      voice_tone: voiceSettings?.tone || 0.40,
      voice_emotion: voiceSettings?.emotion || 0.0,
      voice_speed: voiceSettings?.speed || 1.0,
      language: language || 'en',
      aspect_ratio: aspectRatio || '9:16',
      status: 'processing',
    }

    if (action) insertData.action = action
    if (editedImageUrl) insertData.edited_image_url = editedImageUrl
    if (audioUrl) insertData.audio_url = audioUrl
    if (requestId) insertData.request_id = requestId

    const { data, error } = await supabase
      .from('workspaces')
      .insert(insertData)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Workspace created:', data.id)
    return data
  } catch (error) {
    console.error('❌ Error creating workspace:', error)
    throw error
  }
}

/**
 * Update workspace with video URL
 */
/**
 * Update workspace with video URL
 */
export async function updateWorkspaceVideo(workspaceId, updates) {
  try {
    
    
    const updateData = {
      status: 'completed',
      ...updates
    }
    
    const { data, error } = await supabase
      .from('workspaces')
      .update(updateData)
      .eq('id', workspaceId)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Workspace video updated:', data.id)
    return data
  } catch (error) {
    console.error('❌ Error updating workspace video:', error)
    throw error
  }
}

/**
 * Update workspace status to failed
 */
export async function updateWorkspaceFailed(workspaceId, errorMessage) {
  try {
    
    
    const { data, error } = await supabase
      .from('workspaces')
      .update({
        status: 'failed',
        error_message: errorMessage,
      })
      .eq('id', workspaceId)
      .select()
      .single()

    if (error) throw error

    console.log('⚠️ Workspace marked as failed:', data.id)
    return data
  } catch (error) {
    console.error('❌ Error updating workspace status:', error)
    throw error
  }
}

/**
 * Get all workspaces for a user
 */
export async function getUserWorkspaces(userId, limit = 50, offset = 0) {
  try {
    
    
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    console.log(`✅ Retrieved ${data.length} workspaces`)
    return data
  } catch (error) {
    console.error('❌ Error fetching workspaces:', error)
    throw error
  }
}

/**
 * Get a single workspace by ID
 */
export async function getWorkspace(workspaceId) {
  try {
    
    
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('id', workspaceId)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error('❌ Error fetching workspace:', error)
    throw error
  }
}

/**
 * Delete a workspace
 */
export async function deleteWorkspace(workspaceId) {
  try {
    
    
    const { error } = await supabase
      .from('workspaces')
      .delete()
      .eq('id', workspaceId)

    if (error) throw error

    console.log('✅ Workspace deleted:', workspaceId)
    return true
  } catch (error) {
    console.error('❌ Error deleting workspace:', error)
    throw error
  }
}

/**
 * Update workspace name and data
 */
export async function updateWorkspace(workspaceId, updates) {
  try {
    
    
    const { data, error } = await supabase
      .from('workspaces')
      .update(updates)
      .eq('id', workspaceId)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Workspace updated:', data.id)
    return data
  } catch (error) {
    console.error('❌ Error updating workspace:', error)
    throw error
  }
}

/**
 * Get workspace statistics for user
 */
export async function getUserWorkspaceStats(userId) {
  try {
    
    
    const { data, error } = await supabase
      .from('workspaces')
      .select('status')
      .eq('user_id', userId)

    if (error) throw error

    const stats = {
      total: data.length,
      completed: data.filter(w => w.status === 'completed').length,
      processing: data.filter(w => w.status === 'processing').length,
      failed: data.filter(w => w.status === 'failed').length,
    }

    return stats
  } catch (error) {
    console.error('❌ Error fetching workspace stats:', error)
    throw error
  }
}