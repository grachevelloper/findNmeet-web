import { useMemo, useState } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal, Spin } from 'antd'
import { motion } from 'motion/react'
import { Heart, Search } from 'lucide-react'
import { useNavigate } from 'react-router'
import { PersonCard } from '@entities/user'
import { mapVkProfileToPerson } from '@entities/user'
import {
  deleteFavorite,
  listFavorites,
  refreshFavorite,
  updateFavorite,
} from '@features/favorites'
import { useAuth } from '@features/auth'
import styles from './FavoritesPage.module.css'

const favoritesQueryKey = ['favorites', 'vk'] as const

export function FavoritesPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuthenticated, openAuthModal } = useAuth()
  const [noteModalState, setNoteModalState] = useState<{ favoriteId: string; value: string } | null>(null)

  const favoritesQuery = useInfiniteQuery({
    queryKey: favoritesQueryKey,
    queryFn: ({ pageParam = '' }) => listFavorites(pageParam),
    getNextPageParam: (lastPage) => lastPage.page?.nextPageToken || undefined,
    enabled: isAuthenticated,
    initialPageParam: '',
  })

  const invalidateFavorites = () => queryClient.invalidateQueries({ queryKey: favoritesQueryKey })

  const updateMutation = useMutation({
    mutationFn: ({ favoriteId, note }: { favoriteId: string; note: string }) =>
      updateFavorite(favoriteId, note),
    onSuccess: async () => {
      setNoteModalState(null)
      await invalidateFavorites()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: invalidateFavorites,
  })

  const refreshMutation = useMutation({
    mutationFn: refreshFavorite,
    onSuccess: invalidateFavorites,
  })

  const favoritePeople = useMemo(
    () =>
      (favoritesQuery.data?.pages ?? [])
        .flatMap((page) => page.favorites ?? [])
        .map((favorite) => mapVkProfileToPerson(favorite.vkSnapshot?.profile ?? {}, favorite)),
    [favoritesQuery.data],
  )

  const activeFavoriteId = noteModalState?.favoriteId

  if (!isAuthenticated) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.authGate}>
            <h1 className={styles.authGateTitle}>Избранное доступно после входа</h1>
            <p className={styles.authGateText}>
              Авторизуйся через VK, чтобы сохранять профили, оставлять заметки и быстро возвращаться к найденным людям.
            </p>
            <button className={styles.authGateAction} onClick={openAuthModal} type="button">
              Войти через VK
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className={styles.eyebrow}>
              <Heart size={14} />
              Личный список контактов
            </div>
            <h1 className={styles.title}>Избранные профили</h1>
            <p className={styles.subtitle}>
              Здесь собраны люди, которых ты уже отметил. Можно править заметки, подтягивать свежий снапшот и удалять лишнее.
            </p>
          </div>
          <div className={styles.heroActions}>
            <button className={styles.heroButton} onClick={() => navigate('/search')} type="button">
              <Search size={16} />
              Вернуться к поиску
            </button>
          </div>
        </motion.div>

        {favoritesQuery.isLoading ? (
          <Spin size="large" />
        ) : favoritePeople.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Список пока пуст</h2>
            <p className={styles.emptyText}>
              Сохраняй интересные профили из результатов поиска. Здесь же потом можно будет держать заметки по каждому контакту.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {favoritePeople.map((person, index) => {
                const favoriteId = person.favorite?.id?.value ?? ''

                return (
                  <PersonCard
                    key={favoriteId || person.externalId}
                    person={person}
                    index={index}
                    actionState={{
                      deleting: deleteMutation.isPending && deleteMutation.variables === favoriteId,
                      refreshing: refreshMutation.isPending && refreshMutation.variables === favoriteId,
                      saving: updateMutation.isPending && updateMutation.variables?.favoriteId === favoriteId,
                    }}
                    onDeleteFavorite={(current) => {
                      const id = current.favorite?.id?.value
                      if (id) {
                        void deleteMutation.mutateAsync(id)
                      }
                    }}
                    onEditFavorite={(current) => {
                      const id = current.favorite?.id?.value
                      if (id) {
                        setNoteModalState({ favoriteId: id, value: current.note ?? '' })
                      }
                    }}
                    onRefreshFavorite={(current) => {
                      const id = current.favorite?.id?.value
                      if (id) {
                        void refreshMutation.mutateAsync(id)
                      }
                    }}
                  />
                )
              })}
            </div>

            {favoritesQuery.hasNextPage && (
              <div className={styles.loadMoreWrap}>
                <button
                  className={styles.loadMore}
                  disabled={favoritesQuery.isFetchingNextPage}
                  onClick={() => void favoritesQuery.fetchNextPage()}
                  type="button"
                >
                  {favoritesQuery.isFetchingNextPage ? 'Загружаем ещё...' : 'Показать ещё'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        title="Обновить заметку"
        open={Boolean(noteModalState)}
        onCancel={() => setNoteModalState(null)}
        onOk={() => {
          if (noteModalState) {
            void updateMutation.mutateAsync({
              favoriteId: noteModalState.favoriteId,
              note: noteModalState.value,
            })
          }
        }}
        okText="Сохранить"
        confirmLoading={updateMutation.isPending && updateMutation.variables?.favoriteId === activeFavoriteId}
      >
        <textarea
          rows={5}
          value={noteModalState?.value ?? ''}
          onChange={(event) =>
            setNoteModalState((current) =>
              current
                ? {
                    ...current,
                    value: event.target.value,
                  }
                : current,
            )
          }
          style={{ width: '100%', borderRadius: 12, padding: 12, resize: 'vertical' }}
        />
      </Modal>
    </div>
  )
}
