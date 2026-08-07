'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export function GothamCity() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  
  const buildingCount = 200
  const cityDepth = -120 // How far down the city goes

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useMemo(() => {
    if (!meshRef.current) return
    let i = 0
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        if (i >= buildingCount) break
        // Leave a central shaft empty for the camera to fall through
        if (Math.abs(x) < 2 && Math.abs(z) < 2) continue

        // Random height and position
        const height = 10 + Math.random() * 40
        const posY = -10 - Math.random() * 80
        
        // Position them in a grid, slightly randomized
        dummy.position.set(
          x * 8 + (Math.random() - 0.5) * 4,
          posY,
          z * 8 + (Math.random() - 0.5) * 4
        )
        
        dummy.scale.set(
          3 + Math.random() * 3,
          height,
          3 + Math.random() * 3
        )
        
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.matrix)
        
        // Randomize color slightly (dark gray to black)
        const color = new THREE.Color()
        color.setHSL(0, 0, Math.random() * 0.1)
        meshRef.current.setColorAt(i, color)
        
        i++
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [dummy])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, buildingCount]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#111" roughness={0.8} />
    </instancedMesh>
  )
}
