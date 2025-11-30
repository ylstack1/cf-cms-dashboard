'use client'

import * as React from 'react'

type PageActionsContextType = {
  actions: React.ReactNode
  setActions: (actions: React.ReactNode) => void
}

const PageActionsContext = React.createContext<PageActionsContextType | undefined>(undefined)

export function PageActionsProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = React.useState<React.ReactNode>(null)

  return (
    <PageActionsContext.Provider value={{ actions, setActions }}>
      {children}
    </PageActionsContext.Provider>
  )
}

export function usePageActions() {
  const context = React.useContext(PageActionsContext)
  if (context === undefined) {
    throw new Error('usePageActions must be used within a PageActionsProvider')
  }
  return context
}

export function PageActions({ children }: { children: React.ReactNode }) {
  return <PageActionsProvider>{children}</PageActionsProvider>
}