import { lazy, Suspense, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { PageBackground } from '@shared/ui'
import { useAuth } from '@features/auth'
import { VK_PENDING_QUERY_KEY } from '@shared/config'
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
  const { closeAuthModal, isAuthModalOpen, isAuthenticated, openAuthModal } = useAuth()
  const [queryKey, setQueryKey, removePendingQuery] = useSessionStorage(VK_PENDING_QUERY_KEY, '')
  const wasAuthModalOpenRef = useRef(false)

  useEffect(() => {
    if (!isAuthenticated) return

    closeAuthModal()
    if (!queryKey) return

    removePendingQuery()
    navigate(`/search?q=${encodeURIComponent(queryKey)}`)
  }, [
    closeAuthModal,
    isAuthenticated,
    navigate,
    queryKey,
    removePendingQuery,
  ])

  useEffect(() => {
    const wasOpen = wasAuthModalOpenRef.current

    if (wasOpen && !isAuthModalOpen && !isAuthenticated && queryKey) {
      removePendingQuery()
    }

    wasAuthModalOpenRef.current = isAuthModalOpen
  }, [isAuthModalOpen, isAuthenticated, queryKey, removePendingQuery])

  const handleSearch = (query: string) => {
    if (isAuthenticated) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      return
    }

    setQueryKey(query)
    openAuthModal()
  }

  return (
    <div className={styles.page}>
      <PageBackground />
      <div className={styles.content}>
        <HeroSection onSearch={handleSearch} />
        <Suspense>
          <FeaturesSection />
          <UseCasesSection />
          <CallToActionSection />
        </Suspense>
      </div>
    </div>
  )
}
