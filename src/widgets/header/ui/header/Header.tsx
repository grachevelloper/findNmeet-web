import { motion } from 'motion/react'
import { Heart, Search, Users } from 'lucide-react'
import { NavLink } from 'react-router'
import { AuthControl } from '@features/auth'
import { getHeaderNavItems } from '../../model'
import styles from './Header.module.css'

export function Header() {
  const navItems = getHeaderNavItems()

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.inner}>
        <NavLink className={styles.logo} to="/">
          <div className={styles.logoIcon}>
            <Users size={18} color="white" />
          </div>
          <span className={styles.logoText}>FinDnMeet</span>
        </NavLink>
        <nav className={styles.nav} aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              to={item.to}
            >
              {item.to === '/search' ? <Search size={15} /> : <Heart size={15} />}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions}>
          <AuthControl size="sm" />
        </div>
      </div>
    </motion.header>
  )
}
