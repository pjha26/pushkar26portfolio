import { useState, useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/use-reveal'

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________'

export function useScramble(text: string, duration = 800, delay = 0) {
  const [displayText, setDisplayText] = useState('')
  const reducedMotion = prefersReducedMotion()
  const frameRef = useRef<number | null>(null)
  
  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(text)
      return
    }
    
    let start = 0
    let timeout: NodeJS.Timeout
    
    const tick = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      
      const ratio = Math.min(progress / duration, 1)
      const revealedLength = Math.floor(ratio * text.length)
      
      let scrambled = ''
      for (let i = 0; i < text.length; i++) {
        if (i < revealedLength || text[i] === ' ') {
          scrambled += text[i]
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      
      setDisplayText(scrambled)
      
      if (ratio < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    
    timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick)
    }, delay)
    
    return () => {
      clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [text, duration, delay, reducedMotion])
  
  const trigger = () => {
    if (reducedMotion) return
    let start = 0
    const tick = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const ratio = Math.min(progress / (duration * 0.5), 1) // Faster on hover
      const revealedLength = Math.floor(ratio * text.length)
      
      let scrambled = ''
      for (let i = 0; i < text.length; i++) {
        if (i < revealedLength || text[i] === ' ') {
          scrambled += text[i]
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplayText(scrambled)
      if (ratio < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(tick)
  }

  return { displayText, trigger }
}
