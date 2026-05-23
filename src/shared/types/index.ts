export type Provider = 'PROVIDER_UNSPECIFIED' | 'PROVIDER_VK'

export interface TimestampValue {
  seconds?: string | number
  nanos?: number
}

export interface UuidValue {
  value?: string
}

export interface PageRequest {
  pageSize: number
  pageToken: string
}

export interface PageResponse {
  nextPageToken?: string
}

export interface VkReference {
  id?: string | number
  title?: string
}

export interface VkProfile {
  vkUserId?: string | number
  firstName?: string
  lastName?: string
  screenName?: string
  photoUrl?: string
  city?: VkReference
  country?: VkReference
  homeTown?: string
  university?: VkReference
  faculty?: VkReference
  graduationYear?: number
  bdateRaw?: string
  age?: number
  onlineStatus?: string
  relation?: string
  visibility?: string
  privateMessageStatus?: string
}

export interface Favorite {
  id?: UuidValue
  provider?: Provider
  externalId?: string
  displayTitle?: string
  displayImageUrl?: string
  note?: string
  addedAt?: TimestampValue
  updatedAt?: TimestampValue
  vkSnapshot?: {
    profile?: VkProfile
    snapshotUpdatedAt?: TimestampValue
  }
}

export interface AuthUser {
  id?: UuidValue
  createdAt?: TimestampValue
  updatedAt?: TimestampValue
  lastActiveAt?: TimestampValue
  status?: string
}

export interface UserExternalLink {
  id?: UuidValue
  userId?: UuidValue
  provider?: Provider
  externalId?: string
  linkedAt?: TimestampValue
  updatedAt?: TimestampValue
  vk?: {
    firstName?: string
    lastName?: string
    screenName?: string
    avatarUrl?: string
  }
}

export interface AuthenticatedUser {
  user?: AuthUser
  externalLinks?: UserExternalLink[]
}

export interface AuthSession {
  expiresAt?: TimestampValue
}

export interface CompleteVkOAuthResponse {
  user: AuthenticatedUser
  result?: string
  session?: AuthSession
}

export interface GetUserResponse {
  user: AuthenticatedUser
}

export interface SearchResult {
  profiles?: VkProfile[]
  totalCount?: string | number
  aiCriteriaId?: UuidValue
  aiStatus?: string
  page?: PageResponse
}

export interface SearchPeopleResponse {
  result?: SearchResult
}

export interface CreateFavoriteResponse {
  favorite?: Favorite
}

export interface GetFavoriteResponse {
  favorite?: Favorite
}

export interface ListFavoritesResponse {
  favorites?: Favorite[]
  page?: PageResponse
}

export interface UpdateFavoriteResponse {
  favorite?: Favorite
}

export interface RefreshFavoriteResponse {
  favorite?: Favorite
}
