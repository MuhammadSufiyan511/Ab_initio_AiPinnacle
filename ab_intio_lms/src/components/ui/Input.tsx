import { type ReactNode, forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
  suffix?: ReactNode
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, suffix, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )
        }
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-13 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
              icon && "pl-11",
              suffix && "pr-11",
              error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {suffix}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500 ml-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
