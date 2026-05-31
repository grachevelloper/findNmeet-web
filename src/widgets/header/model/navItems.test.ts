import { describe, expect, it } from 'vitest'
import { getHeaderNavItems } from './navItems'

describe('getHeaderNavItems', () => {
  it('exposes search and favorites routes for the common navbar', () => {
    expect(getHeaderNavItems()).toEqual([
      { label: 'Поиск', to: '/search' },
      { label: 'Избранное', to: '/favorites' },
    ])
  })
})
