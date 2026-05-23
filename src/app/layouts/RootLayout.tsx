import { Outlet } from 'react-router'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { Fragment } from 'react'

export function RootLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  )
}
