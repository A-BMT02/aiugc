'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabase/client'

export default function SubscriptionVerifier() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState('checking')
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 10 // Try for 30 seconds (10 attempts * 3 seconds)

  useEffect(() => {
    // Only run if we have the success parameter
    if (searchParams.get('success') !== 'true') {
      return
    }

    const checkSubscription = async () => {
      try {
     
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setStatus('error')
          return
        }

        // Check if subscription is active
        const { data: profile } = await supabase
          .from('users')
          .select('subscription_tier, subscription_status')
          .eq('id', user.id)
          .single()

        if (profile?.subscription_status === 'active' && profile?.subscription_tier !== 'free') {
          // Success! Subscription is active
          setStatus('success')
          
          // Clean URL and stay on page
          setTimeout(() => {
            window.history.replaceState({}, '', '/history')
          }, 2000)
        } else if (attempts >= maxAttempts) {
          // Tried too many times, something went wrong
          setStatus('error')
        } else {
          // Not ready yet, try again
          setAttempts(prev => prev + 1)
        }
      } catch (error) {
        console.error('Error checking subscription:', error)
        if (attempts >= maxAttempts) {
          setStatus('error')
        } else {
          setAttempts(prev => prev + 1)
        }
      }
    }

    // Initial check
    checkSubscription()

    // Poll every 3 seconds while checking
    const interval = setInterval(() => {
      if (status === 'checking') {
        checkSubscription()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [searchParams, attempts, status, maxAttempts])

  // Don't show anything if not checking subscription
  if (searchParams.get('success') !== 'true') {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full border border-white/10 p-8 text-center">
        {status === 'checking' && (
          <>
            <Loader2 className="w-16 h-16 text-green-400 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Activating Your Subscription</h2>
            <p className="text-gray-400 mb-4">
              Please wait while we set up your account...
            </p>
            <div className="text-sm text-gray-500">
              This usually takes a few seconds
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Blobbi!</h2>
            <p className="text-gray-400">
              Your subscription is now active. Start creating amazing UGC videos!
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Received</h2>
            <p className="text-gray-400 mb-6">
              We received your payment but it's taking longer than expected to activate your subscription. 
              Please refresh the page in a moment or contact support if the issue persists.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition"
              >
                Refresh Page
              </button>
              <button
                onClick={() => {
                  window.history.replaceState({}, '', '/history')
                  router.refresh()
                }}
                className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition"
              >
                Continue Anyway
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}