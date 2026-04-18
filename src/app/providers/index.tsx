import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router'
import { router } from '../router'
import { initVkId } from '@features/auth'

initVkId()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

export function AppProviders() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0EA5E9',
          colorLink: '#0284C7',
          borderRadius: 12,
          fontFamily: "'Manrope', sans-serif",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ConfigProvider>
  )
}
