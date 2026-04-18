import { api } from '@shared/api'
import type { VkAuthCallbackParams } from '../model'

interface LoginResponse {
  token: string
}

export function loginWithVk(params: VkAuthCallbackParams): Promise<LoginResponse> {
  return api.post<LoginResponse>('/api/v1/auth/login', params).then((r) => r.data)
}
