import { useState } from 'react'

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [value: T, setValue: (value: T) => void, removeValue: () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value))
    setStoredValue(value)
  }

  const removeValue = () => {
    sessionStorage.removeItem(key)
    setStoredValue(initialValue)
  }

  return [storedValue, setValue, removeValue]
}
