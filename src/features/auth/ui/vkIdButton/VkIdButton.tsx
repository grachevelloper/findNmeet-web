import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import * as VKID from '@vkid/sdk'
import { initVkId } from '../../lib'
import styles from './VkIdButton.module.css'

interface VkIdButtonProps {
  redirectTo?: string
}

export function VkIdButton({ redirectTo }: VkIdButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? VKID.Languages.RUS : VKID.Languages.ENG

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    initVkId()
    const oneTap = new VKID.OneTap()
    oneTap.render({
      container,
      lang,
      showAlternativeLogin: true,
      skin: VKID.OneTapSkin.Primary,
      contentId: VKID.OneTapContentId.SIGN_IN,
      styles: {
        width: 360,
        height: 44,
        borderRadius: 8,
      },
    })


    return () => {
      oneTap.close()
      container.innerHTML = ''
    }
  }, [lang, redirectTo])

  return (
    <div className={styles.container} ref={containerRef} />
  )
}
