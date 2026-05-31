import type { Favorite, VkProfile } from '@shared/types'
import { formatApiCount } from '@shared/lib'
import type { Person } from './PersonCard'

export function mapVkProfileToPerson(profile: VkProfile, favorite?: Favorite): Person {
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim()
  const location = [profile.city?.title, profile.country?.title].filter(Boolean).join(', ')
  const fallbackTitle = favorite?.displayTitle?.trim()
  const externalId = String(formatApiCount(profile.vkUserId) ?? favorite?.externalId ?? '')

  return {
    externalId,
    name: fullName || profile.screenName || fallbackTitle || 'Без имени',
    subtitle: [profile.screenName ? `@${profile.screenName}` : '', profile.age ? `${profile.age} лет` : '']
      .filter(Boolean)
      .join(' • '),
    location: location || profile.homeTown || 'Локация не указана',
    avatar: profile.photoUrl || favorite?.displayImageUrl,
    age: profile.age,
    university: profile.university?.title,
    faculty: profile.faculty?.title,
    homeTown: profile.homeTown,
    screenName: profile.screenName,
    relation: profile.relation,
    visibility: profile.visibility,
    privateMessageStatus: profile.privateMessageStatus,
    note: favorite?.note,
    favorite,
    vkProfile: {
      vkUserId: externalId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      screenName: profile.screenName,
      photoUrl: profile.photoUrl,
    },
  }
}
