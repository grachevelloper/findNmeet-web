import { api } from '@shared/api'
import * as VKID from '@vkid/sdk'
import type { VkAuthCallbackParams } from '../lib'
import { VK_CODE_VERIFIER_KEY } from '@shared/config'

interface CompleteVkWebAuthRequest {
  accessToken: {
    value: string
  }
  refreshToken?: {
    value: string
  }
  expiresInSeconds?: number
  deviceId?: string
}

interface GetUserResponse {
  user: unknown
  session: {
    expiresAt?: unknown
  }
}

interface VkExchangeResponse {
  access_token: string
  refresh_token?: string
  expires_in?: number
}

function buildCompleteVkWebAuthPayload(
  tokens: VkExchangeResponse,
  callback: VkAuthCallbackParams,
): CompleteVkWebAuthRequest {
  return {
    accessToken: {
      value: tokens.access_token,
    },
    refreshToken: tokens.refresh_token
      ? {
          value: tokens.refresh_token,
        }
      : undefined,
    expiresInSeconds: tokens.expires_in,
    deviceId: callback.deviceId || undefined,
  }
}

export async function loginWithVk(callback: VkAuthCallbackParams): Promise<GetUserResponse> {
  const codeVerifier = sessionStorage.getItem(VK_CODE_VERIFIER_KEY) ?? callback.codeVerifier
  const tokens = (await VKID.Auth.exchangeCode(
    callback.code,
    callback.deviceId,
    codeVerifier,
  )) as VkExchangeResponse

  sessionStorage.removeItem(VK_CODE_VERIFIER_KEY)

  await api.post('/api/v1/auth/complete-vk-web-auth', buildCompleteVkWebAuthPayload(tokens, callback))

  return api.post<GetUserResponse>('/api/v1/auth/get-user', {}).then((response) => response.data)
}

export function getCurrentUser(): Promise<GetUserResponse> {
  return api.post<GetUserResponse>('/api/v1/auth/get-user', {}).then((response) => response.data)
}
