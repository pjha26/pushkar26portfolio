'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'hero-section', label: 'Home', shortLabel: 'HM' },
  { id: 'about', label: 'About', shortLabel: 'AB' },
  { id: 'projects', label: 'Projects', shortLabel: 'PJ' },
  { id: 'skills', label: 'Skills', shortLabel: 'SK' },
  { id: 'experience', label: 'Experience', shortLabel: 'EX' },
  { id: 'contact', label: 'Contact', shortLabel: 'CT' },
]

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero-section')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      // Scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)

      // Show nav after scrolling past hero
      setIsVisible(scrollTop > 300)

      // Active section detection
      const sections = NAV_ITEMS.map(item => {
        const el = document.getElementById(item.id)
        if (!el) return { id: item.id, top: 0 }
        const rect = el.getBoundingClientRect()
        return { id: item.id, top: rect.top }
      })

      // Find the section closest to the top of the viewport
      let current = sections[0].id
      for (const section of sections) {
        if (section.top <= 150) {
          current = section.id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {/* Scroll Progress Bar - always visible */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-signal via-signal to-signal/50 transition-none shadow-[0_0_10px_var(--signal)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Pill Nav */}
      <nav
        className={cn(
          'fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap',
                activeSection === id
                  ? 'bg-signal/15 text-signal shadow-[inset_0_0_10px_rgba(245,196,0,0.1)]'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              )}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
