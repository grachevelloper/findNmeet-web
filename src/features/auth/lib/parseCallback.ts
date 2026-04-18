import { VK_AUTH_STATE_KEY, VK_CODE_VERIFIER_KEY } from '@shared/config'

export interface VkAuthCallbackParams {
  code: string
  deviceId: string
  codeVerifier: string
}

/**
 * Парсит параметры VK ID после редиректа на https://findnmeet.ru?code=...&state=...&device_id=...
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

  sessionStorage.removeItem(VK_AUTH_STATE_KEY)
  sessionStorage.removeItem(VK_CODE_VERIFIER_KEY)

  // Убираем параметры из URL без перезагрузки страницы
  window.history.replaceState({}, '', window.location.pathname)

  return { code, deviceId, codeVerifier }
}
