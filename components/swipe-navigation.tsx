'use client'

import { addTransitionType, startTransition, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { PORTFOLIO_PAGES } from '@/lib/portfolio-pages'

export function SwipeNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const lastTurn = useRef(-Infinity)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current !== pathname) lastTurn.current = performance.now()
    previousPath.current = pathname
    const index = PORTFOLIO_PAGES.findIndex((page) => page.href === pathname)
    if (index < 0) return
    let wheel = 0
    let lastWheel = 0
    let touch: { x: number; y: number; top: boolean; bottom: boolean } | null = null
    const atTop = () => window.scrollY <= 8
    const atBottom = () =>
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8
    function turn(direction: number) {
      const destination = PORTFOLIO_PAGES[index + direction]
      if (!destination || performance.now() - lastTurn.current < 1100) return
      lastTurn.current = performance.now()
      startTransition(() => {
        addTransitionType(direction > 0 ? 'page-next' : 'page-prev')
        router.push(destination.href)
      })
    }
    function onWheel(event: WheelEvent) {
      if (
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        (event.target instanceof Element &&
          event.target.closest('input,textarea,select,[data-no-swipe]'))
      )
        return
      const direction = event.deltaY > 0 ? 1 : -1
      if (!(direction > 0 ? atBottom() : atTop()) || !PORTFOLIO_PAGES[index + direction]) {
        wheel = 0
        return
      }
      event.preventDefault()
      const now = performance.now()
      if (now - lastWheel > 200 || Math.sign(wheel) !== direction) wheel = 0
      lastWheel = now
      const delta =
        event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
      wheel += delta
      if (Math.abs(wheel) >= 90) {
        wheel = 0
        turn(direction)
      }
    }
    function onTouchStart(event: TouchEvent) {
      if (
        event.touches.length !== 1 ||
        (event.target instanceof Element &&
          event.target.closest('input,textarea,select,[data-no-swipe]'))
      ) {
        touch = null
        return
      }
      touch = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        top: atTop(),
        bottom: atBottom(),
      }
    }
    function onTouchEnd(event: TouchEvent) {
      if (!touch || !event.changedTouches[0]) return
      const dy = touch.y - event.changedTouches[0].clientY
      const dx = touch.x - event.changedTouches[0].clientX
      if (
        Math.abs(dy) > 75 &&
        Math.abs(dy) > Math.abs(dx) * 1.4 &&
        (dy > 0 ? touch.bottom : touch.top)
      )
        turn(dy > 0 ? 1 : -1)
      touch = null
    }
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof Element && event.target.closest('a,button,input,textarea,select'))
        return
      if (event.key === 'PageDown' && atBottom()) {
        event.preventDefault()
        turn(1)
      }
      if (event.key === 'PageUp' && atTop()) {
        event.preventDefault()
        turn(-1)
      }
    }
    // Keep old bookmarks useful after splitting the former long homepage.
    const legacy = (
      {
        '#projects': '/work',
        '#about': '/about',
        '#skills': '/toolkit',
        '#contact': '/contact',
      } as Record<string, string>
    )[window.location.hash]
    if (pathname === '/' && legacy) router.replace(legacy)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [pathname, router])
  return null
}
