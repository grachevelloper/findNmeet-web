import { createContext } from 'react'
import type { AuthenticatedUser } from '@shared/types'

export type AuthStatus = 'loading' | 'guest' | 'authenticated'

export interface AuthContextValue {
  closeAuthModal: () => void
  isAuthModalOpen: boolean
  isAuthenticated: boolean
  isLoggingOut: boolean
  openAuthModal: () => void
  status: AuthStatus
  user: AuthenticatedUser | null
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
