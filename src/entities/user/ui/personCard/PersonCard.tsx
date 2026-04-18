import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Briefcase, Mail, MapPin, Sparkles } from 'lucide-react'
import styles from './PersonCard.module.css'

export interface Person {
  id: string
  name: string
  title: string
  company: string
  location: string
  email: string
  avatar?: string
  skills: string[]
  matchScore?: number
}

interface PersonCardProps {
  person: Person
  index: number
}

export function PersonCard({ person, index }: PersonCardProps) {
  const { t } = useTranslation()
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {person.avatar ? (
                <img src={person.avatar} alt={person.name} className={styles.avatarImg} />
              ) : (
                <span className={styles.avatarInitials}>{initials}</span>
              )}
            </div>
            {person.matchScore && person.matchScore > 85 && (
              <div className={styles.badge}>
                <Sparkles size={12} color="white" />
              </div>
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.name}>{person.name}</p>
            <p className={styles.title}>{person.title}</p>

            <div className={styles.meta}>
              <div className={styles.metaRow}>
                <Briefcase size={14} />
                <span>{person.company}</span>
              </div>
              <div className={styles.metaRow}>
                <MapPin size={14} />
                <span>{person.location}</span>
              </div>
              <div className={styles.metaRow}>
                <Mail size={14} />
                <span>{person.email}</span>
              </div>
            </div>

            <div className={styles.skills}>
              {person.skills.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {person.matchScore !== undefined && (
          <>
            <div className={styles.divider} />
            <div className={styles.scoreRow}>
              <span className={styles.scoreLabel}>{t('personCard.matchScore')}</span>
              <span className={styles.scoreValue}>{person.matchScore}%</span>
            </div>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${person.matchScore}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
