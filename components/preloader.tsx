'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/use-reveal'

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const hasRun = sessionStorage.getItem('preloader_shown')
    const reduced = prefersReducedMotion()

    if (hasRun || reduced) {
      setShouldRender(false)
      return
    }

    sessionStorage.setItem('preloader_shown', 'true')

    const el = containerRef.current
    const textEl = textRef.current
    const statusEl = statusRef.current
    
    if (!el || !textEl || !statusEl) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false)
        }
      })

      const initText = "INITIALIZING FILE PR-2027..."
      tl.to(textEl, {
        duration: 0.4,
        ease: "none",
        onUpdate: function() {
          const progress = this.progress()
          const chars = Math.floor(progress * initText.length)
          textEl.innerText = initText.substring(0, chars)
        }
      })
      
      tl.to({}, { duration: 0.15 })
      
      tl.set(statusEl, { innerText: "ACCESS GRANTED", autoAlpha: 1 })
      
      tl.to({}, { duration: 0.25 })
      
      // Flicker effect before fade out
      tl.set(el, { backgroundColor: '#000000' })
      tl.to({}, { duration: 0.05 })
      tl.set(el, { backgroundColor: '#0a0a0d' })
      tl.to({}, { duration: 0.04 })
      tl.set(el, { backgroundColor: '#000000' })
      tl.to({}, { duration: 0.04 })
      
      tl.to(el, { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' })

    }, el)

    return () => ctx.revert()
  }, [])

  if (!shouldRender) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0d] text-muted-foreground font-mono"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <p ref={textRef} className="text-xs md:text-sm tracking-[0.2em] h-5"></p>
        <span ref={statusRef} className="text-signal font-bold tracking-widest opacity-0 mt-2 text-xs md:text-sm h-5"></span>
      </div>
    </div>
  )
}
