import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { MessageCircle, Shield, Sparkles, Zap } from 'lucide-react'
import styles from './FeaturesSection.module.css'

export function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    { icon: Sparkles, title: t('features.items.smartSearch.title'), desc: t('features.items.smartSearch.desc') },
    { icon: Zap, title: t('features.items.instant.title'), desc: t('features.items.instant.desc') },
    { icon: Shield, title: t('features.items.safety.title'), desc: t('features.items.safety.desc') },
    { icon: MessageCircle, title: t('features.items.aiAssistant.title'), desc: t('features.items.aiAssistant.desc') },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t('features.title')}</h2>
          <p className={styles.subtitle}>{t('features.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={styles.icon}>
                <feature.icon size={24} color="white" />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
