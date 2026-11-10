'use client'

import { useEffect, useRef } from 'react'

const duration = 2500
const sessionKey = 'portfolio-ascii-intro'
const ramp = '.:;+*ox#%@'

function ease(value: number) {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

function drawIntro(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, palette: string[]) {
  const [paper, blue, rose, ink] = palette
  const step = Math.max(3.5, Math.min(10, width / 140))
  const scale = Math.min(width * 0.37, height * 0.63) * (0.91 + 0.09 * ease(time / 850))
  const blink = Math.exp(-(((time - 1120) / 82) ** 2))
  const lid = Math.max(0.012, ease(time / 410) * (1 - 0.98 * blink) * (1 - ease((time - 1550) / 250)))
  const gaze = -0.36 * ease((time - 475) / 220) + 0.68 * ease((time - 880) / 350) - 0.32 * ease((time - 1280) / 220)
  const burst = ease((time - 1610) / 730)
  const star = ease((time - 1660) / 275) * (1 - ease((time - 2180) / 320))

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = paper
  ctx.globalAlpha = 1 - ease((time - 1880) / 620)
  ctx.fillRect(0, 0, width, height)
  ctx.font = `${step * 0.94}px monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let row = 0, py = step / 2; py < height; py += step, row++) {
    const y = (py - height * 0.5) / scale
    for (let col = 0, px = step / 2; px < width; px += step, col++) {
      const x = (px - width * 0.5) / scale
      const noise = ((col * 373 + row * 667) ^ (col * 233 * row)) % 997 / 997
      const arc = Math.max(0, 1 - x * x) ** 0.82
      const crease = -0.055 * x
      const upper = crease - 0.49 * arc * lid
      const lower = crease + 0.36 * arc * lid
      const irisX = x - gaze
      const irisY = y + 0.025
      const radius = Math.hypot(irisX, irisY)
      let color = blue
      let strength = (1 - Math.min(1, Math.hypot(x * 0.6, y) * 0.8)) * (0.05 + noise * 0.19) * (1 - burst)
      let glyph = ramp[noise > 0.75 ? 1 : 0]

      if (arc && y >= upper && y <= lower) {
        const shade = ease((y - upper) / 0.095) * ease((lower - y) / 0.045)
        const iris = radius < 0.36
        const glint = Math.hypot(irisX + 0.10, irisY + 0.13) < 0.049
        const fibers = 0.5 + 0.5 * Math.sin(Math.atan2(irisY, irisX) * 46 + radius * 38)
        color = glint ? ink : iris ? rose : blue
        strength = glint ? 1 : iris && radius < 0.148 ? 0.03 : (iris ? 0.32 + fibers * 0.58 : 0.65 + noise * 0.35) * shade
        strength *= (1 - burst)
        glyph = ramp[Math.min(ramp.length - 1, Math.floor(strength * ramp.length))]
      } else if (arc && Math.abs(y - upper) < step * 0.65 / scale) {
        strength = (0.18 + noise * 0.55) * (1 - burst)
        glyph = '·'
      }

      if (star > 0 && Math.sqrt(Math.abs(x) / 0.45) + Math.sqrt(Math.abs(y) / 0.47) < 1) {
        color = noise > 0.48 ? rose : blue
        strength = Math.max(strength, star * (0.45 + noise * 0.55))
        glyph = ramp[3 + Math.floor(noise * 7)]
      } else if (burst > 0 && noise > 0.81) {
        const front = Math.hypot(x, y * 1.2) - burst * 1.35
        const dust = Math.max(0, 1 - Math.abs(front) * 1.65) * Math.sin(Math.PI * burst)
        strength = Math.max(strength, dust * noise)
        color = noise > 0.92 ? rose : blue
        glyph = noise > 0.95 ? '+' : ':'
      }

      if (strength < 0.035) continue
      ctx.fillStyle = color
      ctx.globalAlpha = strength
      ctx.fillText(glyph, px, py)
    }
  }
  ctx.globalAlpha = 1
}

export function Preloader() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!canvas || location.pathname !== '/' || location.hash || window.scrollY || motion.matches) return
    if (performance.getEntriesByType('navigation').some(
      (entry) => (entry as PerformanceNavigationTiming).type === 'back_forward',
    )) return
    try {
      if (sessionStorage.getItem(sessionKey)) return
    } catch {
      // Storage can be disabled. The animation still works for this page.
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const styles = getComputedStyle(document.documentElement)
    const palette = ['--paper', '--accent', '--signal', '--ink'].map((name) => styles.getPropertyValue(name).trim())
    const controller = new AbortController()
    const input = { capture: true, passive: true, signal: controller.signal }
    let frame = 0
    let width = 0
    let height = 0
    let last = -Infinity
    const start = performance.now()

    function paint(time: number) {
      if (!canvas || !ctx) return
      if (canvas.clientWidth !== width || canvas.clientHeight !== height) {
        width = canvas.clientWidth
        height = canvas.clientHeight
        const pixelRatio = Math.min(devicePixelRatio || 1, 2)
        canvas.width = Math.round(width * pixelRatio)
        canvas.height = Math.round(height * pixelRatio)
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      }
      drawIntro(ctx, width, height, time, palette)
    }

    function stop() {
      cancelAnimationFrame(frame)
      controller.abort()
      if (canvas) canvas.hidden = true
    }

    function finish() {
      stop()
      try { sessionStorage.setItem(sessionKey, '1') } catch {}
    }

    function tick(now: number) {
      if (now - start >= duration) {
        finish()
        return
      }
      if (now - last >= 30) {
        paint(now - start)
        last = now
      }
      frame = requestAnimationFrame(tick)
    }

    for (const event of ['pointerdown', 'keydown', 'wheel', 'scroll', 'hashchange', 'pagehide']) {
      window.addEventListener(event, finish, input)
    }
    motion.addEventListener('change', finish, { signal: controller.signal })
    canvas.hidden = false
    paint(0)
    frame = requestAnimationFrame(tick)
    return stop
  }, [])

  return <canvas ref={ref} className="ascii-intro" aria-hidden="true" hidden />
}
