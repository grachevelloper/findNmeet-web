import { describe, expect, it } from 'vitest'
import { buildCreateFavoritePayload } from './index'

describe('buildCreateFavoritePayload', () => {
  it('includes vk profile snapshot when creating a favorite', () => {
    expect(
      buildCreateFavoritePayload({
        externalId: '10003',
        note: 'Красивая!',
        vkProfile: {
          vkUserId: '10003',
          firstName: 'Анна',
          lastName: 'Новикова',
          screenName: 'anna_msk_demo_03',
          photoUrl: 'https://images.unsplash.com/photo.jpg',
        },
      }),
    ).toEqual({
      provider: 'PROVIDER_VK',
      externalId: '10003',
      note: 'Красивая!',
      vkProfile: {
        vkUserId: '10003',
        firstName: 'Анна',
        lastName: 'Новикова',
        screenName: 'anna_msk_demo_03',
        photoUrl: 'https://images.unsplash.com/photo.jpg',
      },
    })
  })
})
