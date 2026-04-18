import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Sparkles, Users } from 'lucide-react'
import styles from './LandingHeader.module.css'

export function LandingHeader() {
  const { t } = useTranslation()

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Users size={22} color="white" />
        </div>
        <div>
          <p className={styles.logoName}>FinDnMeeT</p>
          <p className={styles.logoSub}>{t('header.logoSub')}</p>
        </div>
      </div>
      <button className={styles.aiBtn}>
        <Sparkles size={15} color="var(--blue-600)" />
        {t('header.aiAssistant')}
      </button>
    </motion.header>
  )
}
