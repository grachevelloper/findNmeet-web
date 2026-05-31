import { useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Spin } from 'antd'
import { motion } from 'motion/react'
import { Search, Sparkles, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router'
import { PersonCard, mapVkProfileToPerson, type Person } from '@entities/user'
import { VkIdButton, useAuth } from '@features/auth'
import { FavoriteDraftModal, createFavorite } from '@features/favorites'
import { api } from '@shared/api'
import { formatApiCount } from '@shared/lib'
import { SearchBar } from '@shared/ui'
import type { SearchPeopleResponse } from '@shared/types'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { hasVkOAuth, isAuthenticated } = useAuth()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const [searchValue, setSearchValue] = useState(query)
  const [favoriteDraft, setFavoriteDraft] = useState<{ person: Person; note: string } | null>(null)

  useEffect(() => {
    setSearchValue(query)
  }, [query])

  const searchQuery = useInfiniteQuery({
    queryKey: ['search', query],
    enabled: isAuthenticated && hasVkOAuth && Boolean(query),
    initialPageParam: '',
    queryFn: ({ pageParam = '' }) =>
      api
        .post<SearchPeopleResponse>('/search/search-people', {
          query,
          page: {
            pageSize: 20,
            pageToken: pageParam,
          },
        })
        .then((response) => response.data),
    getNextPageParam: (lastPage) => lastPage.result?.page?.nextPageToken || undefined,
  })

  const createFavoriteMutation = useMutation({
    mutationFn: ({ person, note }: { person: Person; note: string }) =>
      createFavorite({
        externalId: person.externalId,
        note,
        vkProfile: person.vkProfile,
      }),
    onSuccess: async () => {
      setFavoriteDraft(null)
      await queryClient.invalidateQueries({ queryKey: ['favorites', 'vk'] })
    },
  })

  const people = useMemo(
    () =>
      (searchQuery.data?.pages ?? [])
        .flatMap((page) => page.result?.profiles ?? [])
        .map((profile) => mapVkProfileToPerson(profile)),
    [searchQuery.data],
  )

  const totalCount = formatApiCount(searchQuery.data?.pages?.[0]?.result?.totalCount)
  const aiStatus = searchQuery.data?.pages?.[0]?.result?.aiStatus

  const submitSearch = () => {
    const trimmed = searchValue.trim()
    if (!trimmed) {
      return
    }

    if (!isAuthenticated) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
      return
    }

    if (!hasVkOAuth) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
      return
    }

    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.searchBarWrap}>
          <SearchBar value={searchValue} onChange={setSearchValue} onSearch={submitSearch} />
          <button className={styles.searchButton} onClick={submitSearch} type="button">
            <Search size={16} />
            Найти
          </button>
        </div>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Search size={20} className={styles.titleIcon} />
          <div>
            <h1 className={styles.titleText}>
              {t('searchPage.title')}
              {query && (
                <span className={styles.titleQuery}> {t('searchPage.query', { query })}</span>
              )}
            </h1>
            {totalCount !== undefined && <p className={styles.resultMeta}>Найдено примерно {totalCount} профилей</p>}
          </div>
        </motion.div>

        {!isAuthenticated ? (
          <motion.div
            className={styles.placeholder}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.placeholderIcon}>
              <Users size={40} color="var(--blue-400)" />
            </div>
            <p className={styles.placeholderText}>Поиск работает только для авторизованной сессии</p>
            <p className={styles.placeholderSub}>Войдите через VK, после этого можно будет искать и сохранять профили.</p>
            <VkIdButton redirectTo={query ? `/search?q=${encodeURIComponent(query)}` : '/search'} />
          </motion.div>
        ) : !hasVkOAuth ? (
          <motion.div
            className={styles.placeholder}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.placeholderIcon}>
              <Users size={40} color="var(--blue-400)" />
            </div>
            <p className={styles.placeholderText}>Для поиска людей подключите VK через OAuth</p>
            <p className={styles.placeholderSub}>
              Сессия FindNMeet уже активна, но доступ к VK API для поиска ещё не выдан. Подключи VK и повтори поиск.
            </p>
            <VkIdButton redirectTo={query ? `/search?q=${encodeURIComponent(query)}` : '/search'} />
          </motion.div>
        ) : searchQuery.isLoading ? (
          <div className={styles.loaderWrap}>
            <Spin size="large" />
          </div>
        ) : people.length === 0 ? (
          <motion.div
            className={styles.placeholder}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.placeholderIcon}>
              <Sparkles size={40} color="var(--blue-400)" />
            </div>
            <p className={styles.placeholderText}>
              {query ? `По запросу "${query}" пока ничего не пришло` : t('searchPage.empty')}
            </p>
            <p className={styles.placeholderSub}>Попробуй естественный запрос: например, "девушка из мгу 22 года" или "маркетолог из Казани".</p>
          </motion.div>
        ) : (
          <>
            <div className={styles.statusRow}>
              <div className={styles.statusBadge}>
                <Sparkles size={14} />
                {aiStatus || 'AI_SEARCH_STATUS_UNSPECIFIED'}
              </div>
            </div>
            <div className={styles.resultsGrid}>
              {people.map((person, index) => (
                <PersonCard
                  key={`${person.externalId}-${index}`}
                  person={person}
                  index={index}
                  actionState={{
                    saving:
                      createFavoriteMutation.isPending &&
                      createFavoriteMutation.variables?.person.externalId === person.externalId,
                  }}
                  onCreateFavorite={(current) => {
                    setFavoriteDraft({ person: current, note: '' })
                  }}
                />
              ))}
            </div>
            {searchQuery.hasNextPage && (
              <div className={styles.loadMoreWrap}>
                <button
                  className={styles.secondaryButton}
                  disabled={searchQuery.isFetchingNextPage}
                  onClick={() => void searchQuery.fetchNextPage()}
                  type="button"
                >
                  {searchQuery.isFetchingNextPage ? 'Загружаем ещё...' : 'Показать ещё'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <FavoriteDraftModal
        open={Boolean(favoriteDraft)}
        person={favoriteDraft?.person}
        note={favoriteDraft?.note ?? ''}
        saving={createFavoriteMutation.isPending}
        onCancel={() => setFavoriteDraft(null)}
        onNoteChange={(note) =>
          setFavoriteDraft((current) =>
            current
              ? {
                  ...current,
                  note,
                }
              : current,
          )
        }
        onSubmit={() => {
          if (favoriteDraft) {
            void createFavoriteMutation.mutateAsync(favoriteDraft)
          }
        }}
      />
    </div>
  )
}
