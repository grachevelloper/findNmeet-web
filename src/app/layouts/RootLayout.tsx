import { Outlet } from 'react-router'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
