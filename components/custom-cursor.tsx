'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/use-reveal'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only on fine pointers (skip touch devices) and when motion is allowed
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || prefersReducedMotion()) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')
    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || !label) return

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' })
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }

      const setState = (mode: 'default' | 'link' | 'card', text = '') => {
        label.textContent = text
        if (mode === 'default') {
          gsap.to(cursor, {
            width: 20,
            height: 20,
            backgroundColor: 'transparent',
            duration: 0.2,
            ease: 'power2.out',
          })
        } else {
          gsap.to(cursor, {
            width: mode === 'card' ? 56 : 40,
            height: mode === 'card' ? 56 : 40,
            backgroundColor: '#f5c400',
            duration: 0.2,
            ease: 'power2.out',
          })
        }
      }

      const onOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const card = target.closest('[data-cursor-card]')
        if (card) {
          setState('card', card.getAttribute('data-cursor-card') || 'OPEN')
          return
        }
        if (target.closest('a, button, input, [role="button"]')) {
          setState('link')
          return
        }
        setState('default')
      }

      window.addEventListener('mousemove', onMove, { passive: true })
      window.addEventListener('mouseover', onOver, { passive: true })

      return () => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseover', onOver)
      }
    }, cursorRef)

    return () => ctx.revert()
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-signal"
      style={{ mixBlendMode: 'difference' }}
    >
      <span
        ref={labelRef}
        className="font-mono text-[9px] font-bold tracking-widest text-signal-foreground"
      />
    </div>
  )
}
