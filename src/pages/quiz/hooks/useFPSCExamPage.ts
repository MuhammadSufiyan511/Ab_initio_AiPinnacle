import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import type { ExamTestData } from '@/data/examRegistry'
import { buildDynamicExam, mapExamQuestions, type ExamQuestionRow } from '../utils/fpscExamUtils'
import { fetchExamQuestions } from '../services/fpscExamService'
import { useFPSCExamActions } from './useFPSCExamActions'

interface UseFPSCExamPageParams {
  examDbId: string
}

export function useFPSCExamPage({ examDbId }: UseFPSCExamPageParams) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [activeTest, setActiveTest] = useState<(ExamTestData & { negativeMarking: number }) | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [attemptId, setAttemptId] = useState<number | null>(null)
  const [examLogo, setExamLogo] = useState<string | null>(null)
  const [originalQuestions, setOriginalQuestions] = useState<ExamQuestionRow[]>([])
  const [questions, setQuestions] = useState<ExamQuestionRow[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answersMap, setAnswersMap] = useState<Record<number, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [skippedAnswers, setSkippedAnswers] = useState(0)
  const [sectionScores, setSectionScores] = useState<Record<string, number>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const penalty = activeTest?.negativeMarking ?? 0.25
  const totalQuestions = questions.length

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [hasStarted, isFinished])

  useEffect(() => {
    let active = true
    ;(async () => {
      setLoading(true)
      try {
        const data = await fetchExamQuestions(examDbId)
        if (!active) return
        if (data.exam?.logo_url) setExamLogo(data.exam.logo_url)
        const dynamicTest = buildDynamicExam(data)
        const mappedQuestions = mapExamQuestions(data.questions || [])
        setActiveTest(dynamicTest)
        setOriginalQuestions(mappedQuestions)
        setQuestions(mappedQuestions)
        setTimeLeft(dynamicTest.duration)
      } catch {
        toast.error(t('dashboard.quiz.toasts.loadError'))
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [examDbId, t])

  const actions = useFPSCExamActions({
    examDbId,
    activeTest,
    originalQuestions,
    questions,
    currentQuestionIndex,
    answersMap,
    attemptId,
    isAnswered,
    isFinished,
    timeLeft,
    penalty,
    totalQuestions,
    setAttemptId,
    setTimeLeft,
    setQuestions,
    setAnswersMap,
    setCurrentQuestionIndex,
    setSelectedOption,
    setIsAnswered,
    setCorrectAnswers,
    setWrongAnswers,
    setSkippedAnswers,
    setSectionScores,
    setHasStarted,
    setIsFinished,
  })

  const {
    handleLaunchExam,
    handleOptionClick,
    handleSkip,
    advanceToNext,
    handleSubmitExam,
    handleResetExam,
    handleStartNewTest,
  } = actions

  useEffect(() => {
    if (isFinished || questions.length === 0 || !hasStarted || !attemptId) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          void handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [attemptId, hasStarted, isFinished, questions.length, handleSubmitExam])

  return {
    loading,
    activeTest,
    hasStarted,
    isFinished,
    examLogo,
    questions,
    currentQuestionIndex,
    selectedOption,
    isAnswered,
    timeLeft,
    sectionScores,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    skippedAnswers,
    handleLaunchExam,
    handleOptionClick,
    handleSkip,
    advanceToNext,
    handleSubmitExam,
    handleResetExam,
    handleStartNewTest,
  }
}
