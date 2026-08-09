'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticProps {
  children: React.ReactElement
  strength?: number
}

export function Magnetic({ children, strength = 20 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const boundingRect = ref.current?.getBoundingClientRect()
    if (boundingRect) {
      const { width, height, top, left } = boundingRect
      const middleX = clientX - (left + width / 2)
      const middleY = clientY - (top + height / 2)
      setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) })
    }
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}
