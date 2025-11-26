'use client'

import type { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        dedupingInterval: 2000,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        {children}
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </SWRConfig>
  )
}
