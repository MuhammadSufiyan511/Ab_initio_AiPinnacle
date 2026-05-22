import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface MockTestsPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function MockTestsPagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: MockTestsPaginationProps) {
  const { t } = useTranslation()
  if (totalPages <= 1) return null

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row" style={{ borderColor: 'var(--border-color)' }}>
      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
        {t('dashboard.tests.catalog.pagination.showing', {
          from: totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1,
          to: Math.min(currentPage * itemsPerPage, totalItems),
          total: totalItems,
        })}
      </span>

      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="rounded-lg border bg-[var(--bg-surface)] p-2 transition-all hover:bg-[var(--bg-elevated)] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <ChevronLeft size={16} style={{ color: 'var(--text-primary)' }} />
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'h-8 w-8 rounded-lg border text-xs font-bold transition-all',
                currentPage === page ? 'gradient-brand border-transparent text-white' : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)]'
              )}
              style={currentPage !== page ? { borderColor: 'var(--border-color)', color: 'var(--text-primary)' } : {}}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="rounded-lg border bg-[var(--bg-surface)] p-2 transition-all hover:bg-[var(--bg-elevated)] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <ChevronRight size={16} style={{ color: 'var(--text-primary)' }} />
        </button>
      </div>
    </div>
  )
}
