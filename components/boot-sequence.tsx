'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { sound } from '@/lib/audio-engine'

const BOOT_MESSAGES = [
  'INITIALIZING CORE SYSTEMS...',
  'ESTABLISHING SECURE CONNECTION...',
  'BYPASSING FIREWALL PROTOCOLS...',
  'DECRYPTING CLASSIFIED DOSSIER...',
  'ACCESS GRANTED.'
]

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<string[]>([])
  
  useEffect(() => {
    // Disable scrolling while booting
    document.body.style.overflow = 'hidden'
    setMessages([])
    
    let currentMessage = 0
    let charIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeMessage = () => {
      if (currentMessage >= BOOT_MESSAGES.length) {
        // Boot complete, trigger fade out
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          delay: 0.5,
          onComplete: () => {
            document.body.style.overflow = ''
            onComplete()
          }
        })
        return
      }

      const msg = BOOT_MESSAGES[currentMessage]
      if (charIndex === 0) {
        sound.playBootTick()
        setMessages(prev => [...prev, ''])
      }

      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = msg.substring(0, charIndex + 1)
        return newMessages
      })

      charIndex++

      if (charIndex === msg.length) {
        let delay = Math.random() * 200 + 300 // random pause between lines
        if (currentMessage === BOOT_MESSAGES.length - 1) {
          delay = 800 // longer pause on ACCESS GRANTED
          sound.playBootComplete()
        }
        currentMessage++
        charIndex = 0
        timeoutId = setTimeout(typeMessage, delay)
      } else {
        const typingSpeed = currentMessage === BOOT_MESSAGES.length - 1 ? 50 : Math.random() * 20 + 10
        timeoutId = setTimeout(typeMessage, typingSpeed)
      }
    }

    // Start boot sequence after slight delay
    timeoutId = setTimeout(typeMessage, 500)

    return () => {
      clearTimeout(timeoutId)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-[#0a0a0d] font-mono text-signal p-8"
    >
      <div className="w-full max-w-2xl text-left" ref={textRef}>
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 flex">
            <span className="mr-4 text-signal/70">[{msg.length === BOOT_MESSAGES[i]?.length ? ' OK ' : '....'}]</span>
            <span>{msg}</span>
          </div>
        ))}
        {messages.length < BOOT_MESSAGES.length && (
          <div className="inline-block w-2 h-4 bg-signal animate-pulse ml-2" />
        )}
      </div>
      
      {/* Scanline overlay for preloader */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-40" />
    </div>
  )
}
