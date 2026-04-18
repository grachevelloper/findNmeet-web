import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ArrowRight, Coffee, Heart, Star, UserPlus } from 'lucide-react'
import styles from './UseCasesSection.module.css'

const IMAGES = [
  'https://images.unsplash.com/flagged/photo-1575390130509-87f184b5d188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBkYXRpbmclMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NjQzMjIyOHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1623120893483-0e9d83ebbfe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwbGF1Z2hpbmclMjBjb2ZmZWV8ZW58MXx8fHwxNzc2NDMyMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1768226791333-32841ea99c82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBob2JieSUyMGFjdGl2aXRpZXN8ZW58MXx8fHwxNzc2NDMyMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1744943777031-0ac5f4ac490a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMGZyaWVuZHMlMjBoYW5naW5nJTIwb3V0fGVufDF8fHx8MTc3NjQzMjIyOXww&ixlib=rb-4.1.0&q=80&w=1080',
]

const ICONS = [Heart, Coffee, Star, UserPlus]
const KEYS = ['romance', 'friends', 'interests', 'events'] as const

export function UseCasesSection() {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t('useCases.title')}</h2>
          <p className={styles.subtitle}>{t('useCases.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {KEYS.map((key, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={key}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div
                  className={styles.img}
                  style={{ backgroundImage: `url(${IMAGES[i]})` }}
                />
                <div className={styles.overlay} />
                <div className={styles.content}>
                  <div className={styles.icon}>
                    <Icon size={28} color="white" />
                  </div>
                  <h3 className={styles.cardTitle}>{t(`useCases.items.${key}.title`)}</h3>
                  <p className={styles.cardDesc}>{t(`useCases.items.${key}.desc`)}</p>
                  <div className={styles.learnMore}>
                    <span>Подробнее</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
    </section>
  )
}
