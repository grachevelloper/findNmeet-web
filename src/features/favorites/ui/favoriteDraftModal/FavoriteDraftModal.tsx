import { Heart, Sparkles, StickyNote } from 'lucide-react'
import { Modal } from 'antd'
import type { Person } from '@entities/user'
import styles from './FavoriteDraftModal.module.css'

interface FavoriteDraftModalProps {
  open: boolean
  person?: Person
  note: string
  saving?: boolean
  onCancel: () => void
  onNoteChange: (note: string) => void
  onSubmit: () => void
}

export function FavoriteDraftModal({
  open,
  person,
  note,
  saving,
  onCancel,
  onNoteChange,
  onSubmit,
}: FavoriteDraftModalProps) {
  return (
    <Modal
      centered
      className={styles.modal}
      footer={null}
      open={open}
      title={null}
      width={560}
      onCancel={onCancel}
    >
      <div className={styles.shell}>
        <div className={styles.hero}>
          <div className={styles.iconWrap}>
            <Heart size={30} />
          </div>
          <div>
            <span className={styles.eyebrow}>
              <Sparkles size={14} />
              Новое избранное
            </span>
            <h2 className={styles.title}>Сохранить профиль</h2>
           
          </div>
        </div>

        <div className={styles.body}>
          <label className={styles.noteField}>
            <span className={styles.noteLabel}>
              <StickyNote size={15} />
              Заметка для себя
            </span>
            <textarea
              className={styles.textarea}
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="Напишите.."
            />
          </label>

          <div className={styles.prompts}>
            <span>Контекст знакомства</span>
            <span>Почему сохранить</span>
          </div>

          <div className={styles.actions}>
            <button className={styles.cancelButton} type="button" onClick={onCancel}>
              Отмена
            </button>
            <button
              className={styles.submitButton}
              disabled={!person || saving}
              type="button"
              onClick={onSubmit}
            >
              <Heart size={16} />
              {saving ? 'Сохраняем...' : 'Сохранить в избранное'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
