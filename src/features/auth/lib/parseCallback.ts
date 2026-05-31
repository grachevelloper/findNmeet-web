import { VK_AUTH_STATE_KEY, VK_CODE_VERIFIER_KEY, VK_REDIRECT_URL } from '@shared/config'

export interface VkAuthCallbackParams {
  code: string
  state: string
  codeVerifier: string
  redirectUri: string
  deviceId: string
}

/**
 * Парсит OAuth callback после редиректа на configured VK_REDIRECT_URL.
 * Возвращает null если параметров нет или state не совпадает.
 */
export function parseVkCallback(): VkAuthCallbackParams | null {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  const state = params.get('state')
  const deviceId = params.get('device_id') ?? ''

  if (!code || !state) return null

  const savedState = sessionStorage.getItem(VK_AUTH_STATE_KEY)
  if (state !== savedState) {
    console.warn('[VK ID] state mismatch — возможна CSRF-атака')
    return null
  }

  const codeVerifier = sessionStorage.getItem(VK_CODE_VERIFIER_KEY) ?? ''

  return { code, state, codeVerifier, redirectUri: VK_REDIRECT_URL, deviceId }
}

export function clearVkCallbackState() {
  sessionStorage.removeItem(VK_AUTH_STATE_KEY)
  sessionStorage.removeItem(VK_CODE_VERIFIER_KEY)
  window.history.replaceState({}, '', window.location.pathname)
}
