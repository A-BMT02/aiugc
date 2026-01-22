'use client'

import { Video, History, LogOut, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { createWorkspace } from '../../lib/database'
import Link from 'next/link'

export default function DashboardSidebar({ className = '' }) {
  const { signOut, user, profile } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const isWorkspace = pathname?.startsWith('/workspace/')
  const isHistory = pathname === '/history'

  // Get credits safely
  const credits = profile?.credits_remaining ?? 0
  const creditsDisplay = typeof credits === 'number' ? credits.toFixed(1) : '0.0'

  const handleCreateWorkspace = async () => {
    try {
      setIsCreatingWorkspace(true)
      
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
      setIsCreatingWorkspace(false)
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      alert('Failed to log out. Please try again.')
      setIsLoggingOut(false)
      setShowLogoutModal(false)
    }
  }

  return (
    <>
      {/* Fixed height sidebar with transition */}
      <aside className={`${isExpanded ? 'w-64' : 'w-16'} bg-[#1a1a1a] border-r border-white/10 flex flex-col py-6 h-screen transition-all duration-300 ${className}`}>
        {/* Logo and Toggle */}
        <div className="px-3 mb-8 flex items-center justify-between flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <img
              src="/blobbi-logo-green500-exact.png"
              alt="Blobbi"
              className="w-10 h-10 object-contain flex-shrink-0"
            />
            {isExpanded && (
              <span className="text-xl font-bold tracking-tight truncate">
                blobbi<span className="text-green-400">.</span>
              </span>
            )}
          </Link>
          
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-white/10 rounded transition flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expand Button (when collapsed) */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="mx-3 mb-4 p-2 hover:bg-white/10 rounded-lg transition flex items-center justify-center"
            title="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* User Info (when expanded) */}
        {isExpanded && user && (
          <div className="px-3 mb-6 flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{user.email}</p>
                </div>
              </div>
              
              {profile ? (
                <>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">Credits</span>
                    <span className="font-bold text-green-400">{creditsDisplay}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>~{Math.floor(credits / 10)} min video</span>
                      {/* <span>•</span> */}
                      {/* <span>{Math.floor(credits / 0.2)} edits</span> */}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-xs text-yellow-400">
                  ⚠️ Profile not loaded
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-shrink-0 px-3">
          {/* New Workspace Button */}
          <button 
            onClick={handleCreateWorkspace}
            disabled={isCreatingWorkspace}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-lg transition disabled:opacity-50 group relative flex items-center gap-3"
            title="New Workspace"
          >
            {isCreatingWorkspace ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Plus className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            )}
            {isExpanded && (
              <span className="font-semibold">New Project</span>
            )}
          </button>

          {/* History */}
          <button 
            onClick={() => router.push('/history')}
            className={`p-3 rounded-lg transition flex items-center gap-3 ${
              isHistory 
                ? 'bg-white/10 ring-2 ring-green-500' 
                : 'hover:bg-white/10'
            }`}
            title="History"
          >
            <History className="w-5 h-5 flex-shrink-0" />
            {isExpanded && (
              <span className="font-medium">History</span>
            )}
          </button>
        </nav>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Credits (when collapsed) */}
        {!isExpanded && profile && (
          <div className="mx-3 mb-4 flex-shrink-0">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex flex-col items-center justify-center border border-white/10">
              <span className="text-sm font-bold text-green-400">{creditsDisplay}</span>
              <span className="text-[9px] text-gray-500 uppercase">credits</span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button 
          onClick={() => setShowLogoutModal(true)}
          className={`mx-3 p-3 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition group border border-transparent hover:border-red-500/30 flex-shrink-0 flex items-center gap-3 ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}
          title="Logout"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {isExpanded && (
            <span className="font-medium">Log out</span>
          )}
        </button>

        {/* Version (when expanded) */}
        {isExpanded && (
          <div className="px-3 mt-3 flex-shrink-0">
            <p className="text-xs text-gray-500 text-center">BLOBBI v2.0, 2025</p>
          </div>
        )}
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full border border-white/10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Confirm Logout</h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-gray-400 mb-4">
                Are you sure you want to log out?
              </p>
              
              {user && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Logged in as:</p>
                  <p className="font-semibold">{user.email}</p>
                  {profile && (
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{creditsDisplay} credits</span>
                      <span>•</span>
                      <span className="capitalize">{profile.subscription_tier} plan</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}