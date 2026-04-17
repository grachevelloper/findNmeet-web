import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Sparkles, Target, TrendingUp, Users } from 'lucide-react'
import { SearchBar } from '@shared/ui'
import { PersonCard, type Person } from '@entities/user'
import styles from './HomePage.module.css'

const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Елена Родригес',
    title: 'Senior Product Designer',
    company: 'TechFlow Inc.',
    location: 'Барселона, Испания',
    email: 'elena.r@techflow.com',
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Продуктовая стратегия'],
    matchScore: 95,
  },
  {
    id: '2',
    name: 'Маркус Чен',
    title: 'Full Stack Developer',
    company: 'Digital Ventures',
    location: 'Сингапур',
    email: 'marcus.chen@digitalventures.io',
    skills: ['React', 'Node.js', 'TypeScript', 'Cloud Architecture'],
    matchScore: 88,
  },
  {
    id: '3',
    name: 'София Андерссон',
    title: 'Data Scientist',
    company: 'AI Labs',
    location: 'Стокгольм, Швеция',
    email: 'sofia.a@ailabs.se',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Статистика'],
    matchScore: 92,
  },
  {
    id: '4',
    name: 'Джеймс Уилсон',
    title: 'Marketing Director',
    company: 'Brand Studio',
    location: 'Лондон, UK',
    email: 'j.wilson@brandstudio.co.uk',
    skills: ['Digital Marketing', 'SEO', 'Контент-стратегия', 'Аналитика'],
    matchScore: 85,
  },
  {
    id: '5',
    name: 'Юки Танака',
    title: 'iOS Engineer',
    company: 'Mobile First',
    location: 'Токио, Япония',
    email: 'yuki.t@mobilefirst.jp',
    skills: ['Swift', 'SwiftUI', 'iOS', 'Mobile Architecture'],
    matchScore: 90,
  },
  {
    id: '6',
    name: 'Оливия Мартинес',
    title: 'Product Manager',
    company: 'StartupHub',
    location: 'Остин, США',
    email: 'olivia.m@startuphub.com',
    skills: ['Product Management', 'Agile', 'UX Research', 'Roadmapping'],
    matchScore: 87,
  },
]

export function HomePage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  const stats = [
    { icon: Users, label: t('stats.participants'), value: '50K+' },
    { icon: TrendingUp, label: t('stats.meetings'), value: '2.5M+' },
    { icon: Target, label: t('stats.matchRate'), value: '94%' },
  ]

  return (
    <div className={styles.page}>
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

      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Users size={22} color="white" />
              </div>
              <div>
                <p className={styles.logoName}>findNmeet</p>
                <p className={styles.logoSub}>{t('header.logoSub')}</p>
              </div>
            </div>
            <button className={styles.headerBtn}>
              <Sparkles size={15} color="var(--blue-600)" />
              {t('header.aiAssistant')}
            </button>
          </div>
        </motion.div>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('hero.line1')}{' '}
              <br />
              <span className={styles.heroGradient}>{t('hero.line2')}</span>
            </motion.h1>

            <motion.p
              className={styles.heroDesc}
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
              <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={() => setShowResults(true)}
                onAiAssist={() => setShowResults(true)}
              />
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
          </div>
        </section>

        {/* Results */}
        {showResults && (
          <motion.section
            className={styles.results}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.resultsInner}>
              <h2 className={styles.resultsHeading}>{t('results.heading')}</h2>
              <p className={styles.resultsMeta}>
                {t('results.meta', { count: mockPeople.length })}
              </p>
              <div className={styles.grid}>
                {mockPeople.map((person, i) => (
                  <PersonCard key={person.id} person={person} index={i} />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
