'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import { trackPurchase } from '@/lib/gtag'

export const dynamic = 'force-dynamic'

function DashboardRedirect() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (!loading && user) {
      // Fire GA4 purchase event when redirected from PAYG checkout
      if (searchParams.get('credits') === 'added') {
        const pack = searchParams.get('pack')
        const price = parseFloat(searchParams.get('price') || '0')
        const txn = searchParams.get('txn') || `payg_${Date.now()}`
        if (pack && price) {
          trackPurchase({ transactionId: txn, packName: pack, price })
        }
      }
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
  }, [user, loading, router, searchParams])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-green-500" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-green-500" />
      </div>
    }>
      <DashboardRedirect />
    </Suspense>
  )
}