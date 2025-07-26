'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push(redirectTo)
      } else if (!requireAuth && user) {
        // If user is authenticated and we don't require auth (like login/register pages)
        router.push('/dashboard')
      }
    }
  }, [user, loading, requireAuth, redirectTo, router])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF7] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#F6CB5A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#3C2A1E]">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if authentication requirements aren't met
  if (requireAuth && !user) {
    return null
  }

  if (!requireAuth && user) {
    return null
  }

  return <>{children}</>
} 