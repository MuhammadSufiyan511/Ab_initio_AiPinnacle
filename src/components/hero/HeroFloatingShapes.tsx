import { memo } from 'react'
import { motion } from 'framer-motion'

interface FloatingShape {
  id: number
  size: number
  color: string
  duration: number
  delay: number
  x: number
  y: number
}

const SHAPES: FloatingShape[] = [
  { id: 1, size: 120, color: 'rgba(29, 78, 216, 0.15)', duration: 6, delay: 0, x: -50, y: 100 },
  { id: 2, size: 80, color: 'rgba(245, 158, 11, 0.1)', duration: 7, delay: 1, x: 80, y: -30 },
  { id: 3, size: 100, color: 'rgba(219, 234, 254, 0.2)', duration: 8, delay: 2, x: -30, y: -80 },
  { id: 4, size: 60, color: 'rgba(29, 78, 216, 0.1)', duration: 5.5, delay: 0.5, x: 120, y: 60 },
  { id: 5, size: 90, color: 'rgba(219, 234, 254, 0.15)', duration: 7.5, delay: 1.5, x: -80, y: 40 },
]

function HeroFloatingShapesComponent() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {SHAPES.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export const HeroFloatingShapes = memo(HeroFloatingShapesComponent)
