'use client'

import { useState, useEffect } from 'react'
import { sound } from '@/lib/audio-engine'

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
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('portfolio-theme')
    if (saved && THEMES.find(t => t.id === saved)) {
      applyTheme(saved)
    }
  }, [])

  if (!mounted) return null

  const toggleMenu = () => {
    sound.playNavClick()
    setIsOpen(!isOpen)
  }

  // Arc from 0 to 90 degrees (Right to Bottom)
  const getTransform = (index: number) => {
    if (!isOpen) return 'translate(0px, 0px) scale(0)'
    const radius = 75 // slightly larger radius for the arc
    // Angles: 0, 30, 60, 90 degrees (in radians)
    const angles = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2]
    const angle = angles[index]
    const x = Math.round(Math.cos(angle) * radius)
    const y = Math.round(Math.sin(angle) * radius)
    return `translate(${x}px, ${y}px) scale(1)`
  }

  const activeColor = THEMES.find(t => t.id === activeTheme)?.signal || '#fff'

  return (
    <div className="fixed top-6 left-6 z-50 font-mono">
      <div className="relative flex items-start justify-start">
        
        {/* The 4 directional theme buttons */}
        {THEMES.map((theme, index) => (
          <button
            key={theme.id}
            onClick={() => {
              applyTheme(theme.id)
              sound.playThemeSwitch()
              setIsOpen(false)
            }}
            className="absolute w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-black/80 backdrop-blur-md shadow-lg transition-all duration-300 ease-out hover:scale-110 group"
            style={{
              transform: getTransform(index),
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
            }}
            title={theme.name}
          >
            <span 
              className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-150" 
              style={{ 
                backgroundColor: theme.signal,
                boxShadow: activeTheme === theme.id ? `0 0 10px ${theme.signal}` : 'none'
              }} 
            />
            
            {/* Tooltip */}
            <span 
              className={`absolute text-[9px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-muted-foreground tracking-widest bg-black/90 px-2 py-0.5 rounded border border-white/10 pointer-events-none ${index === 3 ? 'left-12' : 'top-12'}`}
            >
              {theme.name}
            </span>
          </button>
        ))}

        {/* Main Trigger Button */}
        <button
          onClick={toggleMenu}
          className="relative w-14 h-14 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110 z-10"
          style={{
            boxShadow: isOpen ? `0 0 20px ${activeColor}40` : '0 0 15px rgba(0,0,0,0.8)'
          }}
        >
          <div 
            className="w-5 h-5 rounded-full transition-all duration-500 flex items-center justify-center"
            style={{ 
              backgroundColor: activeColor,
              boxShadow: `0 0 15px ${activeColor}`,
              transform: isOpen ? 'scale(0.5)' : 'scale(1)'
            }}
          />
          {/* Outer rotating dashed ring */}
          <div 
            className={`absolute inset-1 rounded-full border border-dashed transition-all duration-1000 ${isOpen ? 'rotate-180 border-white/40' : 'rotate-0 border-transparent'}`}
          />
        </button>

      </div>
    </div>
  )
}
