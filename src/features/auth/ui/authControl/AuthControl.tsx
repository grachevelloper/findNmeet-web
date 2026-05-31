import { Dropdown } from 'antd'
import { ChevronDown, CircleUserRound, Heart, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../model'
import styles from './AuthControl.module.css'

interface AuthControlProps {
  size?: 'md' | 'sm'
}

export function AuthControl({ size = 'md' }: AuthControlProps) {
  const navigate = useNavigate()
  const { isLoggingOut, openAuthModal, logout, status, user } = useAuth()
  const vkProfile = user?.externalLinks?.find((link) => link.provider === 'PROVIDER_VK')
  const title = vkProfile?.vk?.screenName
    ? `@${vkProfile.vk.screenName}`
    : vkProfile?.vk?.firstName ?? 'Профиль'

  if (status === 'loading') {
    return <div className={styles.placeholder} data-size={size} aria-hidden="true" />
  }

  if (status === 'guest') {
    return (
      <div className={styles.control}>
        <button className={styles.loginButton} data-size={size} onClick={openAuthModal} type="button">
          Войти через VK
        </button>
      </div>
    )
  }

  return (
    <div className={styles.control}>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              key: 'favorites',
              label: 'Избранное',
              icon: <Heart size={16} />,
            },
            {
              key: 'logout',
              label: 'Выйти',
              icon: <LogOut size={16} />,
              disabled: isLoggingOut,
            },
          ],
          onClick: ({ key }) => {
            if (key === 'favorites') {
              navigate('/favorites')
              return
            }

            if (key === 'logout') {
              void logout().catch(() => undefined)
            }
          },
        }}
      >
        <button
          aria-label="Меню профиля"
          className={styles.profileButton}
          data-size={size}
          disabled={isLoggingOut}
          type="button"
        >
          <span className={styles.avatar}>
            <CircleUserRound size={16} />
          </span>
          <span>{title}</span>
          <ChevronDown size={16} />
        </button>
      </Dropdown>
    </div>
  )
}
