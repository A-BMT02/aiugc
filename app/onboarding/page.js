'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from '@/lib/supabase/client'
import Header from '@/components/Header'
import PricingSection from '@/components/PricingSection'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function OnboardingPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    
    // If user already has a subscription, redirect to dashboard
    if (!loading && profile && profile.subscription_tier !== 'free' && profile.subscription_status === 'active') {
      router.push('/dashboard')
    }
  }, [user, profile, loading, router])

  const handleSubscribe = async (planName, priceId) => {
    if (!user) {
      router.push('/signup')
      return
    }

    try {
      setLoadingPlan(planName)

      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        alert('Please log in to subscribe')
        router.push('/login')
        return
      }

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const stripe = await stripePromise
      
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert(error instanceof Error ? error.message : 'Failed to start checkout')
    } finally {
      setLoadingPlan(null)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 mt-20">
        {/* Use Existing Pricing Section Component */}
        <PricingSection 
          handleSubscribe={handleSubscribe}
          loadingPlan={loadingPlan}
        />
      </div>
    </div>
  )
}