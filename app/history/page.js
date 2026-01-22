'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { getUserWorkspaces, deleteWorkspace, createWorkspace } from '../../lib/database'
import { Loader2, Video, Trash2, Download, Calendar, Clock, Plus, Edit } from 'lucide-react'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import SubscriptionVerifier from '../../components/SubscriptionVerifier'

export const dynamic = 'force-dynamic'

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      loadWorkspaces()
    }
  }, [user])

  const loadWorkspaces = async () => {
    try {
      setLoading(true)
      const data = await getUserWorkspaces(user.id)
      setWorkspaces(data)
    } catch (error) {
      console.error('Error loading workspaces:', error)
      alert('Failed to load workspaces')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = async () => {
    try {
      setCreating(true)
      
      const newWorkspace = await createWorkspace({
        userId: user.id,
        workspaceName: `New Workspace ${new Date().toLocaleString()}`,
        script: '',
        voiceId: 'rachel',
        voiceName: 'Rachel',
        actorId: '',
        actorName: '',
        imageUrl: '',
        referenceType: 'image',
        voiceSettings: {
          clarity: 0.75,
          tone: 0.40,
          emotion: 0.0,
          speed: 1.0,
        },
        language: 'en',
        aspectRatio: '9:16',
      })

      router.push(`/workspace/${newWorkspace.id}`)
    } catch (error) {
      console.error('Error creating workspace:', error)
      alert('Failed to create workspace')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (workspaceId) => {
    if (!confirm('Are you sure you want to delete this workspace?')) return

    try {
      setDeleting(workspaceId)
      await deleteWorkspace(workspaceId)
      setWorkspaces(workspaces.filter(w => w.id !== workspaceId))
    } catch (error) {
      console.error('Error deleting workspace:', error)
      alert('Failed to delete workspace')
    } finally {
      setDeleting(null)
    }
  }

  const handleOpen = (workspaceId) => {
    router.push(`/workspace/${workspaceId}`)
  }

  // Helper function to get workspace status
  const getWorkspaceStatus = (workspace) => {
    if (workspace.video_url && workspace.status === 'completed') {
      return { label: 'Completed', color: 'bg-green-500', showVideo: true }
    }
    if (workspace.status === 'processing' && workspace.request_id) {
      return { label: 'Processing', color: 'bg-yellow-500', showProcessing: true }
    }
    if (workspace.status === 'failed') {
      return { label: 'Failed', color: 'bg-red-500', showFailed: true }
    }
    return { label: 'Draft', color: 'bg-gray-500', showDraft: true }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

<SubscriptionVerifier />
      <DashboardSidebar />

      <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Workspaces</h1>
                <p className="text-gray-400">Manage and create UGC videos</p>
              </div>
              
              <button
                onClick={handleCreateNew}
                disabled={creating}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg font-semibold transition disabled:opacity-50 flex items-center gap-2"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    New Workspace
                  </>
                )}
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            )}

            {/* Empty State */}
            {!loading && workspaces.length === 0 && (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No workspaces yet</p>
                <button
                  onClick={handleCreateNew}
                  disabled={creating}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Create Your First Workspace
                </button>
              </div>
            )}

            {/* Workspace Grid */}
            {!loading && workspaces.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((workspace) => {
                  const status = getWorkspaceStatus(workspace)
                  
                  return (
                    <div
                      key={workspace.id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-green-500/50 transition group cursor-pointer"
                      onClick={() => handleOpen(workspace.id)}
                    >
                      {/* Video/Image Preview */}
                      <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900">
                        {status.showVideo && workspace.video_url ? (
                          <video
                            src={workspace.video_url}
                            className="w-full h-full object-cover"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : status.showProcessing ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Loader2 className="w-12 h-12 animate-spin text-green-500 mb-3" />
                            <p className="text-sm text-gray-400">Generating video...</p>
                          </div>
                        ) : status.showFailed ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Video className="w-12 h-12 text-red-500 mb-3" />
                            <p className="text-sm text-red-400">Generation failed</p>
                            <p className="text-xs text-gray-500 mt-1">Click to try again</p>
                          </div>
                        ) : workspace.edited_image_url || workspace.image_url ? (
                          <>
                            <img
                              src={workspace.edited_image_url || workspace.image_url}
                              alt="Preview"
                              className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                              <Edit className="w-12 h-12 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-300">Draft</p>
                              <p className="text-xs text-gray-500">Click to continue</p>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Video className="w-12 h-12 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-400">Empty workspace</p>
                            <p className="text-xs text-gray-500">Click to start</p>
                          </div>
                        )}

                        {/* Status Badge */}
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <div className="text-center">
                            <Edit className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm font-semibold">Edit Workspace</p>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate mb-1">
                              {workspace.workspace_name || 'Untitled Workspace'}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {workspace.actor_name || 'No actor'} • {workspace.voice_name || 'No voice'}
                            </p>
                          </div>
                        </div>

                        {workspace.script && (
                          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                            {workspace.script}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(workspace.created_at).toLocaleDateString()}
                          </div>
                          {workspace.generation_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {workspace.generation_time}s
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {status.showVideo && workspace.video_url ? (
                            <a
                              href={workspace.video_url}
                              download
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </a>
                          ) : (
                            <button
                              onClick={() => handleOpen(workspace.id)}
                              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              {status.showDraft ? 'Continue' : 'Retry'}
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(workspace.id)
                            }}
                            disabled={deleting === workspace.id}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition disabled:opacity-50"
                          >
                            {deleting === workspace.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
   
  )
}