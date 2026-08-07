'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { Batcomputer } from './batcomputer'
import { GothamCity } from './gotham-city'
import { Atmosphere } from './atmosphere'

function CameraRig() {
  const scroll = useScroll()
  const { camera } = useThree()
  
  useFrame((state, delta) => {
    const r = scroll.offset
    
    // Start at Batcomputer (z: 9, y: 1.5)
    // As we scroll, dive down into the city
    const startZ = 9
    const startY = 1.5
    
    const diveY = startY - (r * 60)
    const diveZ = startZ - (r * 15)
    
    camera.position.z = THREE.MathUtils.damp(camera.position.z, diveZ, 4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, diveY, 4, delta)
    
    const lookAtY = diveY - (r * 10)
    camera.lookAt(0, lookAtY, 0)
  })

  return null
}

export function Scene({ children }: { children: React.ReactNode }) {
  const pages = 8

  return (
    <div className="fixed inset-0 z-0 bg-background">
      <Canvas camera={{ position: [0, 1.5, 9], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, -5]} intensity={2} color="#8b1a1a" />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#f5c400" />
        
        <Atmosphere />

        <ScrollControls pages={pages} damping={0.2}>
          <CameraRig />
          <Batcomputer />
          <GothamCity />

          <Scroll html style={{ width: '100%', height: '100%' }}>
            {children}
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
