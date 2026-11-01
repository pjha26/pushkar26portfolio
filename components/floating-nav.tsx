'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, Moon, Sun, X, Pause, Play } from 'lucide-react'

const items = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]

export function FloatingNav() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [motionPaused, setMotionPaused] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark')
    setMotionPaused(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  function toggleMotion() {
    const next = !motionPaused
    setMotionPaused(next)
    document.documentElement.dataset.motion = next ? 'paused' : 'running'
  }

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('portfolio-color-mode', next ? 'dark' : 'light')
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          menuButtonRef.current?.focus()
        }
      }}
    >
      <div className="shell header-inner">
        <a
          href="/#hero-section"
          className="wordmark"
          aria-label="Pushkar Raj, home"
          onClick={() => setOpen(false)}
        >
          <span className="monogram" aria-hidden="true">
            pr<span>.</span>
          </span>
          <span className="wordmark-name">
            Pushkar Raj<span>Software developer</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {items.map((item) => (
            <Link key={item.id} href={`/#${item.id}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button motion-button"
            onClick={toggleMotion}
            aria-label={motionPaused ? 'Resume animations' : 'Pause animations'}
            aria-pressed={motionPaused}
            title={motionPaused ? 'Resume animations' : 'Pause animations'}
          >
            {motionPaused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button
            className="icon-button theme-button"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="header-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Résumé <ArrowUpRight size={15} />
          </a>
          <button
            ref={menuButtonRef}
            className="icon-button menu-button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav shell" aria-label="Mobile navigation">
          {items.map((item) => (
            <Link key={item.id} href={`/#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
