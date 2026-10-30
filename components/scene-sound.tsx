'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { createAmbientAudio } from '@/lib/ambient-audio'

type Session = { context: AudioContext; stop: () => void }

export function SceneSound() {
  const session = useRef<Session | null>(null)
  const busy = useRef(false)
  const [status, setStatus] = useState<'off' | 'on' | 'paused' | 'error'>('off')

  useEffect(() => {
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
  return (
    <div className="scene-sound" data-playing={status === 'on'}>
      <button
        className="sound-toggle"
        onClick={toggleSound}
        aria-pressed={enabled}
        aria-label={enabled ? 'Disable ambient soundtrack' : 'Enable ambient soundtrack'}
        title="Original ambient soundtrack · follows scene playback"
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
          {status === 'on' ? 'Ambient on' : status === 'paused' ? 'Scene paused' : 'Sound off'}
        </span>
      </button>
      <span className="sound-status" role="status">
        {status === 'error' ? 'Sound is unavailable. Tap to retry.' : ''}
      </span>
    </div>
  )
}
