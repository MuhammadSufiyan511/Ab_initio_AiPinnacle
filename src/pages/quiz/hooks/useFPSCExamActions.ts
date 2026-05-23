import type { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import type { ExamTestData } from '@/data/examRegistry'
import type { ExamQuestionRow } from '../utils/fpscExamUtils'
import { buildAttemptQuestions, hydrateAttemptState } from '../utils/fpscExamSession'
import { saveExamAnswer, startExamAttempt, submitExamAttempt } from '../services/fpscExamService'

interface UseFPSCExamActionsParams {
  examDbId: string
  activeTest: (ExamTestData & { negativeMarking: number }) | null
  originalQuestions: ExamQuestionRow[]
  questions: ExamQuestionRow[]
  currentQuestionIndex: number
  answersMap: Record<number, number>
  attemptId: number | null
  isAnswered: boolean
  isFinished: boolean
  timeLeft: number
  penalty: number
  totalQuestions: number
  setAttemptId: (value: number | null) => void
  setTimeLeft: (value: number) => void
  setQuestions: (value: ExamQuestionRow[]) => void
  setAnswersMap: (value: Record<number, number>) => void
  setCurrentQuestionIndex: (value: number) => void
  setSelectedOption: (value: number | null) => void
  setIsAnswered: (value: boolean) => void
  setCorrectAnswers: Dispatch<SetStateAction<number>>
  setWrongAnswers: Dispatch<SetStateAction<number>>
  setSkippedAnswers: Dispatch<SetStateAction<number>>
  setSectionScores: Dispatch<SetStateAction<Record<string, number>>>
  setHasStarted: (value: boolean) => void
  setIsFinished: (value: boolean) => void
}

export function useFPSCExamActions(params: UseFPSCExamActionsParams) {
  const { t } = useTranslation()
  const {
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
  } = params

  async function handleLaunchExam() {
    if (!activeTest) return
    try {
      const data = await startExamAttempt(examDbId, timeLeft)
      const activeQuestionsList = buildAttemptQuestions(activeTest, originalQuestions, data.attemptId)
      setAttemptId(data.attemptId)
      setTimeLeft(data.remainingTime)
      setQuestions(activeQuestionsList)

      if (data.savedAnswers?.length) {
        const hydrated = hydrateAttemptState(data.savedAnswers, activeQuestionsList, penalty)
        setAnswersMap(hydrated.answersMap)
        setCorrectAnswers(hydrated.correctAnswers)
        setWrongAnswers(hydrated.wrongAnswers)
        setSkippedAnswers(hydrated.skippedAnswers)
        setSectionScores(hydrated.sectionScores)
        setCurrentQuestionIndex(hydrated.currentQuestionIndex)
        setSelectedOption(hydrated.selectedOption)
        setIsAnswered(hydrated.isAnswered)
        toast.success(t('dashboard.quiz.toasts.sessionRecovered'))
      } else {
        setAnswersMap({})
        setCurrentQuestionIndex(0)
        setSelectedOption(null)
        setIsAnswered(false)
        setCorrectAnswers(0)
        setWrongAnswers(0)
        setSkippedAnswers(0)
        setSectionScores({})
      }

      setHasStarted(true)
    } catch {
      toast.error(t('dashboard.quiz.toasts.initError'))
    }
  }

  async function handleOptionClick(index: number) {
    if (isAnswered || isFinished || !attemptId) return
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    setSelectedOption(index)
    setIsAnswered(true)
    setAnswersMap({ ...answersMap, [currentQuestion.id]: index })

    const correct = index === currentQuestion.answer
    setSectionScores((prev) => ({ ...prev, [currentQuestion.sectionId]: (prev[currentQuestion.sectionId] ?? 0) + (correct ? 1 : -penalty) }))
    if (correct) setCorrectAnswers((prev) => prev + 1)
    else setWrongAnswers((prev) => prev + 1)

    try {
      await saveExamAnswer(attemptId, currentQuestion.id, index, timeLeft - 1)
    } catch {
      // Silently handle save errors
    }
  }

  async function handleSkip() {
    if (isAnswered || isFinished || !attemptId) return
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    setSelectedOption(-1)
    setIsAnswered(true)
    setSkippedAnswers((prev) => prev + 1)
    setAnswersMap({ ...answersMap, [currentQuestion.id]: -1 })

    try {
      await saveExamAnswer(attemptId, currentQuestion.id, -1, timeLeft - 1)
    } catch {
      // Silently handle save errors
    }
  }

  function advanceToNext() {
    const nextIndex = currentQuestionIndex + 1
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex)
      const nextQuestion = questions[nextIndex]
      const savedAnswer = answersMap[nextQuestion.id]
      setSelectedOption(savedAnswer ?? null)
      setIsAnswered(savedAnswer !== undefined)
      return
    }
    void handleSubmitExam()
  }

  async function handleSubmitExam() {
    if (!attemptId || !activeTest) return
    setIsFinished(true)
    try {
      const data = await submitExamAttempt(attemptId, activeTest.duration - timeLeft)
      setCorrectAnswers(data.correctAnswers)
      setWrongAnswers(data.wrongAnswers)
      setSkippedAnswers(data.skippedAnswers)
      toast.success(t('dashboard.quiz.toasts.submitSuccess'))
    } catch {
      toast.error(t('dashboard.quiz.toasts.submitError'))
    }
  }

  async function handleResetExam() {
    try {
      if (attemptId) await submitExamAttempt(attemptId, 0)
    } catch {
      toast.error(t('dashboard.quiz.toasts.resetError'))
    }
    handleStartNewTest()
  }

  function handleStartNewTest() {
    if (!activeTest) return
    setAttemptId(null)
    setAnswersMap({})
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setCorrectAnswers(0)
    setWrongAnswers(0)
    setSkippedAnswers(0)
    setSectionScores({})
    setTimeLeft(activeTest.duration)
    setIsFinished(false)
    setHasStarted(false)
    setQuestions(originalQuestions)
  }

  return { handleLaunchExam, handleOptionClick, handleSkip, advanceToNext, handleSubmitExam, handleResetExam, handleStartNewTest }
}
