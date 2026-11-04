'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function NativeScrollMotion() {
  const pathname = usePathname()
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-scene]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    function update() {
      frame = 0
      const paused = reduced.matches || document.documentElement.dataset.motion === 'paused'
      // Read every position before writing styles; native scrolling remains in control.
      const progress = scenes.map(scene => {
        const bounds = scene.getBoundingClientRect()
        return Math.max(0, Math.min(1, (innerHeight - bounds.top) / (innerHeight + bounds.height)))
      })
      scenes.forEach((scene, index) => scene.style.setProperty('--scene-progress', String(paused ? .5 : progress[index])))
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        reveal.unobserve(entry.target)
      }
    }), { threshold: .1 })
    document.querySelectorAll('[data-scroll-reveal]').forEach(node => reveal.observe(node))
    const motion = new MutationObserver(schedule)
    motion.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      reveal.disconnect()
      motion.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
    }
  }, [pathname])
  return null
}
