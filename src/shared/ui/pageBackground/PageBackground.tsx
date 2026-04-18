import { motion } from 'motion/react'
import styles from './PageBackground.module.css'

export function PageBackground() {
  return (
    <>
      <div className={styles.gradientBase} />
      <div className={styles.glowOrbs}>
        <motion.div
          className={styles.glowOrb1}
          animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.glowOrb2}
          animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.glowOrb3}
          animate={{ x: [0, 60, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </>
  )
}
