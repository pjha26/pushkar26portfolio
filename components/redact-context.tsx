'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type RedactContextType = {
  isRedacted: boolean
  toggleRedact: () => void
}

const RedactContext = createContext<RedactContextType | undefined>(undefined)

export function RedactProvider({ children }: { children: ReactNode }) {
  const [isRedacted, setIsRedacted] = useState(true)

  const toggleRedact = () => setIsRedacted(prev => !prev)

  return (
    <RedactContext.Provider value={{ isRedacted, toggleRedact }}>
      {children}
    </RedactContext.Provider>
  )
}

export function useRedact() {
  const context = useContext(RedactContext)
  if (!context) throw new Error('useRedact must be used within a RedactProvider')
  return context
}

export function Redact({ children, label = 'REDACTED' }: { children: ReactNode, label?: string }) {
  const { isRedacted } = useRedact()

  if (isRedacted) {
    return (
      <span 
        className="group inline-block bg-foreground text-transparent hover:bg-foreground/10 hover:text-foreground px-1 select-none cursor-help transition-all duration-300"
        title="Classified Information - Hover to reveal"
      >
        {children}
      </span>
    )
  }

  return <span>{children}</span>
}
