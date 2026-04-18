import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from 'antd'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { VkIdButton } from '../vkIdButton'
import styles from './AuthModal.module.css'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { token } = theme.useToken()
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          style={{ '--overlay-bg': token.colorBgMask } as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.close} onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>

            <div className={styles.icon}>🔍</div>

            <h2 className={styles.title}>{t('auth.modal.title')}</h2>
            <p className={styles.subtitle}>{t('auth.modal.subtitle')}</p>

            <div className={styles.buttonWrap}>
              <VkIdButton />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
