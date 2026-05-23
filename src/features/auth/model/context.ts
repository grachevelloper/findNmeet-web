import { createContext } from 'react'

export type AuthStatus = 'loading' | 'guest' | 'authenticated'

export interface AuthContextValue {
  closeAuthModal: () => void
  isAuthModalOpen: boolean
  isAuthenticated: boolean
  isLoggingOut: boolean
  openAuthModal: () => void
  status: AuthStatus
  user: unknown
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
