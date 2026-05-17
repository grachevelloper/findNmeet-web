import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Users } from 'lucide-react'
import { AuthControl } from '@features/auth'
import styles from './Header.module.css'

export function Header() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setVisible(window.scrollY > 100)
      }, 200)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <motion.header
      className={styles.header}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{
        y: { duration: 0.4, ease: 'easeInOut' },
        opacity: { duration: 0.2, ease: 'easeOut' },
      }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Users size={18} color="white" />
          </div>
          <span className={styles.logoText}>FinDnMeet</span>
        </div>
        <div className={styles.actions}>
          <AuthControl size="sm" />
        </div>
      </div>
    </motion.header>
  )
}
