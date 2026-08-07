'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Batcomputer } from './batcomputer'
import { GothamCity } from './gotham-city'
import { Atmosphere } from './atmosphere'

function CameraRig() {
  useFrame((state, delta) => {
    // Read native scroll progress (0 to 1)
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const scrollOffset = window.scrollY / maxScroll
    const r = Math.max(0, Math.min(scrollOffset, 1))
    
    // Start at Batcomputer (z: 9, y: 1.5)
    // As we scroll, dive down into the city
    const startZ = 9
    const startY = 1.5
    
    const diveY = startY - (r * 60)
    const diveZ = startZ - (r * 15)
    
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, diveZ, 4, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, diveY, 4, delta)
    
    const lookAtY = diveY - (r * 10)
    state.camera.lookAt(0, lookAtY, 0)
  })

  return null
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-background pointer-events-none">
      <Canvas camera={{ position: [0, 1.5, 9], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, -5]} intensity={2} color="#8b1a1a" />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#f5c400" />
        
        <Atmosphere />

        <CameraRig />
        <Batcomputer />
        <GothamCity />
      </Canvas>
    </div>
  )
}
