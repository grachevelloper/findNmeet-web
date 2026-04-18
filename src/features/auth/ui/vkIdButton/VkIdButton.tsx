import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import * as VKID from '@vkid/sdk'
import styles from './VkIdButton.module.css'

export function VkIdButton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { i18n } = useTranslation()

  const lang = i18n.language === 'ru' ? VKID.Languages.RUS : VKID.Languages.ENG

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const oneTap = new VKID.OneTap()
    oneTap
      .render({ container, lang })
      .on(VKID.WidgetEvents.ERROR, (err: Error) => console.error('[VK ID]', err))

    return () => {
      container.innerHTML = ''
    }
  }, [lang])

  return <div ref={containerRef} className={styles.container} />
}
