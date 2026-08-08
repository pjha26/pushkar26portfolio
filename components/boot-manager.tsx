'use client'

import { useState, useEffect } from 'react'
import { BootSequence } from '@/components/boot-sequence'

export function BootManager({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    // Check if we've already booted in this session to prevent annoyance
    const hasBooted = sessionStorage.getItem('hasBooted')
    if (hasBooted) {
      setBooting(false)
    }
  }, [])

  const handleBootComplete = () => {
    setBooting(false)
    sessionStorage.setItem('hasBooted', 'true')
  }

  return (
    <>
      {booting && <BootSequence onComplete={handleBootComplete} />}
      <div style={{ opacity: booting ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        {children}
      </div>
    </>
  )
}
