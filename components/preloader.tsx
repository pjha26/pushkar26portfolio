'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/use-reveal'

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
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
    const logEl = logRef.current
    
    if (!el || !logEl) return

    const logs = [
      "WAKING SYSTEM KERNEL...",
      "LOADING NEURAL NETWORKS [||||||||||] 100%",
      "DECRYPTING CLASSIFIED ASSETS... OK",
      "ESTABLISHING SECURE UPLINK WITH SERVER PR-2027...",
      "BYPASSING MAINFRAME FIREWALL... DONE",
      "ACCESS GRANTED."
    ]

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false)
        }
      })

      let delay = 0
      logs.forEach((logText, i) => {
        const line = document.createElement('div')
        logEl.appendChild(line)
        
        tl.to(line, {
          duration: logText.length * 0.015,
          ease: "none",
          onUpdate: function() {
            const progress = this.progress()
            const chars = Math.floor(progress * logText.length)
            line.innerText = logText.substring(0, chars)
          }
        }, delay)
        
        delay += logText.length * 0.015 + (i === logs.length - 1 ? 0.6 : 0.1)
      })
      
      tl.set(el, { backgroundColor: '#000000' }, delay)
      tl.to({}, { duration: 0.05 }, delay)
      tl.set(el, { backgroundColor: '#0a0a0d' })
      tl.to({}, { duration: 0.04 })
      tl.set(el, { backgroundColor: '#000000' })
      tl.to({}, { duration: 0.04 })
      
      tl.to(el, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  if (!shouldRender) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-black p-4 sm:p-8 font-mono text-xs sm:text-sm text-signal select-none"
    >
      <div ref={logRef} className="flex flex-col space-y-1 sm:space-y-2 opacity-80" />
    </div>
  )
}
