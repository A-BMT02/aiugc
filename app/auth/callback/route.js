import { createClient } from '../../../lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin))
      }

      // Successful authentication - redirect to dashboard
      return NextResponse.redirect(new URL(next, requestUrl.origin))
      
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(new URL('/login?error=callback_error', requestUrl.origin))
    }
  }

  // No code present, redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}