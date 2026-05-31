import { Modal } from 'antd'
import { Pencil, StickyNote } from 'lucide-react'
import styles from './FavoriteNoteModal.module.css'

interface FavoriteNoteModalProps {
  open: boolean
  note: string
  saving?: boolean
  onCancel: () => void
  onNoteChange: (note: string) => void
  onSubmit: () => void
}

export function FavoriteNoteModal({
  open,
  note,
  saving,
  onCancel,
  onNoteChange,
  onSubmit,
}: FavoriteNoteModalProps) {
  return (
    <Modal
      centered
      className={styles.modal}
      footer={null}
      open={open}
      title={null}
      width={520}
      onCancel={onCancel}
    >
      <div className={styles.shell}>
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <Pencil size={24} />
          </div>
          <div>
            <p className={styles.eyebrow}>Заметка в избранном</p>
            <h2 className={styles.title}>Обновить контекст</h2>
            <p className={styles.subtitle}>Сохраните то, что важно помнить перед следующим контактом.</p>
          </div>
        </div>

        <label className={styles.noteField}>
          <span className={styles.noteLabel}>
            <StickyNote size={15} />
            Заметка
          </span>
          <textarea
            className={styles.textarea}
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Контекст, причина сохранить, следующий шаг."
          />
        </label>

        <div className={styles.actions}>
          <button className={styles.cancelButton} type="button" onClick={onCancel}>
            Отмена
          </button>
          <button className={styles.submitButton} disabled={saving} type="button" onClick={onSubmit}>
            {saving ? 'Сохраняем...' : 'Сохранить заметку'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
