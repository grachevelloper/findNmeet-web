import { Outlet } from 'react-router'
import { Header } from '@widgets/header'

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
