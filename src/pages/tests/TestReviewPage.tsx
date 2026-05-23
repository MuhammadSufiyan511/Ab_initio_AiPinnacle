import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MotionPage } from '@/animations/MotionWrapper'
import { PageHeader } from '@/components/shared/PageHeader'
import { useTestReviewPage } from './hooks/useTestReviewPage'
import { TestReviewLoadingState } from './components/TestReviewLoadingState'
import { TestReviewEmptyState } from './components/TestReviewEmptyState'
import { TestReviewSummary } from './components/TestReviewSummary'
import { TestReviewQuestionCard } from './components/TestReviewQuestionCard'
import { TestReviewPagination } from './components/TestReviewPagination'

export default function TestReviewPage() {
  const { attemptId } = useParams<{ attemptId: string }>()
  const { t } = useTranslation()
  const {
    loading,
    attempt,
    totalQuestions,
    totalPages,
    paginatedQuestions,
    scoreVal,
    pct,
    hasPassed,
    currentPage,
    setCurrentPage,
    from,
    to,
  } = useTestReviewPage(attemptId)

  if (loading) return <TestReviewLoadingState />
  if (!attempt) return <TestReviewEmptyState />

  return (
    <div dir="ltr" className="quiz-ltr">
      <MotionPage className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/test-preparations/history" className="rounded-lg border p-2 transition-colors hover:bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <ArrowLeft size={16} />
          </Link>
          <PageHeader
            title={t('dashboard.tests.review.title')}
            subtitle={`${attempt.exam_category || ''} ${attempt.exam_course || ''} - ${t('dashboard.tests.review.casePrefix')} ${attempt.case_no || 'F.4-02/2026-R'}`.trim()}
          />
        </div>

        <TestReviewSummary
          attempt={attempt}
          totalQuestions={totalQuestions}
          scoreVal={scoreVal}
          pct={pct}
          hasPassed={hasPassed}
        />

        {totalPages > 1 && (
          <TestReviewPagination currentPage={currentPage} totalPages={totalPages} totalQuestions={totalQuestions} itemsPerPage={50} onPageChange={setCurrentPage} />
        )}

        <div className="flex flex-col gap-4">
          {paginatedQuestions.map((question: any, index: number) => (
            <TestReviewQuestionCard key={question.id} question={question} index={from + index} />
          ))}
        </div>

        {totalPages > 1 && (
          <TestReviewPagination currentPage={currentPage} totalPages={totalPages} totalQuestions={totalQuestions} itemsPerPage={50} onPageChange={setCurrentPage} />
        )}
      </MotionPage>
    </div>
  )
}
