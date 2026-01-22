'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase/client'
import { useRouter } from 'next/navigation'

/**
 * @typedef {Object} AuthContextType
 * @property {Object|null} user
 * @property {Object|null} profile
 * @property {boolean} loading
 * @property {(email: string, password: string) => Promise<any>} signUp
 * @property {(email: string, password: string) => Promise<any>} signIn
 * @property {() => Promise<any>} signInWithGoogle
 * @property {() => Promise<void>} signOut
 * @property {() => Promise<void>} refreshProfile
 */

/** @type {import('react').Context<AuthContextType>} */
const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  console.log('[AuthContext] 🔁 Render', {
    userId: user?.id,
    hasProfile: !!profile,
    loading,
  })

  // 1. fetchProfile (with logs only)
  const fetchProfile = async (userId) => {
    if (!userId) {
      console.warn('[AuthContext] ⚠️ fetchProfile called without userId')
      return null
    }

    console.log('[AuthContext] 📡 fetchProfile START', userId)

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) throw error

      console.log('[AuthContext] ✅ fetchProfile SUCCESS', data)
      return data
    } catch (err) {
      console.error('[AuthContext] ❌ fetchProfile ERROR', err)
      return null
    }
  }

  const updateCredits = (delta) => {
    setProfile((prev) => {
      if (!prev) return prev
  
      const updated = {
        ...prev,
        credits_remaining: Number(
          (prev.credits_remaining + delta).toFixed(2)
        ),
        total_credits_used: (prev.total_credits_used || 0) + Math.abs(delta),
      }
  
      console.log('[AuthContext] 💳 Credits updated locally', updated)
  
      return updated
    })
  }
  

  // 2. refreshProfile (logs only)
  const refreshProfile = async () => {
    if (!user?.id) {
      console.warn('[AuthContext] ⚠️ refreshProfile called without user')
      return
    }

    console.log('[AuthContext] 🔄 refreshProfile START', user.id)

    const data = await fetchProfile(user.id)

    if (data) {
      console.log('[AuthContext] 🔄 refreshProfile SET profile', data)
      setProfile(data)
    } else {
      console.warn('[AuthContext] ⚠️ refreshProfile got null data')
    }

    console.log('[AuthContext] 🔄 refreshProfile END')
  }

  // EFFECT 1: Handle Authentication
  useEffect(() => {
    console.log('[AuthContext] 🚀 Auth effect INIT')

    const initializeAuth = async () => {
      console.log('[AuthContext] 🔐 initializeAuth START')

      const { data: { session } } = await supabase.auth.getSession()

      console.log('[AuthContext] 🔐 getSession result', session)

      setUser(session?.user ?? null)

      if (session?.user) {
        console.log('[AuthContext] 👤 Session user', session.user.id)
        const profileData = await fetchProfile(session.user.id)
        setProfile(profileData)
      } else {
        console.log('[AuthContext] 👤 No session user')
      }

      setLoading(false)
      console.log('[AuthContext] 🔐 initializeAuth END')
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const newUser = session?.user ?? null
    
        console.log('[AuthContext] 🔁 onAuthStateChange', event, newUser?.id)
    
        // 🚫 Ignore token refreshes and duplicate sign-ins
        if (
          event === 'TOKEN_REFRESHED' ||
          event === 'SIGNED_IN' ||
          event === 'INITIAL_SESSION'
        ) {
          console.log('[AuthContext] ⚠️ Ignoring auth event:', event)
          return
        }
    
        // ✅ Only react if the user actually changed
        if (newUser?.id !== user?.id) {
          console.log('[AuthContext] 👤 Auth user changed', {
            from: user?.id,
            to: newUser?.id,
          })
    
          setUser(newUser)
    
          if (newUser) {
            const data = await fetchProfile(newUser.id)
            setProfile(data)
          } else {
            setProfile(null)
          }
        }
    
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
    
        setLoading(false)
      }
    )
    

    return () => {
      console.log('[AuthContext] 🧹 Auth effect CLEANUP')
      subscription.unsubscribe()
    }
  }, [supabase, router])

  // EFFECT 2: Realtime Profile Updates
  useEffect(() => {
    if (!user?.id) {
      console.log('[AuthContext] 📡 Realtime skipped (no user)')
      return
    }

    console.log('[AuthContext] 📡 Realtime SUBSCRIBE', user.id)

    const channel = supabase
      .channel(`profile-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          console.log('[AuthContext] 📡 Realtime UPDATE', payload.new)
          setProfile(payload.new)
        }
      )
      .subscribe((status) => {
        console.log('[AuthContext] 📡 Realtime status', status)
      })

    return () => {
      console.log('[AuthContext] 📡 Realtime CLEANUP', user.id)
      supabase.removeChannel(channel)
    }
  }, [user?.id, supabase])

  const value = {
    user,
    profile,
    loading,
    refreshProfile,
    supabase,
    updateCredits,

    signUp: async (email, password) => {
      try {
        console.log('[AuthContext] 📝 Sign up START', email)

        const redirectUrl =
          typeof window !== 'undefined'
            ? `${window.location.origin}/dashboard`
            : 'http://localhost:3000/dashboard'

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl },
        })

        if (error) throw error

        console.log('[AuthContext] ✅ Sign up SUCCESS', data.user?.email)
        return data
      } catch (error) {
        console.error('[AuthContext] ❌ Sign up ERROR', error)
        throw error
      }
    },

    signIn: async (email, password) => {
      try {
        console.log('[AuthContext] 🔐 Sign in START')

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        console.log('[AuthContext] ✅ Sign in SUCCESS')

        console.log('[AuthContext] ⏳ Waiting for session persistence...')
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (data.user) {
          console.log('[AuthContext] 👤 Fetching profile after sign in')
          const profileData = await fetchProfile(data.user.id)
          setProfile(profileData)
        }

        console.log('[AuthContext] 🔄 Redirecting to /history')
        window.location.href = '/history'

        return data
      } catch (error) {
        console.error('[AuthContext] ❌ Sign in ERROR', error)
        throw error
      }
    },

    signInWithGoogle: async () => {
      try {
        const redirectUrl =
          typeof window !== 'undefined'
            ? `${window.location.origin}/dashboard`
            : 'http://localhost:3000/dashboard'

        console.log('[AuthContext] 🔵 Google OAuth START')
        console.log('[AuthContext] 📍 Redirect URL', redirectUrl)

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        })

        if (error) throw error

        console.log('[AuthContext] ✅ Google OAuth initiated')
        return data
      } catch (error) {
        console.error('[AuthContext] ❌ Google OAuth ERROR', error)
        throw error
      }
    },

    signOut: async () => {
      try {
        console.log('[AuthContext] 👋 Sign out START')

        const { error } = await supabase.auth.signOut()
        if (error) throw error

        setProfile(null)

        console.log('[AuthContext] ✅ Sign out SUCCESS')
      } catch (error) {
        console.error('[AuthContext] ❌ Sign out ERROR', error)
        throw error
      }
    },
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use auth context
 * @returns {AuthContextType}
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
