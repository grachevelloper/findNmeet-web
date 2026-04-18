import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { PageBackground } from '@shared/ui'
import { AuthModal, loginWithVk, parseVkCallback } from '@features/auth'
import { LandingHeader } from '../landingHeader'
import { HeroSection } from '../heroSection'
import styles from './HomePage.module.css'
import { useLocalStorage, useSessionStorage } from '@shared/lib'

const FeaturesSection = lazy(() =>
  import('../featuresSection').then((m) => ({ default: m.FeaturesSection })),
)
const UseCasesSection = lazy(() =>
  import('../useCasesSection').then((m) => ({ default: m.UseCasesSection })),
)
const CtaSection = lazy(() =>
  import('../ctaSection').then((m) => ({ default: m.CtaSection })),
)

const PENDING_QUERY_KEY = 'vk_pending_query'

export function HomePage() {
  const navigate = useNavigate()
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [vkToken, setVkToken] = useLocalStorage('token', '')
  const [queryKey, setQueryKey, removeValue] = useSessionStorage(PENDING_QUERY_KEY, '')

  // Обрабатываем редирект от ВК после авторизации
  useEffect(() => {
    const callback = parseVkCallback()
    if (!callback) return

    loginWithVk(callback)
      .then(({ token }) => {
      setVkToken(token)
       removeValue()
        if (queryKey) {
          navigate(`/search?q=${encodeURIComponent(queryKey)}`)
        }
      })
      .catch((err) => console.error('[VK ID] login failed', err))
  }, [navigate])

  const handleSearch = (query: string) => {
    if (vkToken) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    } else {
      setQueryKey(query)
      setAuthModalOpen(true)
    }
  }

  const handleAuthModalClose = () => {
    removeValue()
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
          <CtaSection />
        </Suspense>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </div>
  )
}
