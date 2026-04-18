import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Target, TrendingUp, Users } from 'lucide-react'
import { SearchBar } from '@shared/ui'
import styles from './HeroSection.module.css'

interface Props {
  onSearch: (query: string) => void
}

export function HeroSection({ onSearch }: Props) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const stats = [
    { icon: Users, label: t('stats.participants'), value: '50К+' },
    { icon: TrendingUp, label: t('stats.meetings'), value: '2.5М+' },
    { icon: Target, label: t('stats.matchRate'), value: '94%' },
  ]

  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {t('hero.line1')}
        <br />
        <span className={styles.titleGradient}>{t('hero.line2')}</span>
      </motion.h1>

      <motion.p
        className={styles.desc}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {t('hero.description')}
      </motion.p>

      <motion.div
        className={styles.searchWrap}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      </motion.div>

      <motion.div
        className={styles.stats}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
          >
            <div className={styles.statIcon}>
              <stat.icon size={18} color="white" />
            </div>
            <div>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
