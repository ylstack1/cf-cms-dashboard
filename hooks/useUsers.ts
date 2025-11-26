'use client'

import useSWR from 'swr'
import { apiClient, buildQueryString, fetcher } from '@/lib/api'
import type { User, PaginatedResponse } from '@/types'

interface UseUsersOptions {
  page?: number
  limit?: number
  role?: 'admin' | 'editor' | 'viewer'
  search?: string
}

export function useUsers(options: UseUsersOptions = {}) {
  const queryString = buildQueryString({
    page: options.page,
    limit: options.limit,
    role: options.role,
    search: options.search,
  })

  return useSWR<PaginatedResponse<User>>(`/admin/users${queryString}`, fetcher)
}

export function useUser(id: string | null) {
  return useSWR<User>(id ? `/admin/users/${id}` : null, fetcher)
}

export async function createUser(payload: { email: string; name: string; role: User['role']; password: string }) {
  return apiClient.post<User>('/admin/users', payload)
}

export async function updateUser(id: string, payload: Partial<User>) {
  return apiClient.put<User>(`/admin/users/${id}`, payload)
}

export async function deleteUser(id: string) {
  return apiClient.delete(`/admin/users/${id}`)
}
