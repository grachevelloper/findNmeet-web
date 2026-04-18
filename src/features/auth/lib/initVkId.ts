import * as VKID from '@vkid/sdk'
import { VK_APP_ID, VK_REDIRECT_URL, VK_AUTH_STATE_KEY, VK_CODE_VERIFIER_KEY } from '@shared/config'
import { generateCodeVerifier, generateState } from './proofKeyForCodeExchange'

let initialized = false

export function initVkId() {
  if (initialized) return
  initialized = true

  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  sessionStorage.setItem(VK_AUTH_STATE_KEY, state)
  sessionStorage.setItem(VK_CODE_VERIFIER_KEY, codeVerifier)

  VKID.Config.init({
    app: VK_APP_ID,
    redirectUrl: VK_REDIRECT_URL,
    state,
    codeVerifier,
  })
}
