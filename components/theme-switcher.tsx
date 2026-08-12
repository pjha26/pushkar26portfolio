'use client'

import { useState, useEffect } from 'react'

type Theme = {
  id: string
  name: string
  signal: string
}

const THEMES: Theme[] = [
  { id: 'gold', name: 'GOLD (DEFAULT)', signal: '#f5c400' },
  { id: 'matrix', name: 'MATRIX', signal: '#00ff41' },
  { id: 'vengeance', name: 'VENGEANCE', signal: '#ff003c' },
  { id: 'deepmind', name: 'DEEPMIND', signal: '#00e5ff' },
]

export function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<string>('gold')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved && THEMES.find(t => t.id === saved)) {
      applyTheme(saved)
    }
  }, [])

  const applyTheme = (id: string) => {
    const theme = THEMES.find(t => t.id === id)
    if (!theme) return

    setActiveTheme(id)
    localStorage.setItem('portfolio-theme', id)
    document.documentElement.style.setProperty('--signal', theme.signal)
    
    // Also update any specific glow/shadow effects if needed
    if (id === 'gold') {
      document.documentElement.style.setProperty('--signal-foreground', '#0a0a0d')
    } else {
      document.documentElement.style.setProperty('--signal-foreground', '#000000')
    }
  }

  return (
    <div className="fixed top-6 left-6 z-50 font-mono flex flex-col items-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-white/10 bg-black/40 backdrop-blur-xl px-3 py-1.5 text-xs text-muted-foreground hover:text-white hover:border-signal/50 transition-colors"
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEMES.find(t => t.id === activeTheme)?.signal }} />
        THEME <span className="opacity-50">v1.2</span>
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-1 border border-white/10 bg-black/80 backdrop-blur-xl p-2 rounded-sm shadow-2xl animate-in fade-in slide-in-from-top-2 w-48">
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest border-b border-white/10 pb-1">Override Accent</p>
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                applyTheme(theme.id)
                setIsOpen(false)
              }}
              className={`flex items-center gap-2 px-2 py-1.5 text-xs text-left transition-colors hover:bg-white/5 ${activeTheme === theme.id ? 'text-white' : 'text-muted-foreground'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeTheme === theme.id ? 'animate-pulse shadow-[0_0_8px_currentColor]' : ''}`} style={{ backgroundColor: theme.signal, color: theme.signal }} />
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
