import { supabase } from './supabase'
import { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export interface SignUpData {
  email: string
  password: string
  full_name: string
  user_type: 'seeker' | 'provider'
}

export interface SignInData {
  email: string
  password: string
}

export interface PasswordResetData {
  email: string
}

// Sign up with email and password
export async function signUp(data: SignUpData) {
  const { email, password, full_name, user_type } = data
  
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        user_type,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) throw error
  return authData
}

// Sign in with email and password
export async function signIn(data: SignInData) {
  const { email, password } = data
  
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return authData
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Send password reset email
export async function resetPassword(data: PasswordResetData) {
  const { email } = data
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}

// Update password (for password reset flow)
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error
}

// Resend email verification
export async function resendVerificationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) throw error
}

// Get current session
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange(callback)
}

// Check if user is authenticated
export function isAuthenticated(session: Session | null): boolean {
  return !!session?.user
}

// Check if user email is verified
export function isEmailVerified(user: User | null): boolean {
  return !!user?.email_confirmed_at
}

// Get user ID from session
export function getUserId(session: Session | null): string | null {
  return session?.user?.id || null
}
