import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Heart, Search } from 'lucide-react'
import styles from './CallToActionSection.module.css'

export function CallToActionSection() {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.content}>
            <div className={styles.icon}>
              <Heart size={32} color="white" />
            </div>
            <h2 className={styles.title}>{t('cta.title')}</h2>
            <p className={styles.subtitle}>{t('cta.subtitle')}</p>
            <motion.button
              className={styles.btn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Search size={20} />
              {t('cta.button')}
            </motion.button>
          </div>
        </motion.div>
    </section>
  )
}
