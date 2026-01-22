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

  // 1. Use getUser() - it's more secure than getSession and avoids stale state
  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // 2. Define Route Logic
  const isAuthRoute = pathname === '/login' || pathname === '/signup'
  const isOnboardingRoute = pathname === '/onboarding'
  const isProtectedRoute = ['/dashboard', '/history', '/workspace', '/onboarding'].some(route => 
    pathname.startsWith(route)
  )

  // 3. Early Exit for OAuth or Public requests
  if (request.nextUrl.searchParams.get('code')) return supabaseResponse

  // 4. Protection: Redirect to login if no user
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 5. Auth Logic: Redirect logged-in users away from Login/Signup
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/history', request.url))
  }

  // 6. ⚡ CRITICAL OPTIMIZATION: Skip DB checks for /workspace interactions
  // This prevents the "hang" during image edits.
  const isWorkspaceInteraction = pathname.startsWith('/workspace/') && pathname !== '/workspace'
  
  if (user && isProtectedRoute && !isOnboardingRoute && !isWorkspaceInteraction) {
    // Only check DB on main navigation pages
    const { data: profile } = await supabase
      .from('users')
      .select('subscription_tier, subscription_status')
      .eq('id', user.id)
      .maybeSingle()

    const needsOnboarding = 
      (profile?.subscription_tier === 'free' && (!profile?.subscription_status || profile?.subscription_status === 'inactive')) ||
      (profile?.subscription_status === 'canceled')

    if (needsOnboarding) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }

  // 7. Onboarding Access Control
  if (user && isOnboardingRoute) {
    const { data: profile } = await supabase
      .from('users')
      .select('subscription_tier, subscription_status')
      .eq('id', user.id)
      .maybeSingle()

    if (profile?.subscription_tier !== 'free' && profile?.subscription_status === 'active') {
      return NextResponse.redirect(new URL('/history', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/history/:path*',
    '/workspace/:path*',
    '/onboarding',
    '/login',
    '/signup',
  ],
}