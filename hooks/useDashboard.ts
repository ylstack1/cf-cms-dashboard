'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/api'
import type { DashboardStats, RecentActivity } from '@/types'

export function useDashboardStats() {
  return useSWR<DashboardStats>('/admin/dashboard/stats', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })
}

export function useRecentActivity() {
  return useSWR<RecentActivity[]>('/admin/dashboard/recent-activity', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })
}
