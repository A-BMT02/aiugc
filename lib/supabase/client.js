/**
 * lib/supabase/client.js
 * 
 * Export supabase instance directly as singleton
 */

import { createBrowserClient } from '@supabase/ssr'

// Create singleton instance
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  }
)

console.log('✅ Created Supabase SSR singleton')

// Export the singleton directly
export { supabase }

// Also export as default for flexibility
export default supabase

// Keep createClient for backwards compatibility if needed
export function createClient() {
  return supabase
}

export function getSupabase() {
  return supabase
}

/**
 * USAGE EVERYWHERE:
 * 
 * import { supabase } from '../lib/supabase/client'
 * 
 * const { data } = await supabase.from('users')...
 * const { data: { user } } = await supabase.auth.getUser()
 */