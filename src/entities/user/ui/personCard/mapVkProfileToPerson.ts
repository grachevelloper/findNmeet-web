import type { Favorite, VkProfile } from '@shared/types'
import type { Person } from './PersonCard'

export function mapVkProfileToPerson(profile: VkProfile, favorite?: Favorite): Person {
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim()
  const location = [profile.city?.title, profile.country?.title].filter(Boolean).join(', ')

  return {
    externalId: String(profile.vkUserId ?? ''),
    name: fullName || profile.screenName || 'Без имени',
    subtitle: [profile.screenName ? `@${profile.screenName}` : '', profile.age ? `${profile.age} лет` : '']
      .filter(Boolean)
      .join(' • '),
    location: location || profile.homeTown || 'Локация не указана',
    avatar: profile.photoUrl,
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
  }
}
