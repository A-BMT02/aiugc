'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Check if we have a hash (for implicit flow) or code (for PKCE)
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const searchParams = new URLSearchParams(window.location.search)
    
    const accessToken = hashParams.get('access_token')
    const code = searchParams.get('code')

    console.log('🔍 Callback Debug:')
    console.log('URL:', window.location.href)
    console.log('Has access_token:', !!accessToken)
    console.log('Has code:', !!code)

    // Let Supabase handle the callback automatically
    const handleAuth = async () => {
      try {
        // Wait a bit for Supabase to process
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Check if session exists
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('❌ Session error:', error)
          router.push('/login?error=session_failed')
          return
        }

        if (session) {
          console.log('✅ Session found:', session.user.email)
          router.push('/dashboard')
        } else {
          console.log('❌ No session')
          router.push('/login?error=no_session')
        }
      } catch (err) {
        console.error('❌ Auth error:', err)
        router.push('/login?error=auth_failed')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
        <p className="text-white text-lg font-semibold">Completing sign in...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  )
}