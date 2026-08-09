'use client'

import { useState, useEffect } from 'react'
import { sound } from '@/lib/audio-engine'
import { Volume2, VolumeX } from 'lucide-react'

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false)

  // Hydration sync
  useEffect(() => {
    setEnabled(sound.isEnabled())
  }, [])

  const toggleSound = () => {
    const isNowEnabled = sound.toggle()
    setEnabled(isNowEnabled)
    if (isNowEnabled) {
      sound.playAccessGranted()
    }
  }

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={() => sound.playHover()}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-[#0a0a0d]/80 backdrop-blur transition-colors hover:bg-white/5 hover:border-signal text-muted-foreground hover:text-signal"
      aria-label={enabled ? 'Mute sound' : 'Enable sound'}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  )
}
