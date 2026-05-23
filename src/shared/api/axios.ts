import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

export function normalizeBaseUrl(rawBaseUrl: string | undefined) {
  if (!rawBaseUrl) {
    return '/api/v1'
  }

  return rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl
}

type RetryableConfig = InternalAxiosRequestConfig & {
  _retryAfterRefresh?: boolean
}

const baseURL = normalizeBaseUrl(import.meta.env.VITE_API_URL)

const api = axios.create({
  baseURL,
  withCredentials: true,
})

let refreshPromise: Promise<void> | null = null

function shouldSkipRefresh(url?: string) {
  return Boolean(
    url?.includes('/auth/refresh-session') ||
      url?.includes('/auth/complete-vk-oauth') ||
      url?.includes('/auth/revoke-session'),
  )
}

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${baseURL}/auth/refresh-session`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined

    if (
      error.response?.status !== 401 ||
      !config ||
      config._retryAfterRefresh ||
      shouldSkipRefresh(config.url)
    ) {
      throw error
    }

    config._retryAfterRefresh = true
    await refreshSession()

    return api.request(config)
  },
)

export default api
