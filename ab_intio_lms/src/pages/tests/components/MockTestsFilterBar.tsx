import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { logoMap, getLogoKey } from '../utils/mockTestsUtils'

interface MockTestsFilterBarProps {
  filter: string
  searchQuery: string
  onFilterChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export function MockTestsFilterBar({ filter, searchQuery, onFilterChange, onSearchChange }: MockTestsFilterBarProps) {
  const { t } = useTranslation()
  const commissions = ['All', 'FPSC', 'PPSC', 'SPSC', 'BPSC', 'KPPSC']

  return (
    <>
      <div className="flex w-full flex-wrap gap-2">
        {commissions.map((commission) => {
          const isAll = commission === 'All'
          const logo = !isAll ? logoMap[getLogoKey(commission)] : null
          const isActive = filter === commission

          return (
            <button
              key={commission}
              onClick={() => onFilterChange(commission)}
              className={cn(
                'flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all duration-200',
                isActive ? 'gradient-brand scale-105 border-transparent text-white shadow-md' : 'hover:scale-105'
              )}
              style={!isActive ? { borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' } : {}}
            >
              {logo && <img src={logo} alt={commission} className="h-4 w-4 object-contain" />}
              {isAll ? t('dashboard.tests.catalog.filters.all') : commission}
            </button>
          )
        })}
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('dashboard.tests.catalog.searchPlaceholder')}
          className="w-full rounded-2xl border py-3.5 pl-11 pr-4 text-sm shadow-sm transition-all focus:outline-none"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

    </>
  )
}
