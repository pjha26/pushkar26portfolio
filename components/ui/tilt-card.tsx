'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps, useMotionTemplate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
}

export function TiltCard({ children, className, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const currentMouseX = e.clientX - rect.left
    const currentMouseY = e.clientY - rect.top
    
    const xPct = currentMouseX / width - 0.5
    const yPct = currentMouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
    mouseX.set(currentMouseX)
    mouseY.set(currentMouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        "relative transition-colors duration-300",
        // Batman theme styling: dark card, glowing border on hover
        "border border-border/50 bg-card/80 backdrop-blur-md",
        "hover:border-signal/50 hover:shadow-[0_0_30px_rgba(245,196,0,0.15)]",
        className
      )}
      {...props}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Spotlight Effect overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-soft-light"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 40%
            )
          `,
        }}
      />

      {/* Decorative scanner line / high-tech bracket effect */}
      <div className="absolute inset-0 border-[1px] border-transparent group-hover:border-signal/20 pointer-events-none transition-colors duration-300 mix-blend-screen" style={{ transform: 'translateZ(10px)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}
