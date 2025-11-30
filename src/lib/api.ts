import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/authStore'
import type { ApiError, AuthResponse } from '@/types'
import { getMockApi } from './mockApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

const redirectToLogin = () => {
  if (typeof window === 'undefined') return
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers = config.headers ?? {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      const { token } = useAuthStore.getState()
      if (token) {
        useAuthStore.getState().logout()
      }
      redirectToLogin()
    }
    return Promise.reject(error)
  },
)

export const buildQueryString = (params?: Record<string, string | number | boolean | undefined | null>) => {
  if (!params) return ''
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    searchParams.set(key, String(value))
  })
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

export async function fetcher<T>(url: string): Promise<T> {
  if (USE_MOCK_API) {
    return getMockApi().get<T>(url)
  }
  const response = await api.get<T>(url)
  return response.data
}

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    if (USE_MOCK_API) {
      return getMockApi().get<T>(url)
    }
    const response = await api.get<T>(url, config)
    return response.data
  },
  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    if (USE_MOCK_API) {
      return getMockApi().post<T>(url, data)
    }
    const response = await api.post<T>(url, data, config)
    return response.data
  },
  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    if (USE_MOCK_API) {
      return getMockApi().put<T>(url, data)
    }
    const response = await api.put<T>(url, data, config)
    return response.data
  },
  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    if (USE_MOCK_API) {
      return getMockApi().patch<T>(url, data)
    }
    const response = await api.patch<T>(url, data, config)
    return response.data
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    if (USE_MOCK_API) {
      return getMockApi().delete<T>(url)
    }
    const response = await api.delete<T>(url, config)
    return response.data
  },
}

export const authApi = {
  login: (payload: { email: string; password: string }) => apiClient.post<AuthResponse>('/admin/auth/login', payload),
  logout: () => apiClient.post('/admin/auth/logout'),
  me: () => apiClient.get<UserResponse>('/admin/auth/me'),
  refreshToken: () => apiClient.post<AuthResponse>('/admin/auth/refresh'),
}

type UserResponse = {
  user: AuthResponse['user']
}
