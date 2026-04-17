'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (!loading && user) {
      // Check for pending upsell (from Google OAuth on /upsell-trial)
      const upsellRedirect = localStorage.getItem('blobbi_upsell_redirect')
      const pendingSessionId = localStorage.getItem('blobbi_upsell_session_id')
      if (upsellRedirect) {
        localStorage.removeItem('blobbi_upsell_redirect')
        localStorage.removeItem('blobbi_upsell_session_id')
        if (pendingSessionId) {
          fetch('/api/activate-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: pendingSessionId, userId: user.id }),
          }).finally(() => router.push('/app/course'))
        } else {
          router.push('/app/course')
        }
        return
      }
      router.push('/history')
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-green-500" />
    </div>
  )
}