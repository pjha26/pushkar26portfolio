'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
}

export function TiltCard({ children, className, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
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
      <div style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>
      
      {/* Decorative scanner line / high-tech bracket effect */}
      <div className="absolute inset-0 border-[1px] border-transparent hover:border-signal/20 pointer-events-none transition-colors duration-300 mix-blend-screen" style={{ transform: 'translateZ(10px)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}
