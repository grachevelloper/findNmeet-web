import { useState } from 'react'
import Cookies from 'js-cookie'

export function useCookie(
  key: string,
): [
  value: string | undefined,
  setCookie: (value: string, options?: Cookies.CookieAttributes) => void,
  removeCookie: () => void,
] {
  const [value, setValue] = useState<string | undefined>(() => Cookies.get(key))

  const setCookie = (newValue: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(key, newValue, options)
    setValue(newValue)
  }

  const removeCookie = () => {
    Cookies.remove(key)
    setValue(undefined)
  }

  return [value, setCookie, removeCookie]
}
