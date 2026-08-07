'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'

export function Batcomputer() {
  const group = useRef<THREE.Group>(null)

  // Fade out the desk as we scroll down
  useFrame(() => {
    if (group.current) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollOffset = window.scrollY / maxScroll
      const r = Math.max(0, Math.min(scrollOffset, 1))

      const opacity = Math.max(0, 1 - (r * 8))
      group.current.position.y = -(r * 20) - 1
      
      group.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const material = (child as THREE.Mesh).material as THREE.Material
          if (material.transparent !== undefined) {
            material.opacity = opacity
          }
        }
      })
    }
  })

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Desk Surface */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[10, 0.2, 4]} />
        <meshStandardMaterial color="#0a0a0d" transparent />
        <Edges scale={1.001} color="#f5c400" />
      </mesh>
      
      {/* Central Holographic Monitor */}
      <mesh position={[0, 1.5, -1.5]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[4, 2.5]} />
        <meshBasicMaterial color="#0e0e13" transparent opacity={0.8} />
        <Edges scale={1.001} color="#f5c400" />
      </mesh>
      
      {/* Side Monitor L */}
      <mesh position={[-2.5, 1.2, -1]} rotation={[-0.1, 0.4, 0]}>
        <planeGeometry args={[2, 3]} />
        <meshBasicMaterial color="#0e0e13" transparent opacity={0.8} />
        <Edges scale={1.001} color="#8b1a1a" />
      </mesh>
      
      {/* Side Monitor R */}
      <mesh position={[2.5, 1.2, -1]} rotation={[-0.1, -0.4, 0]}>
        <planeGeometry args={[2, 3]} />
        <meshBasicMaterial color="#0e0e13" transparent opacity={0.8} />
        <Edges scale={1.001} color="#8b1a1a" />
      </mesh>
    </group>
  )
}
