import { useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal, Spin } from 'antd'
import { motion } from 'motion/react'
import { Search, Sparkles, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router'
import { PersonCard, mapVkProfileToPerson, type Person } from '@entities/user'
import { useAuth } from '@features/auth'
import { createFavorite } from '@features/favorites'
import { api } from '@shared/api'
import { SearchBar } from '@shared/ui'
import type { SearchPeopleResponse } from '@shared/types'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuthenticated, openAuthModal } = useAuth()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const [searchValue, setSearchValue] = useState(query)
  const [favoriteDraft, setFavoriteDraft] = useState<{ person: Person; note: string } | null>(null)

  useEffect(() => {
    setSearchValue(query)
  }, [query])

  const searchQuery = useInfiniteQuery({
    queryKey: ['search', query],
    enabled: isAuthenticated && Boolean(query),
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
      createFavorite(person.externalId, note),
    onSuccess: async () => {
      setFavoriteDraft(null)
      await queryClient.invalidateQueries({ queryKey: ['favorites', 'vk'] })
    },
  })

  const people = useMemo(
    () =>
      (searchQuery.data?.pages ?? [])
        .flatMap((page) => page.result?.profiles ?? [])
        .map((profile, index) => ({
          ...mapVkProfileToPerson(profile),
          matchScore: Math.max(64, 96 - (index % 6) * 4),
        })),
    [searchQuery.data],
  )

  const totalCount = searchQuery.data?.pages?.[0]?.result?.totalCount
  const aiStatus = searchQuery.data?.pages?.[0]?.result?.aiStatus

  const submitSearch = () => {
    const trimmed = searchValue.trim()
    if (!trimmed) {
      return
    }

    if (!isAuthenticated) {
      openAuthModal()
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
            <p className={styles.placeholderSub}>Открой вход через VK, после этого можно будет искать и сохранять профили.</p>
            <button className={styles.primaryButton} onClick={openAuthModal} type="button">
              Войти через VK
            </button>
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

      <Modal
        title="Добавить в избранное"
        open={Boolean(favoriteDraft)}
        onCancel={() => setFavoriteDraft(null)}
        onOk={() => {
          if (favoriteDraft) {
            void createFavoriteMutation.mutateAsync(favoriteDraft)
          }
        }}
        okText="Сохранить"
        confirmLoading={createFavoriteMutation.isPending}
      >
        <p style={{ marginBottom: 12 }}>
          <strong>{favoriteDraft?.person.name}</strong>
        </p>
        <textarea
          rows={5}
          value={favoriteDraft?.note ?? ''}
          onChange={(event) =>
            setFavoriteDraft((current) =>
              current
                ? {
                    ...current,
                    note: event.target.value,
                  }
                : current,
            )
          }
          placeholder="Что важно про этого человека: контекст, причина сохранить, следующий шаг."
          style={{ width: '100%', borderRadius: 12, padding: 12, resize: 'vertical' }}
        />
      </Modal>
    </div>
  )
}
