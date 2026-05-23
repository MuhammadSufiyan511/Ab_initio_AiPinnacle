import { useOutletContext } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { MotionPage, MotionItem, MotionList } from '@/animations/MotionWrapper'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useMockTestsPage } from './hooks/useMockTestsPage'
import { MockTestsFilterBar } from './components/MockTestsFilterBar'
import { MockTestsLoadingState } from './components/MockTestsLoadingState'
import { MockTestsEmptyState } from './components/MockTestsEmptyState'
import { MockTestsPagination } from './components/MockTestsPagination'
import { MockTestCard } from './components/MockTestCard'

export default function MockTestsPage() {
  const { t } = useTranslation()
  const { sidebarCollapsed } = useOutletContext<{ sidebarCollapsed: boolean }>() || { sidebarCollapsed: false }
  const {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    activeAttempts,
    loading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    filteredExams,
    paginatedExams,
    totalPages,
  } = useMockTestsPage()

  if (loading) return <MockTestsLoadingState />

  return (
    <MotionPage className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{t('dashboard.tests.catalog.title')}</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('dashboard.tests.catalog.subtitle')}</p>
      </div>

      <MockTestsFilterBar
        filter={filter}
        searchQuery={searchQuery}
        onFilterChange={setFilter}
        onSearchChange={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        {paginatedExams.length > 0 ? (
          <div className="flex flex-col gap-8">
            <MotionList key={`list-${filter}`} className={cn('grid gap-6 grid-cols-1', sidebarCollapsed ? 'md:grid-cols-3' : 'md:grid-cols-2', 'lg:grid-cols-3')}>
              {paginatedExams.map((exam) => {
                const activeAttempt = activeAttempts.find((attempt) => attempt.exam_id === exam.id)
                return (
                  <MotionItem key={exam.id}>
                    <MockTestCard exam={exam} activeAttempt={activeAttempt} />
                  </MotionItem>
                )
              })}
            </MotionList>

            <MockTestsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredExams.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <MotionItem key="empty-state">
            <MockTestsEmptyState filter={filter} />
          </MotionItem>
        )}
      </AnimatePresence>
    </MotionPage>
  )
}
