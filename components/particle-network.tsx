'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { prefersReducedMotion } from '@/lib/use-reveal'

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null)
  const reducedMotion = prefersReducedMotion()

  // Generate 2000 points in a sphere
  const positions = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = Math.cbrt(Math.random()) * 4.5 // Radius 4.5
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return
    // Slow autonomous rotation
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
    
    // Subtle mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 10
    const targetY = (state.pointer.y * Math.PI) / 10
    ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x)
    ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y)
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f5c400"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export function NeuralNetworkBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  )
}
