import { describe, expect, it } from 'vitest'
import { formatApiCount } from './formatApiCount'

describe('formatApiCount', () => {
  it('formats protobuf Long-like values as renderable decimal strings', () => {
    expect(formatApiCount({ low: 42, high: 0, unsigned: false })).toBe('42')
  })

  it('keeps number and string counts renderable', () => {
    expect(formatApiCount(12)).toBe(12)
    expect(formatApiCount('34')).toBe('34')
  })

  it('returns undefined for absent or unsupported counts', () => {
    expect(formatApiCount(undefined)).toBeUndefined()
    expect(formatApiCount({ value: 1 })).toBeUndefined()
  })
})
