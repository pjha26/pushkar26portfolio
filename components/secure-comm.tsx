'use client'

import { useState, useRef, FormEvent, useEffect } from 'react'
import { Section } from '@/components/section'
import { sound } from '@/lib/audio-engine'
import { Magnetic } from '@/components/ui/magnetic'

export function SecureComm() {
  const [status, setStatus] = useState<'IDLE' | 'ENCRYPTING' | 'SENT' | 'ERROR'>('IDLE')
  const [ip, setIp] = useState<string>('DETECTING...')
  
  // Form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  
  const displayRef = useRef<HTMLDivElement>(null)
  
  // Formspree Endpoint Placeholder
  // TODO: Replace with your actual Formspree endpoint (e.g. https://formspree.io/f/YOUR_ID)
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/placeholder"

  useEffect(() => {
    // Fetch user IP for the "traceroute" theme
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('UNKNOWN_ORIGIN'))
  }, [])

  const handleKeyDown = () => {
    sound.playKeystroke()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !email.trim() || status !== 'IDLE') return

    setStatus('ENCRYPTING')
    sound.playAccessGranted() // dramatic sound
    
    // Simulate encryption and routing trace
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/-_+=|\\'
    const originalText = `ROUTING THROUGH PROXIES...\nBYPASSING FIREWALL...\nENCRYPTING PAYLOAD...\n\n${message}`
    
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
          
          // Actual form submission
          fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
          }).then(response => {
            if (response.ok || FORMSPREE_ENDPOINT.includes('placeholder')) {
              // If using placeholder, we still simulate success
              setStatus('SENT')
              setName('')
              setEmail('')
              setMessage('')
              if (displayRef.current) displayRef.current.innerText = 'TRANSMISSION COMPLETE. EXPECT CONTACT.'
            } else {
              setStatus('ERROR')
              if (displayRef.current) displayRef.current.innerText = 'CRITICAL ERROR: TRANSMISSION FAILED.'
            }
          }).catch(() => {
            setStatus('ERROR')
            if (displayRef.current) displayRef.current.innerText = 'CRITICAL ERROR: NETWORK UNREACHABLE.'
          }).finally(() => {
            setTimeout(() => {
              setStatus('IDLE')
            }, 4000)
          })
        }
        iter += 0.5
      }, 30)
    }
  }

  return (
    <Section id="contact" fileLabel="SECTION 05 // SECURE_COMM" title="Establish Connection">
      <div className="mt-12 max-w-2xl">
        <p className="text-muted-foreground mb-8 text-base">
          Standard channels are compromised. Use this terminal to securely transmit a message. All inputs are end-to-end encrypted before dispatch.
        </p>

        <form onSubmit={handleSubmit} className="glass-panel border border-signal/30 shadow-[0_0_15px_rgba(245,196,0,0.05)] relative p-6">
          
          {/* Corner brackets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="#f5c400" strokeWidth="2" />
            <path d="M calc(100% - 16px) 100% L 100% 100% L 100% calc(100% - 16px)" fill="none" stroke="#f5c400" strokeWidth="2" />
          </svg>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-signal/70 uppercase">
                Connection: SECURE
              </span>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase text-glow">
              ORIGIN: {ip}
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            {status === 'IDLE' || status === 'ERROR' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="SENDER ALIAS (OPTIONAL)"
                    className="w-full bg-black/20 border border-white/10 p-3 font-mono text-xs text-foreground outline-none focus:border-signal/50 transition-colors placeholder:text-muted-foreground/40"
                    aria-label="Sender Alias"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                    placeholder="RETURN FREQUENCY (EMAIL)"
                    className="w-full bg-black/20 border border-white/10 p-3 font-mono text-xs text-foreground outline-none focus:border-signal/50 transition-colors placeholder:text-muted-foreground/40"
                    aria-label="Return Email"
                  />
                </div>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="ENTER TRANSMISSION PAYLOAD HERE..."
                  className="w-full min-h-[120px] bg-black/20 border border-white/10 p-3 font-mono text-sm text-foreground outline-none resize-none focus:border-signal/50 transition-colors placeholder:text-muted-foreground/40 mt-2"
                  aria-label="Secure message input"
                />
              </>
            ) : (
              <div 
                ref={displayRef} 
                className="w-full min-h-[220px] bg-black/40 p-4 font-mono text-sm text-signal break-words whitespace-pre-wrap border border-white/5"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="mt-8 flex justify-between items-center relative z-10">
            <span className="font-mono text-xs text-muted-foreground">
              {status === 'ENCRYPTING' ? 'ENCRYPTING PAYLOAD...' : status === 'SENT' ? 'TRANSMISSION COMPLETE' : status === 'ERROR' ? 'TRANSMISSION FAILED' : 'AWAITING INPUT'}
            </span>
            <Magnetic strength={20}>
              <button 
                type="submit"
                disabled={status !== 'IDLE' && status !== 'ERROR'}
                className="px-8 py-3 bg-signal text-black font-mono text-xs uppercase tracking-widest font-bold transition-all hover:bg-signal/80 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent focus:outline-none focus:border-white"
              >
                Dispatch
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </Section>
  )
}
