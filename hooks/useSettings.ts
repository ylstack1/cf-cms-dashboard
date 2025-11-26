'use client'

import useSWR from 'swr'
import { apiClient, fetcher } from '@/lib/api'
import type { Settings } from '@/types'

export function useSettings() {
  return useSWR<Settings>('/admin/settings', fetcher)
}

export async function updateSettings(payload: Partial<Settings>) {
  return apiClient.put<Settings>('/admin/settings', payload)
}
