'use client'

import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/use-reveal'

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function MagneticLink({ children, className = '', ...props }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'elastic.out(1, 0.4)' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      // shift up to ~9px toward cursor
      xTo(gsap.utils.clamp(-9, 9, relX * 0.3))
      yTo(gsap.utils.clamp(-9, 9, relY * 0.3))
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <a
      ref={ref}
      className={`link-underline inline-block font-mono text-sm uppercase tracking-widest text-foreground transition-colors hover:text-signal focus-visible:text-signal ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
