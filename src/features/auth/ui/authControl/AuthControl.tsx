import { Dropdown } from 'antd'
import { ChevronDown, CircleUserRound, LogOut } from 'lucide-react'
import { useAuth } from '../../model'
import styles from './AuthControl.module.css'

interface AuthControlProps {
  size?: 'md' | 'sm'
}

export function AuthControl({ size = 'md' }: AuthControlProps) {
  const { isLoggingOut, openAuthModal, logout, status } = useAuth()

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
              key: 'logout',
              label: 'Выйти',
              icon: <LogOut size={16} />,
              disabled: isLoggingOut,
            },
          ],
          onClick: ({ key }) => {
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
          <ChevronDown size={16} />
        </button>
      </Dropdown>
    </div>
  )
}
