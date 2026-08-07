'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { FogExp2 } from 'three'
import * as THREE from 'three'

export function Atmosphere() {
  const rainRef = useRef<THREE.Points>(null)
  const rainCount = 1000

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(rainCount * 3)
    const vel = new Float32Array(rainCount)
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = Math.random() * 40 - 20 // start high and low
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
      vel[i] = 0.2 + Math.random() * 0.1 // fall speed
    }
    return [pos, vel]
  }, [rainCount])

  useFrame(() => {
    if (rainRef.current) {
      const geometry = rainRef.current.geometry
      const posAttribute = geometry.attributes.position
      for (let i = 0; i < rainCount; i++) {
        // Move Y down by velocity
        posAttribute.setY(i, posAttribute.getY(i) - velocities[i])
        // If it falls below a certain point (or below the camera), reset it high up
        if (posAttribute.getY(i) < -80) {
          posAttribute.setY(i, 20)
        }
      }
      posAttribute.needsUpdate = true
    }
  })

  return (
    <>
      <fogExp2 attach="fog" args={["#0a0a0d", 0.03]} />
      <points ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rainCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.05} transparent opacity={0.4} />
      </points>
    </>
  )
}
