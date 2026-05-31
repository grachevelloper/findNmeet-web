import { describe, expect, it } from 'vitest'
import { mapVkProfileToPerson } from './mapVkProfileToPerson'

describe('mapVkProfileToPerson', () => {
  it('normalizes protobuf Long-like vk ids before saving favorites', () => {
    expect(mapVkProfileToPerson({ vkUserId: { low: 123, high: 0, unsigned: false } }).externalId).toBe('123')
  })

  it('uses favorite display title when snapshot profile has no name', () => {
    const person = mapVkProfileToPerson({}, { externalId: '42', displayTitle: 'Мария Иванова' })

    expect(person.name).toBe('Мария Иванова')
    expect(person.externalId).toBe('42')
  })
})
