import axios from 'axios'

function normalizeBaseUrl(rawBaseUrl: string | undefined) {
  if (!rawBaseUrl) {
    return '/api/v1'
  }

  return rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl
}

const api = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_URL),
  withCredentials: true,
})

export default api
