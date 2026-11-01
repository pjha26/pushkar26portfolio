'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { createPortal } from 'react-dom'
import { createAmbientAudio } from '@/lib/ambient-audio'

type Session = { context: AudioContext; stop: () => void }

export function SceneSound() {
  const session = useRef<Session | null>(null)
  const busy = useRef(false)
  const [floating, setFloating] = useState(false)
  const [status, setStatus] = useState<'off' | 'on' | 'paused' | 'error'>('off')

  useEffect(() => {
    let beyondIntro = window.scrollY > 80
    setFloating(beyondIntro)
    function syncFloating() {
      const next = window.scrollY > 80
      if (next !== beyondIntro) {
        beyondIntro = next
        setFloating(next)
      }
    }
    window.addEventListener('scroll', syncFloating, { passive: true })
    async function syncScene() {
      const audio = session.current
      if (!audio || audio.context.state === 'closed') return
      try {
        if (document.hidden || document.documentElement.dataset.motion === 'paused') {
          await audio.context.suspend()
        } else {
          await audio.context.resume()
        }
      } catch {
        if (session.current === audio) setStatus('error')
      }
    }
    const observer = new MutationObserver(syncScene)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    })
    document.addEventListener('visibilitychange', syncScene)
    return () => {
      window.removeEventListener('scroll', syncFloating)
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncScene)
      const audio = session.current
      session.current = null
      if (audio) {
        audio.context.onstatechange = null
        audio.stop()
        void audio.context.close().catch(() => {})
      }
    }
  }, [])

  async function toggleSound() {
    if (busy.current) return
    busy.current = true
    try {
      const current = session.current
      if (current) {
        session.current = null
        current.context.onstatechange = null
        current.stop()
        await current.context.close()
        setStatus('off')
        return
      }
      const context = new AudioContext()
      const audio: Session = { context, stop: () => {} }
      session.current = audio
      audio.stop = createAmbientAudio(context)
      context.onstatechange = () => {
        if (session.current === audio) setStatus(context.state === 'running' ? 'on' : 'paused')
      }
      await context.resume()
      if (session.current !== audio) return
      if (document.hidden || document.documentElement.dataset.motion === 'paused')
        await context.suspend()
      if (session.current === audio) setStatus(context.state === 'running' ? 'on' : 'paused')
    } catch {
      const audio = session.current
      session.current = null
      if (audio) {
        audio.context.onstatechange = null
        audio.stop()
        void audio.context.close().catch(() => {})
      }
      setStatus('error')
    } finally {
      busy.current = false
    }
  }

  const enabled = status === 'on' || status === 'paused'
  const soundButton = (compact: boolean) => (
    <button
      className={compact ? 'sound-toggle' : 'sound-invitation'}
      onClick={toggleSound}
      aria-pressed={enabled}
      aria-label={enabled ? 'Disable ambient soundtrack' : 'Enable ambient soundtrack'}
    >
      <span className="sound-orb" aria-hidden="true">
        {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </span>
      <span className="sound-wave" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        {status === 'on'
          ? 'Sound on'
          : status === 'paused'
            ? 'Scene paused'
            : compact
              ? 'Sound off'
              : 'Enable sound'}
      </span>
    </button>
  )
  return (
    <>
      <div className="hero-sound" data-playing={status === 'on'}>
        {soundButton(false)}
        <p>Original ambient soundtrack · made for this space</p>
        <span className="sound-status" role="status">
          {status === 'error' ? 'Sound is unavailable. Tap to retry.' : ''}
        </span>
      </div>
      {floating &&
        createPortal(
          <div className="scene-sound" data-playing={status === 'on'}>
            {soundButton(true)}
          </div>,
          document.body
        )}
    </>
  )
}
