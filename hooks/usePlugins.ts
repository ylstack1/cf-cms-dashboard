'use client'

import useSWR from 'swr'
import { apiClient, buildQueryString, fetcher } from '@/lib/api'
import type { Plugin, PaginatedResponse } from '@/types'

interface UsePluginsOptions {
  page?: number
  limit?: number
  enabled?: boolean
  search?: string
}

export function usePlugins(options: UsePluginsOptions = {}, fetchEnabled = true) {
  const queryString = buildQueryString({
    page: options.page,
    limit: options.limit,
    enabled: options.enabled,
    search: options.search,
  })

  const key = fetchEnabled ? `/admin/plugins${queryString}` : null

  return useSWR<PaginatedResponse<Plugin>>(key, fetcher)
}

export function usePlugin(id: string | null) {
  return useSWR<Plugin>(id ? `/admin/plugins/${id}` : null, fetcher)
}

export function usePluginSettings(id: string | null) {
  return useSWR<Record<string, unknown>>(id ? `/admin/plugins/${id}/settings` : null, fetcher)
}

export async function togglePlugin(id: string, enabled: boolean) {
  return apiClient.patch<Plugin>(`/admin/plugins/${id}`, { enabled })
}

export async function updatePluginSettings(id: string, settings: Record<string, unknown>) {
  return apiClient.put(`/admin/plugins/${id}/settings`, settings)
}
