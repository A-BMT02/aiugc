import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  // Allow OAuth callback (code parameter)
  const code = request.nextUrl.searchParams.get('code')
  if (code) {
    console.log('🔄 OAuth code detected, allowing through')
    return supabaseResponse
  }

  // Protect dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    console.log('🔒 No session, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if already logged in
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && session) {
    console.log('✅ Already logged in, redirecting to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
  ],
}