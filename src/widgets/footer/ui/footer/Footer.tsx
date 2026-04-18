import { useTranslation } from 'react-i18next'
import { Users } from 'lucide-react'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Users size={20} color="white" />
          </div>
          <span className={styles.logoName}>FinDnMeeT</span>
        </div>
        <p className={styles.copy}>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
