import * as VKID from '@vkid/sdk'
import { VK_APP_ID, VK_REDIRECT_URL } from '@shared/config'
import { generateCodeVerifier, generateState } from '../lib/proofKeyForCodeExchange'

let initialized = false

export function initVkId() {
  if (initialized) return
  initialized = true

  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  sessionStorage.setItem('vk_auth_state', state)
  sessionStorage.setItem('vk_code_verifier', codeVerifier)

  VKID.Config.init({
    app: VK_APP_ID,
    redirectUrl: VK_REDIRECT_URL,
    state,
    codeVerifier,
  })
}
