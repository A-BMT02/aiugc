'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '../lib/supabase/client'
import { useRouter } from 'next/navigation'

/**
 * @typedef {Object} AuthContextType
 * @property {Object|null} user
 * @property {boolean} loading
 * @property {(email: string, password: string) => Promise<any>} signUp
 * @property {(email: string, password: string) => Promise<any>} signIn
 * @property {() => Promise<any>} signInWithGoogle
 * @property {() => Promise<void>} signOut
 */

/** @type {import('react').Context<AuthContextType>} */
const AuthContext = createContext({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('❌ Error getting session:', error)
        }
        
        setUser(session?.user ?? null)
        setLoading(false)
        
        console.log('👤 Initial session:', session?.user?.email || 'No user')
      } catch (error) {
        console.error('❌ Session error:', error)
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state changed:', event, session?.user?.email || 'No user')
      
      setUser(session?.user ?? null)
      setLoading(false)

      // Handle SIGNED_OUT
      if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out, redirecting to login...')
        router.push('/login')
      }

      if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const value = {
    user,
    loading,
    
    signUp: async (email, password) => {
      try {
        console.log('📝 Signing up user:', email)
        
        const redirectUrl = typeof window !== 'undefined' 
          ? `${window.location.origin}/dashboard`
          : 'http://localhost:3000/dashboard'
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        })
        
        if (error) throw error
        
        console.log('✅ Sign up successful:', data.user?.email)
        return data
      } catch (error) {
        console.error('❌ Sign up error:', error)
        throw error
      }
    },
    
    signIn: async (email, password) => {
      try {
        console.log('🔐 Signing in user:', email)
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        console.log('✅ Sign in successful:', data.user?.email)
        
        // Redirect to dashboard after successful sign in
        router.push('/dashboard')
        
        return data
      } catch (error) {
        console.error('❌ Sign in error:', error)
        throw error
      }
    },
    
    signInWithGoogle: async () => {
      try {
        const redirectUrl = typeof window !== 'undefined' 
          ? `${window.location.origin}/dashboard`
          : 'http://localhost:3000/dashboard'
        
        console.log('🔵 Starting Google OAuth...')
        console.log('📍 Redirect URL:', redirectUrl)
        
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
        
        console.log('✅ Google OAuth initiated')
        return data
      } catch (error) {
        console.error('❌ Google sign in error:', error)
        throw error
      }
    },
    
    signOut: async () => {
      try {
        console.log('👋 Signing out user...')
        
        const { error } = await supabase.auth.signOut()
        
        if (error) throw error
        
        console.log('✅ Sign out successful')
      } catch (error) {
        console.error('❌ Sign out error:', error)
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