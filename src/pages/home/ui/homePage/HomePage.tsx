import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { PageBackground } from '@shared/ui'
import { AuthModal, loginWithVk, parseVkCallback } from '@features/auth'
import { TOKEN_KEY, VK_PENDING_QUERY_KEY } from '@shared/config'
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
const CallToActionSection = lazy(() =>
  import('../callToActionSection').then((m) => ({ default: m.CallToActionSection })),
)

export function HomePage() {
  const navigate = useNavigate()
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [vkToken, setVkToken] = useLocalStorage(TOKEN_KEY, '')
  const [queryKey, setQueryKey, removePendingQuery] = useSessionStorage(VK_PENDING_QUERY_KEY, '')

  // Обрабатываем редирект от ВК после авторизации
  useEffect(() => {
    const callback = parseVkCallback()
    if (!callback) return

    loginWithVk(callback)
      .then(({ token }) => {
        setVkToken(token)
        removePendingQuery()
        if (queryKey) {
          const encodedQuery = encodeURIComponent(queryKey)
          navigate(`/search?q=${encodedQuery}`)
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
