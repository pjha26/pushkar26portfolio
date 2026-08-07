'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// A procedural, highly-stylized low-poly alleyway/street to give context
function NoirAlley() {
  const material = new THREE.MeshStandardMaterial({ color: '#050506', roughness: 0.8 })
  return (
    <group>
      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#030304" roughness={0.9} />
      </mesh>
      
      {/* Buildings Left */}
      <mesh receiveShadow castShadow material={material} position={[-6, 4, -4]}>
        <boxGeometry args={[4, 12, 10]} />
      </mesh>
      <mesh receiveShadow castShadow material={material} position={[-7, 6, -14]}>
        <boxGeometry args={[4, 16, 12]} />
      </mesh>

      {/* Buildings Right */}
      <mesh receiveShadow castShadow material={material} position={[6, 5, -5]}>
        <boxGeometry args={[3, 10, 12]} />
      </mesh>
      <mesh receiveShadow castShadow material={material} position={[8, 7, -18]}>
        <boxGeometry args={[5, 14, 15]} />
      </mesh>
      
      {/* Background silhouette */}
      <mesh receiveShadow castShadow material={material} position={[0, 8, -30]}>
        <boxGeometry args={[20, 20, 2]} />
      </mesh>
    </group>
  )
}

function CharacterModel() {
  const group = useRef<THREE.Group>(null)
  const capeRef = useRef<THREE.Mesh>(null)
  const { scene, animations } = useGLTF('/model.glb')
  const { actions } = useAnimations(animations, group)
  
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          if (mat.color) mat.color.multiplyScalar(1.2)
          if (mat.roughness !== undefined) mat.roughness = Math.min(mat.roughness, 0.7)
        }
      }
    })
  }, [scene])

  useEffect(() => {
    // Force the idle animation to play
    const idleAction = actions['Idle'] || (Object.keys(actions).length > 0 ? actions[Object.keys(actions)[0]] : null)
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play()
    }
  }, [actions])

  // Simple procedural cape animation
  useFrame(({ clock }) => {
    if (capeRef.current) {
      const t = clock.getElapsedTime()
      // Simulate wind rippling the cape
      capeRef.current.rotation.x = -Math.PI / 12 + Math.sin(t * 2) * 0.05
      capeRef.current.rotation.z = Math.cos(t * 1.5) * 0.02
    }
  })

  return (
    <group ref={group} position={[2.5, 0, -2]} rotation={[0, -Math.PI / 8, 0]} scale={2.3}>
      <primitive object={scene} />
      {/* Procedural Cape attached to back */}
      <mesh ref={capeRef} position={[0, 1.4, -0.2]} castShadow receiveShadow>
        <planeGeometry args={[0.8, 1.6, 4, 4]} />
        <meshStandardMaterial color="#050506" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function ScrollCamera({ targetId }: { targetId: string }) {
  const { camera } = useThree()
  
  useEffect(() => {
    if (prefersReducedMotion()) {
      camera.position.set(2, 1.5, 5)
      camera.lookAt(2.5, 1, -2)
      return
    }

    const section = document.getElementById(targetId)
    if (!section) return

    // Set initial wide/high angle
    camera.position.set(-2, 4, 10)
    camera.lookAt(0, 1, -2)

    // Push in towards character as user scrolls
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      }
    })

    tl.to(camera.position, {
      x: 1.5,
      y: 1.8,
      z: 4,
      ease: 'power2.inOut'
    }, 0)
    
    tl.to(camera.rotation, {
      x: -0.1,
      y: 0,
      z: 0,
      ease: 'power2.inOut'
    }, 0)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [camera, targetId])

  return null
}

type GuardianEntranceProps = {
  targetId: string
  onLandingComplete?: () => void
  className?: string
}

export function GuardianEntrance({ targetId, onLandingComplete, className }: GuardianEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Notify hero component that "landing" is complete so it can fade in text
    if (onLandingComplete) {
      setTimeout(onLandingComplete, 100)
    }
  }, [onLandingComplete])

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center", className)} aria-hidden="true">
      {/* 3D Canvas Layer - Hidden on mobile for performance/readability, visible on lg screens and up */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <Canvas shadows camera={{ position: [-2, 4, 10], fov: 40 }}>
          <fogExp2 attach="fog" args={["#0a0a0d", 0.04]} />
          
          <ambientLight intensity={0.1} />
          {/* Cool moonlight */}
          <directionalLight position={[-10, 15, 10]} intensity={0.5} color="#8aa2bd" castShadow shadow-mapSize={[1024, 1024]} />
          {/* Signal yellow spot/point light raking across scene */}
          <spotLight position={[8, 5, 2]} angle={0.6} penumbra={0.8} intensity={25} color="#f5c400" distance={20} castShadow shadow-bias={-0.0001} />
          {/* Vengeance red accent */}
          <pointLight position={[2, 0.5, -3]} intensity={5} color="#8b1a1a" distance={5} />
          
          <NoirAlley />
          <CharacterModel />
          
          <ContactShadows position={[2.5, 0.01, -2]} opacity={0.8} scale={3} blur={2} far={2} color="#000000" />
          <ScrollCamera targetId={targetId} />
        </Canvas>
      </div>
    </div>
  )
}

useGLTF.preload('/model.glb')
