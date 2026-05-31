import { motion } from 'motion/react'
import {
  Clock3,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircleWarning,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import type { CreateFavoriteVkProfile, Favorite } from '@shared/types'
import styles from './PersonCard.module.css'

export interface PersonCardActionState {
  deleting?: boolean
  refreshing?: boolean
  saving?: boolean
}

export interface Person {
  externalId: string
  name: string
  subtitle: string
  location: string
  avatar?: string
  age?: number
  university?: string
  faculty?: string
  homeTown?: string
  screenName?: string
  relation?: string
  visibility?: string
  privateMessageStatus?: string
  note?: string
  favorite?: Favorite
  vkProfile?: CreateFavoriteVkProfile
}

interface PersonCardProps {
  person: Person
  index: number
  actionState?: PersonCardActionState
  onCreateFavorite?: (person: Person) => void
  onDeleteFavorite?: (person: Person) => void
  onEditFavorite?: (person: Person) => void
  onRefreshFavorite?: (person: Person) => void
}

function formatUpdatedAt(value?: Favorite['updatedAt']) {
  const seconds = value?.seconds

  if (!seconds) {
    return 'Недавно'
  }

  const date = new Date(Number(seconds) * 1000)
  return Number.isNaN(date.getTime()) ? 'Недавно' : date.toLocaleDateString('ru-RU')
}

export function PersonCard({
  person,
  index,
  actionState,
  onCreateFavorite,
  onDeleteFavorite,
  onEditFavorite,
  onRefreshFavorite,
}: PersonCardProps) {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')
  const education = [person.university, person.faculty].filter(Boolean).join(', ')
  const isFavorite = Boolean(person.favorite)
  const handle = person.screenName ? `@${person.screenName}` : 'Профиль VK'

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className={styles.card}>
        <div className={styles.portrait}>
          <div className={styles.avatar}>
            {person.avatar ? (
              <img src={person.avatar} alt={person.name} className={styles.avatarImg} />
            ) : (
              <span className={styles.avatarInitials}>{initials}</span>
            )}
          </div>
          <span className={styles.sourcePill}>{handle}</span>
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <p className={styles.name}>{person.name}</p>
            <p className={styles.title}>{person.subtitle || handle}</p>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <MapPin size={15} />
              <span>{person.location}</span>
            </div>
            {education && (
              <div className={styles.metaRow}>
                <GraduationCap size={15} />
                <span>{education}</span>
              </div>
            )}
            {person.privateMessageStatus && (
              <div className={styles.metaRow}>
                <MessageCircleWarning size={15} />
                <span>{person.privateMessageStatus}</span>
              </div>
            )}
            {person.favorite && (
              <div className={styles.metaRow}>
                <Clock3 size={15} />
                <span>Избранное обновлено {formatUpdatedAt(person.favorite.updatedAt)}</span>
              </div>
            )}
          </div>

          <div className={styles.skills}>
            {person.homeTown && <span className={styles.skill}>Родной город: {person.homeTown}</span>}
            {person.relation && <span className={styles.skill}>{person.relation}</span>}
            {person.visibility && <span className={styles.skill}>{person.visibility}</span>}
          </div>

          {person.note && (
            <div className={styles.noteBlock}>
              <p className={styles.noteLabel}>Заметка</p>
              <p className={styles.noteText}>{person.note}</p>
            </div>
          )}

          <div className={styles.actions}>
            {isFavorite ? (
              <>
                <button
                  className={styles.secondaryAction}
                  disabled={actionState?.saving}
                  onClick={() => onEditFavorite?.(person)}
                  type="button"
                >
                  <Heart size={14} />
                  Изменить заметку
                </button>
                <button
                  className={styles.secondaryAction}
                  disabled={actionState?.refreshing}
                  onClick={() => onRefreshFavorite?.(person)}
                  type="button"
                >
                  <RefreshCw size={14} className={actionState?.refreshing ? styles.spin : undefined} />
                  Обновить
                </button>
                <button
                  className={styles.dangerAction}
                  disabled={actionState?.deleting}
                  onClick={() => onDeleteFavorite?.(person)}
                  type="button"
                >
                  <Trash2 size={14} />
                  Удалить
                </button>
              </>
            ) : (
              <button
                className={styles.primaryAction}
                disabled={actionState?.saving}
                onClick={() => onCreateFavorite?.(person)}
                type="button"
              >
                <Heart size={14} />
                Добавить в избранное
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
