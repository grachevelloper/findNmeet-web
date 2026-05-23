import { api } from '@shared/api'
import type {
  CreateFavoriteResponse,
  GetFavoriteResponse,
  ListFavoritesResponse,
  RefreshFavoriteResponse,
  UpdateFavoriteResponse,
} from '@shared/types'

const provider = 'PROVIDER_VK' as const

export function createFavorite(externalId: string, note: string) {
  return api
    .post<CreateFavoriteResponse>('/favorites/create-favorite', {
      provider,
      externalId,
      note,
    })
    .then((response) => response.data)
}

export function getFavorite(favoriteId: string) {
  return api
    .post<GetFavoriteResponse>('/favorites/get-favorite', {
      favoriteId: { value: favoriteId },
    })
    .then((response) => response.data)
}

export function listFavorites(pageToken = '', pageSize = 20) {
  return api
    .post<ListFavoritesResponse>('/favorites/list-favorites', {
      provider,
      page: {
        pageSize,
        pageToken,
      },
    })
    .then((response) => response.data)
}

export function updateFavorite(favoriteId: string, note: string) {
  return api
    .post<UpdateFavoriteResponse>('/favorites/update-favorite', {
      favoriteId: { value: favoriteId },
      patch: { note },
      updateMask: { paths: ['note'] },
    })
    .then((response) => response.data)
}

export function deleteFavorite(favoriteId: string) {
  return api
    .post('/favorites/delete-favorite', {
      favoriteId: { value: favoriteId },
    })
    .then(() => undefined)
}

export function refreshFavorite(favoriteId: string) {
  return api
    .post<RefreshFavoriteResponse>('/favorites/refresh-favorite', {
      favoriteId: { value: favoriteId },
    })
    .then((response) => response.data)
}
