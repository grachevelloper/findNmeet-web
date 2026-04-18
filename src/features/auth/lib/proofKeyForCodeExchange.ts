function randomBase64url(bytes: number): string {
  const array = new Uint8Array(bytes)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const generateState = () => randomBase64url(16)
export const generateCodeVerifier = () => randomBase64url(32)
