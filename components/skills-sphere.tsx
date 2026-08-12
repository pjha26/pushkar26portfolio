'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { SKILL_GROUPS } from '@/lib/dossier-data'
import { prefersReducedMotion } from '@/lib/use-reveal'

export function SkillsSphere() {
  const [mounted, setMounted] = useState(false)
  const [themeColor, setThemeColor] = useState('#f5c400')

  useEffect(() => {
    setMounted(true)
    
    // Read initial theme color
    const root = document.documentElement
    const initialSignal = getComputedStyle(root).getPropertyValue('--signal').trim() || '#f5c400'
    setThemeColor(initialSignal)
    
    // Set up an observer to watch for theme changes on the <html> element
    const observer = new MutationObserver(() => {
      const newSignal = getComputedStyle(root).getPropertyValue('--signal').trim()
      if (newSignal) setThemeColor(newSignal)
    })
    
    observer.observe(root, { attributes: true, attributeFilter: ['style'] })
    return () => observer.disconnect()
  }, [])

  if (!mounted || prefersReducedMotion()) {
    return null
  }

  const allSkills = SKILL_GROUPS.flatMap(g => g.items)
  
  return (
    <div className="w-full h-[500px] cursor-move relative overflow-hidden bg-card border border-white/5 mt-8 hidden md:block">
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] text-signal/70 z-10 pointer-events-none">
        INTERACTIVE DATA VISUALIZATION // DRAG TO ROTATE
      </div>
      <Canvas camera={{ position: [0, 0, 32], fov: 50 }}>
        <fog attach="fog" args={['#141417', 20, 50]} />
        <ambientLight intensity={1} />
        <WordCloud words={allSkills} themeColor={themeColor} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  )
}

function WordCloud({ words, themeColor }: { words: string[], themeColor: string }) {
  const radius = 10 // Increased radius to completely prevent word overlap
  
  const wordData = useMemo(() => {
    return words.map((word, i) => {
      const phi = Math.acos(-1 + (2 * i) / words.length)
      const theta = Math.sqrt(words.length * Math.PI) * phi
      
      return {
        word,
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        )
      }
    })
  }, [words])

  return (
    <group>
      {wordData.map((data, i) => (
        <Word key={i} position={data.position} themeColor={themeColor}>{data.word}</Word>
      ))}
    </group>
  )
}

function Word({ children, position, themeColor }: { children: string, position: THREE.Vector3, themeColor: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <Text
      ref={ref as any}
      position={position}
      color={hovered ? themeColor : '#a8a8ad'}
      fontSize={hovered ? 1.1 : 0.85}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      {children}
    </Text>
  )
}
