import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { motion } from 'motion/react'
import { Search, Users } from 'lucide-react'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Search size={20} className={styles.titleIcon} />
          <h1 className={styles.titleText}>
            {t('searchPage.title')}
            {query && (
              <span className={styles.titleQuery}> {t('searchPage.query', { query })}</span>
            )}
          </h1>
        </motion.div>

        <motion.div
          className={styles.placeholder}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.placeholderIcon}>
            <Users size={40} color="var(--blue-400)" />
          </div>
          <p className={styles.placeholderText}>
            {query ? `Ищем людей по запросу "${query}"…` : t('searchPage.empty')}
          </p>
          <p className={styles.placeholderSub}>Дизайн страницы появится совсем скоро</p>
        </motion.div>
      </div>
    </div>
  )
}
