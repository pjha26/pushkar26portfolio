'use client'

import { useEffect, useState } from 'react'
import { useRedact } from '@/components/redact-context'

const SECTIONS = [
  { id: 'about', label: '01 // PROFILE' },
  { id: 'projects', label: '02 // CASE FILES' },
  { id: 'skills', label: '03 // SKILLSET' },
  { id: 'experience', label: '04 // RECORD' },
  { id: 'contact', label: '05 // CONTACT' },
]

export function TelemetryHUD() {
  const [activeSection, setActiveSection] = useState('')
  const { isRedacted, toggleRedact } = useRedact()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -60% 0px' // Trigger when section is in top 40% of viewport
      }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 pointer-events-auto mix-blend-difference">
      <div className="flex flex-col gap-6">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id
          return (
            <div key={section.id} className="flex items-center justify-end gap-3 transition-all duration-300 pointer-events-none">
              <span 
                className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  isActive ? 'text-signal opacity-100 translate-x-0' : 'text-signal/0 translate-x-4 opacity-0'
                }`}
              >
                {section.label}
              </span>
              <div 
                className={`h-px transition-all duration-500 ease-out ${
                  isActive ? 'w-8 bg-signal' : 'w-2 bg-signal/30'
                }`} 
              />
            </div>
          )
        })}
      </div>
      
      {/* Telemetry metadata */}
      <div className="mt-8 pt-8 border-t border-signal/20 text-right opacity-50 flex flex-col items-end gap-2">
        <button 
          onClick={toggleRedact}
          className="font-mono text-[9px] tracking-[0.2em] px-2 py-1 border transition-colors focus:outline-none hover:bg-signal hover:text-black mb-2"
          style={{ borderColor: isRedacted ? 'var(--signal)' : 'rgba(245, 196, 0, 0.3)', color: 'var(--signal)' }}
        >
          {isRedacted ? '[ REDACTED ]' : '[ DECLASSIFIED ]'}
        </button>
        <p className="font-mono text-[8px] tracking-[0.3em] text-signal mb-1">SYS.STATUS: ONLINE</p>
        <p className="font-mono text-[8px] tracking-[0.3em] text-signal">LAT: 37.7749° N</p>
      </div>
    </div>
  )
}
