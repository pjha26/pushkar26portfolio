'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function ProjectJourney({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = scope.current
    if (!root) return
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.project-tabs a'))
    const observer = new IntersectionObserver(
      (entries) => {
        const chapter = entries.find((entry) => entry.isIntersecting)
        if (!chapter) return
        links.forEach((link) => {
          if (link.hash === `#${chapter.target.id}`) link.setAttribute('aria-current', 'location')
          else link.removeAttribute('aria-current')
        })
      },
      { rootMargin: '-30% 0px -55% 0px' }
    )
    root.querySelectorAll('.project-card').forEach((chapter) => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={scope} className="project-journey">
      {children}
    </div>
  )
}
