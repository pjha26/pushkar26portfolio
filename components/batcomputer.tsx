'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges, useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function Batcomputer() {
  const group = useRef<THREE.Group>(null)
  const scroll = useScroll()

  // Fade out the desk as we scroll down
  useFrame(() => {
    if (group.current) {
      const opacity = 1 - Math.min(scroll.offset * 8, 1)
      group.current.position.y = -scroll.offset * 20
      
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
