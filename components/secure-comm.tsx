'use client'

import { useState, useRef, FormEvent } from 'react'
import { Section } from '@/components/section'
import gsap from 'gsap'
import { LINKS } from '@/lib/dossier-data'

export function SecureComm() {
  const [status, setStatus] = useState<'IDLE' | 'ENCRYPTING' | 'SENT'>('IDLE')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const displayRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim() || status !== 'IDLE') return

    setStatus('ENCRYPTING')
    
    // Simulate encryption
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/-_+=|\\'
    const originalText = message
    
    if (displayRef.current) {
      let iter = 0
      const interval = setInterval(() => {
        displayRef.current!.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char
            if (index < iter) return '*' // turns to stars after encrypting
            return chars[Math.floor(Math.random() * chars.length)] // scrambling
          })
          .join('')
        
        if (iter >= originalText.length) {
          clearInterval(interval)
          // Open email client
          window.location.href = `${LINKS.email}?subject=Classified Transmission&body=${encodeURIComponent(message)}`
          
          setTimeout(() => {
            setStatus('SENT')
            setMessage('')
            if (displayRef.current) displayRef.current.innerText = ''
            
            setTimeout(() => setStatus('IDLE'), 3000)
          }, 1000)
        }
        iter += 1/3
      }, 30)
    }
  }

  return (
    <Section id="contact" fileLabel="SECTION 05 // SECURE_COMM" title="Establish Connection">
      <div className="mt-12 max-w-2xl">
        <p className="text-muted-foreground mb-8 text-base">
          Standard channels are compromised. Use this terminal to securely transmit a message. All inputs are end-to-end encrypted before dispatch.
        </p>

        <form onSubmit={handleSubmit} className="border border-signal/30 bg-[#0a0a0d] shadow-[0_0_15px_rgba(245,196,0,0.05)] relative p-6">
          
          {/* Corner brackets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="#f5c400" strokeWidth="2" />
            <path d="M calc(100% - 16px) 100% L 100% 100% L 100% calc(100% - 16px)" fill="none" stroke="#f5c400" strokeWidth="2" />
          </svg>

          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-signal/70 uppercase">
              Connection: SECURE
            </span>
          </div>

          <div className="relative z-10 min-h-[150px]">
            {status === 'IDLE' ? (
              <textarea
                ref={inputRef}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter transmission payload here..."
                className="w-full h-full min-h-[150px] bg-transparent font-mono text-sm text-foreground outline-none resize-none placeholder:text-muted-foreground/40"
                aria-label="Secure message input"
              />
            ) : (
              <div 
                ref={displayRef} 
                className="w-full h-full min-h-[150px] font-mono text-sm text-signal break-words whitespace-pre-wrap"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="mt-6 flex justify-between items-center relative z-10">
            <span className="font-mono text-xs text-muted-foreground">
              {status === 'ENCRYPTING' ? 'ENCRYPTING PAYLOAD...' : status === 'SENT' ? 'TRANSMISSION COMPLETE' : 'AWAITING INPUT'}
            </span>
            <button 
              type="submit"
              disabled={status !== 'IDLE' || !message.trim()}
              className="px-6 py-2 bg-signal text-black font-mono text-xs uppercase tracking-widest font-bold transition-all hover:bg-signal/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Dispatch
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
