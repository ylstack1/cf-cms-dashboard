'use client'

import useSWR from 'swr'
import { apiClient, buildQueryString, fetcher } from '@/lib/api'
import type { Collection, PaginatedResponse } from '@/types'

interface UseCollectionsOptions {
  page?: number
  limit?: number
  search?: string
}

export function useCollections(options: UseCollectionsOptions = {}) {
  const queryString = buildQueryString({
    page: options.page,
    limit: options.limit,
    search: options.search,
  })

  return useSWR<PaginatedResponse<Collection>>(`/admin/collections${queryString}`, fetcher)
}

export function useCollection(id: string | null) {
  return useSWR<Collection>(id ? `/admin/collections/${id}` : null, fetcher)
}

export async function createCollection(payload: Pick<Collection, 'name' | 'slug' | 'description'>) {
  return apiClient.post<Collection>('/admin/collections', payload)
}

export async function updateCollection(id: string, payload: Partial<Collection>) {
  return apiClient.put<Collection>(`/admin/collections/${id}`, payload)
}
