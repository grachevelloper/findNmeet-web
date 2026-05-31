import { Clock3, Heart, MapPin, Pencil, RefreshCw, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import type { Person } from '@entities/user'
import styles from './FavoritePersonCard.module.css'

interface FavoritePersonCardActionState {
  deleting?: boolean
  refreshing?: boolean
  saving?: boolean
}

interface FavoritePersonCardProps {
  person: Person
  index: number
  actionState?: FavoritePersonCardActionState
  onDelete: (person: Person) => void
  onEditNote: (person: Person) => void
  onRefresh: (person: Person) => void
}

function formatUpdatedAt(person: Person) {
  const seconds = person.favorite?.updatedAt?.seconds

  if (!seconds) {
    return 'Недавно'
  }

  const date = new Date(Number(seconds) * 1000)
  return Number.isNaN(date.getTime()) ? 'Недавно' : date.toLocaleDateString('ru-RU')
}

export function FavoritePersonCard({
  person,
  index,
  actionState,
  onDelete,
  onEditNote,
  onRefresh,
}: FavoritePersonCardProps) {
  const handle = person.screenName ? `@${person.screenName}` : 'VK профиль'
  const note = person.note?.trim()
  const hasKnownLocation = person.location && person.location !== 'Локация не указана'

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.top}>
        <div className={styles.identity}>
          <p className={styles.name}>{person.name}</p>
          <p className={styles.handle}>{handle}</p>
        </div>
        <div className={styles.savedBadge}>
          <Heart size={14} />
          Сохранён
        </div>
      </div>

      <div className={styles.meta}>
        {hasKnownLocation && (
          <div className={styles.metaItem}>
            <MapPin size={14} />
            <span>{person.location}</span>
          </div>
        )}
        <div className={styles.metaItem}>
          <Clock3 size={14} />
          <span>Обновлено {formatUpdatedAt(person)}</span>
        </div>
      </div>

      <div className={styles.note}>
        <span className={styles.noteLabel}>Заметка</span>
        <p className={styles.noteText}>
          {note || 'Заметки пока нет. Добавьте контекст, чтобы этот контакт не потерял смысл.'}
        </p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryAction}
          disabled={actionState?.saving}
          onClick={() => onEditNote(person)}
          type="button"
        >
          <Pencil size={14} />
          Заметка
        </button>
        <button
          className={styles.secondaryAction}
          disabled={actionState?.refreshing}
          onClick={() => onRefresh(person)}
          type="button"
        >
          <RefreshCw size={14} className={actionState?.refreshing ? styles.spin : undefined} />
          Обновить
        </button>
        <button
          className={styles.dangerAction}
          disabled={actionState?.deleting}
          onClick={() => onDelete(person)}
          type="button"
        >
          <Trash2 size={14} />
          Удалить
        </button>
      </div>
    </motion.article>
  )
}
