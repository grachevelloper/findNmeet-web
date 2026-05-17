import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AuthModal } from '../ui/authModal'
import { getCurrentUser, loginWithVk, revokeSession } from '../api'
import type { GetUserResponse } from '../api'
import { clearVkCallbackState, parseVkCallback } from '../lib'
import { AuthContext } from './context'
import type { AuthStatus } from './context'

let authBootstrapPromise: Promise<GetUserResponse> | null = null

function toAuthenticatedState(response: GetUserResponse) {
  return {
    status: 'authenticated' as const,
    user: response.user,
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [user, setUser] = useState<unknown>(null)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    let active = true

    const resolveSession = async () => {
      const callback = parseVkCallback()

      if (!authBootstrapPromise) {
        authBootstrapPromise = (callback ? loginWithVk(callback) : getCurrentUser()).finally(() => {
          if (callback) {
            clearVkCallbackState()
          }
        })
      }

      try {
        const response = await authBootstrapPromise
        if (!active) return

        const authenticatedState = toAuthenticatedState(response)
        setStatus(authenticatedState.status)
        setUser(authenticatedState.user)
        setAuthModalOpen(false)
      } catch (error) {
        if (!active) return

        if (callback) {
          console.error('[auth] VK login failed', error)
        }

        setStatus('guest')
        setUser(null)
      }
    }

    void resolveSession()

    return () => {
      active = false
    }
  }, [])

  const logout = async () => {
    setIsLoggingOut(true)

    try {
      await revokeSession()
      setStatus('guest')
      setUser(null)
      setAuthModalOpen(false)
    } catch (error) {
      console.error('[auth] logout failed', error)
      throw error
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <AuthContext
      value={{
        closeAuthModal: () => setAuthModalOpen(false),
        isAuthModalOpen,
        isAuthenticated: status === 'authenticated',
        isLoggingOut,
        openAuthModal: () => setAuthModalOpen(true),
        status,
        user,
        logout,
      }}
    >
      {children}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </AuthContext>
  )
}
