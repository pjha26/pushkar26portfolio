'use client'

import Image from 'next/image'
import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const isDark = () => document.documentElement.dataset.theme !== 'light'
const serverTheme = () => true

export function ThemedPortrait() {
  const dark = useSyncExternalStore(subscribe, isDark, serverTheme)
  return (
    <Image
      src={dark ? '/pushkar-neon-portrait.webp' : '/pushkar-3d-portrait.png'}
      alt="Illustrated portrait of Pushkar Raj"
      width={dark ? 1000 : 1223}
      height={dark ? 1052 : 1286}
      sizes="(max-width: 700px) 320px, 380px"
      loading="eager"
    />
  )
}
