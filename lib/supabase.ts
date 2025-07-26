import { createClient } from '@supabase/supabase-js'
import type { Database } from '../supabase/integrations/supabase/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tcouzepukfkoonjtgvdp.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb3V6ZXB1a2Zrb29uanRndmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjA1NTgsImV4cCI6MjA2OTA5NjU1OH0.YE_SK7nT9WqRh5NDxdihx6Iq0oaYVy5D2vHY6KfjmME"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper function to get user session
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
} 