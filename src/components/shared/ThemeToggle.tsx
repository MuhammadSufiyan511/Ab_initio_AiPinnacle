import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useThemeStore()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        'relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200',
        'hover:bg-[var(--bg-elevated)] border border-[var(--border-color)]',
        className
      )}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {theme === 'dark'
          ? <Moon size={16} style={{ color: 'var(--color-primary-light)' }} />
          : <Sun size={16} style={{ color: 'var(--color-warning)' }} />
        }
      </motion.div>
    </button>
  )
}
