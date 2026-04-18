import { motion } from 'motion/react'
import styles from './PageBackground.module.css'

export function PageBackground() {
  return (
    <>
      <div className={styles.bg} />
      <div className={styles.orbs}>
        <motion.div
          className={styles.orb1}
          animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.orb2}
          animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.orb3}
          animate={{ x: [0, 60, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </>
  )
}
