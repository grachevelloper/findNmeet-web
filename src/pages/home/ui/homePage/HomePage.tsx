import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { PageBackground } from '@shared/ui'
import { AuthModal, getCurrentUser, loginWithVk, parseVkCallback } from '@features/auth'
import { VK_PENDING_QUERY_KEY } from '@shared/config'
import { LandingHeader } from '../landingHeader'
import { HeroSection } from '../heroSection'
import styles from './HomePage.module.css'
import { useSessionStorage } from '@shared/lib'

const FeaturesSection = lazy(() =>
  import('../featuresSection').then((m) => ({ default: m.FeaturesSection })),
)
const UseCasesSection = lazy(() =>
  import('../useCasesSection').then((m) => ({ default: m.UseCasesSection })),
)
const CallToActionSection = lazy(() =>
  import('../callToActionSection').then((m) => ({ default: m.CallToActionSection })),
)

export function HomePage() {
  const navigate = useNavigate()
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [queryKey, setQueryKey, removePendingQuery] = useSessionStorage(VK_PENDING_QUERY_KEY, '')

  useEffect(() => {
    let active = true
    const callback = parseVkCallback()

    if (!callback) {
      return () => {
        active = false
      }
    }

    loginWithVk(callback)
      .then(() => {
        if (!active) return
        setIsAuthenticated(true)
        setAuthModalOpen(false)
        removePendingQuery()
        if (queryKey) {
          const encodedQuery = encodeURIComponent(queryKey)
          navigate(`/search?q=${encodedQuery}`)
        }
      })
      .catch((err) => console.error('[VK ID] login failed', err))

    return () => {
      active = false
    }
  }, [navigate, queryKey, removePendingQuery])

  useEffect(() => {
    let active = true

    getCurrentUser()
      .then(() => {
        if (!active) return
        setIsAuthenticated(true)
      })
      .catch(() => {
        if (!active) return
        setIsAuthenticated(false)
      })

    return () => {
      active = false
    }
  }, [])

  const handleSearch = (query: string) => {
    if (isAuthenticated) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      return
    }

    setQueryKey(query)
    setAuthModalOpen(true)
  }

  const handleAuthModalClose = () => {
    removePendingQuery()
    setAuthModalOpen(false)
  }

  return (
    <div className={styles.page}>
      <PageBackground />
      <div className={styles.content}>
        <LandingHeader />
        <HeroSection onSearch={handleSearch} />
        <Suspense>
          <FeaturesSection />
          <UseCasesSection />
          <CallToActionSection />
        </Suspense>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </div>
  )
}
