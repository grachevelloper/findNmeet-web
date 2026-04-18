import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Search, Sparkles } from 'lucide-react'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  onAiAssist?: () => void
}

export function SearchBar({ value, onChange, onSearch, onAiAssist }: SearchBarProps) {
  const { t } = useTranslation()
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.container}>
        <Search size={20} className={styles.icon} />
        <input
          className={styles.input}
          type="text"
          value={value}
          placeholder={t('search.placeholder')}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        {onAiAssist && (
          <button className={styles.aiBtn} onClick={onAiAssist}>
            <Sparkles size={15} />
            {t('search.aiAssist')}
          </button>
        )}
      </div>
    </motion.div>
  )
}
