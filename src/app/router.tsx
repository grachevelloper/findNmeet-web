import { createBrowserRouter } from 'react-router'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from '@pages/home'
import { SearchPage } from '@pages/search'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
    ],
  },
])
