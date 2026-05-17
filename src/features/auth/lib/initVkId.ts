import * as VKID from '@vkid/sdk'
import { VK_APP_ID, VK_REDIRECT_URL, VK_AUTH_STATE_KEY, VK_CODE_VERIFIER_KEY } from '@shared/config'
import { generateCodeVerifier, generateState } from './proofKeyForCodeExchange'

export function initVkId() {
  const state = sessionStorage.getItem(VK_AUTH_STATE_KEY) ?? generateState()
  const codeVerifier = sessionStorage.getItem(VK_CODE_VERIFIER_KEY) ?? generateCodeVerifier()

  sessionStorage.setItem(VK_AUTH_STATE_KEY, state)
  sessionStorage.setItem(VK_CODE_VERIFIER_KEY, codeVerifier)

  VKID.Config.init({
    app: VK_APP_ID,
    redirectUrl: VK_REDIRECT_URL,
    state,
    codeVerifier,
    mode: VKID.ConfigAuthMode.Redirect,
  })
}
