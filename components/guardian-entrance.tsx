'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function CharacterModel({ targetId, onLandingComplete }: { targetId: string, onLandingComplete: () => void }) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/model.glb')
  const { actions } = useAnimations(animations, group)
  
  useEffect(() => {
    // Play idle animation if it exists, otherwise play the first available animation
    const idleAction = actions['Idle'] || (Object.keys(actions).length > 0 ? actions[Object.keys(actions)[0]] : null)
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play()
    }
  }, [actions])

  useEffect(() => {
    if (!group.current) return
    const section = document.getElementById(targetId)
    if (!section) return

    if (prefersReducedMotion()) {
      onLandingComplete()
      group.current.position.set(0, -2, -3) // resting position
      group.current.scale.setScalar(2.5) // Scale up placeholder
      return
    }

    // Initial state high above
    gsap.set(group.current.position, { y: 12, z: 0 })
    gsap.set(group.current.rotation, { x: Math.PI / 8, y: 0 })
    gsap.set(group.current.scale, { x: 2.5, y: 2.5, z: 2.5 })

    let hasTriggered = false

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          if (hasTriggered) return
          hasTriggered = true
        }
      }
    })

    // 1. Fall down
    tl.to(group.current.position, {
      y: -2.5,
      duration: 0.35,
      ease: 'power4.in',
    })
    tl.to(group.current.rotation, {
      x: 0,
      duration: 0.35,
      ease: 'power4.in',
    }, '<')

    // 2. Landing Event
    tl.add(() => {
      section.classList.add('shake-active')
      setTimeout(() => section.classList.remove('shake-active'), 200)
      
      // Dispatch event to trigger 2D DOM particles
      window.dispatchEvent(new CustomEvent('guardian-landed'))
    })

    // 3. Settling - push back slightly into the background
    tl.to(group.current.position, {
      z: -3,
      y: -2,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: onLandingComplete
    }, '<+=0.05')

    return () => {
      tl.kill()
      tl.scrollTrigger?.kill()
    }
  }, [targetId, onLandingComplete])

  return <primitive ref={group} object={scene} />
}

type GuardianEntranceProps = {
  targetId: string
  onLandingComplete: () => void
  className?: string
}

export function GuardianEntrance({ targetId, onLandingComplete, className }: GuardianEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shockwaveRef = useRef<SVGSVGElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  useEffect(() => {
    const handleLand = () => {
      if (shockwaveRef.current) {
        gsap.fromTo(shockwaveRef.current, 
          { scale: 0, autoAlpha: 1 }, 
          { scale: 3.5, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }
        )
      }
      if (particlesRef.current) {
        const particleEls = particlesRef.current.children
        Array.from(particleEls).forEach((p, i) => {
          const angle = (Math.PI * 2 * i) / particleEls.length
          const dist = 80 + Math.random() * 80
          gsap.fromTo(p, 
            { x: 0, y: 0, autoAlpha: 0.8, scale: 0.5 },
            {
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist + 20,
              autoAlpha: 0,
              scale: 2 + Math.random(),
              duration: 0.6,
              ease: 'power2.out'
            }
          )
        })
      }
    }
    
    window.addEventListener('guardian-landed', handleLand)
    return () => window.removeEventListener('guardian-landed', handleLand)
  }, [])

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center", className)} aria-hidden="true">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-10 mix-blend-screen opacity-80">
        <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
          {/* Dramatic lighting matching vengeance #8b1a1a accent */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 10, 5]} intensity={3} color="#8b1a1a" />
          <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#f5c400" />
          <pointLight position={[0, -1, 3]} intensity={8} color="#8b1a1a" distance={15} />
          <CharacterModel targetId={targetId} onLandingComplete={onLandingComplete} />
        </Canvas>
      </div>

      {/* 2D Overlay Effects */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        {/* Shockwave */}
        <svg ref={shockwaveRef} width="300" height="300" viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] opacity-0">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--vengeance)" strokeWidth="3" />
        </svg>

        {/* Particles */}
        <div ref={particlesRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-4 h-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute inset-0 rounded-full bg-foreground/60 w-2 h-2 opacity-0" />
          ))}
        </div>
      </div>
    </div>
  )
}

useGLTF.preload('/model.glb')
