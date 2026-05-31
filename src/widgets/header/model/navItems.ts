export interface HeaderNavItem {
  label: string
  to: string
}

export function getHeaderNavItems(): HeaderNavItem[] {
  return [
    { label: 'Поиск', to: '/search' },
    { label: 'Избранное', to: '/favorites' },
  ]
}
