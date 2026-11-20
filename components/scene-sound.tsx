'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronUp, Volume2, VolumeX } from 'lucide-react'

type SoundState = {
  status: 'off' | 'loading' | 'on' | 'paused' | 'error'
  volume: number
  toggle: () => void
  setVolume: (value: number) => void
}
const SoundContext = createContext<SoundState | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null)
  const busy = useRef(false)
  const resumeWhenVisible = useRef(false)
  const [status, setStatus] = useState<SoundState['status']>('off')
  const [volume, updateVolume] = useState(0.65)
  useEffect(() => {
    function visibility() {
      const player = audio.current
      if (!player) return
      if (document.hidden) {
        resumeWhenVisible.current = !player.paused
        player.pause()
      } else if (resumeWhenVisible.current) {
        resumeWhenVisible.current = false
        void player.play().catch(() => setStatus('error'))
      }
    }
    document.addEventListener('visibilitychange', visibility)
    return () => document.removeEventListener('visibilitychange', visibility)
  }, [])
  async function toggle() {
    const player = audio.current
    if (!player || busy.current) return
    resumeWhenVisible.current = false
    if (!player.paused) {
      player.pause()
      return
    }
    busy.current = true
    setStatus('loading')
    player.volume = volume
    player.muted = false
    try {
      if (player.error) player.load()
      await player.play()
    } catch {
      setStatus('error')
    } finally {
      busy.current = false
    }
  }
  function setVolume(value: number) {
    updateVolume(value)
    if (audio.current) audio.current.volume = value
  }
  return (
    <SoundContext.Provider value={{ status, volume, toggle, setVolume }}>
      {children}
      <audio
        ref={audio}
        src="/audio/quiet-circuit.wav"
        preload="none"
        loop
        hidden
        onPlaying={() => setStatus('on')}
        onPause={() => setStatus('paused')}
        onError={() => setStatus('error')}
      />
    </SoundContext.Provider>
  )
}

export function SceneSound({ compact = false }: { compact?: boolean }) {
  const sound = useContext(SoundContext)
  if (!sound) return null
  const playing = sound.status === 'on'
  const label = playing ? 'Pause Quiet Circuit soundtrack' : 'Play Quiet Circuit soundtrack'
  if (compact)
    return (
      <button
        className="icon-button sound-header"
        aria-label={
          playing
            ? 'Sound on — pause Quiet Circuit soundtrack'
            : 'Enable sound — play Quiet Circuit soundtrack'
        }
        aria-pressed={playing}
        title={label}
        onClick={sound.toggle}
      >
        {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    )
  return (
    <details className="hero-sound" onKeyDown={event => {
      if (event.key === 'Escape') {
        event.currentTarget.open = false
        event.currentTarget.querySelector('summary')?.focus()
      }
    }} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
    }}>
      <summary aria-label={`Sound settings, sound ${playing ? 'on' : 'off'}`}>
        {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
        Sound {playing ? 'on' : 'off'} <ChevronUp size={13} aria-hidden="true" />
      </summary>
      <div className="sound-settings">
        <p>Quiet Circuit <small>Original instrumental</small></p>
        <button
          className="sound-invitation"
          onClick={sound.toggle}
          aria-label={label}
        >
          <span>
            {sound.status === 'loading'
              ? 'Loading sound…'
              : playing
                ? 'Pause soundtrack'
                : sound.status === 'error'
                  ? 'Retry sound'
                  : 'Play soundtrack'}
          </span>
        </button>
        <label className="sound-volume">
          Volume{' '}
          <input
            aria-label="Soundtrack volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={sound.volume}
            onChange={(event) => sound.setVolume(Number(event.target.value))}
          />{' '}
          {Math.round(sound.volume * 100)}%
        </label>
        <p className="sound-status" role="status">
          {sound.status === 'error'
            ? 'Playback failed. Check your tab sound settings and try again.'
            : ''}
        </p>
      </div>
    </details>
  )
}
