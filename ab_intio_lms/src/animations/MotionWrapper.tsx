import { motion, type HTMLMotionProps } from 'framer-motion'
import { pageTransition } from './variants'

interface MotionPageProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
}

/** Wraps page content with a standard fade-in/up page transition. */
export function MotionPage({ children, className = '', ...props }: MotionPageProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface MotionListProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

/** Staggered container — children animate in one by one. */
export function MotionList({ children, className = '' }: MotionListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Individual stagger item */
export function MotionItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
