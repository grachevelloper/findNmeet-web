import { api } from '@shared/api'
import type { VkAuthCallbackParams } from '../lib'
import type {
  CompleteVkOAuthResponse,
  GetUserResponse,
} from '@shared/types'

interface CompleteVkOAuthRequest {
  code: string
  state: string
  redirectUri: string
  codeVerifier: string
  deviceId?: string
}

function buildCompleteVkOAuthPayload(callback: VkAuthCallbackParams): CompleteVkOAuthRequest {
  return {
    code: callback.code,
    state: callback.state,
    redirectUri: callback.redirectUri,
    codeVerifier: callback.codeVerifier,
    deviceId: callback.deviceId || undefined,
  }
}

export async function loginWithVk(callback: VkAuthCallbackParams): Promise<GetUserResponse> {
  await api
    .post<CompleteVkOAuthResponse>('/auth/complete-vk-oauth', buildCompleteVkOAuthPayload(callback))
    .then((response) => response.data)

  return getCurrentUser()
}

export function getCurrentUser(): Promise<GetUserResponse> {
  return api.post<GetUserResponse>('/auth/get-user', {}).then((response) => response.data)
}

export function refreshSession(): Promise<void> {
  return api.post('/auth/refresh-session', {}).then(() => undefined)
}

export function revokeSession(): Promise<void> {
  return api.post('/auth/revoke-session', {}).then(() => undefined)
}
