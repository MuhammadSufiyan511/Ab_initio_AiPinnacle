import type { ExamQuestionRow } from '../utils/fpscExamUtils'
import { seedShuffle } from '../utils/fpscExamUtils'

function findFirstUnansweredIndex(questions: ExamQuestionRow[], answersMap: Record<number, number>) {
  const index = questions.findIndex((question) => answersMap[question.id] === undefined)
  return index === -1 ? 0 : index
}

function buildSectionQuestions(sections: any[], originalQuestions: ExamQuestionRow[], attemptId: number) {
  const activeQuestionsList: ExamQuestionRow[] = []

  if (sections?.length) {
    sections.forEach((section) => {
      const sectionQuestions = originalQuestions.filter((question) => question.sectionId === section.id)
      if (sectionQuestions.length) {
        activeQuestionsList.push(...seedShuffle(sectionQuestions, `${attemptId}-${section.id}`))
      }
    })

    const groupedSectionIds = new Set(sections.map((section) => section.id))
    const residualQuestions = originalQuestions.filter((question) => !groupedSectionIds.has(question.sectionId))
    if (residualQuestions.length) activeQuestionsList.push(...seedShuffle(residualQuestions, `${attemptId}-residual`))
    return activeQuestionsList
  }

  return seedShuffle(originalQuestions, attemptId)
}

export function buildAttemptQuestions(activeTest: any, originalQuestions: ExamQuestionRow[], attemptId: number) {
  return buildSectionQuestions(activeTest?.sections, originalQuestions, attemptId)
}

export function hydrateAttemptState(savedAnswers: any[], activeQuestionsList: ExamQuestionRow[], penalty: number) {
  const answersMap: Record<number, number> = {}
  let correctAnswers = 0
  let wrongAnswers = 0
  let skippedAnswers = 0
  const sectionScores: Record<string, number> = {}

  savedAnswers.forEach((answer) => {
    answersMap[answer.question_id] = answer.selected_option_index
    const matchingQuestion = activeQuestionsList.find((question) => question.id === answer.question_id)
    if (!matchingQuestion) return

    if (answer.selected_option_index === -1) skippedAnswers += 1
    else if (answer.selected_option_index === matchingQuestion.answer) {
      correctAnswers += 1
      sectionScores[matchingQuestion.sectionId] = (sectionScores[matchingQuestion.sectionId] ?? 0) + 1
    } else {
      wrongAnswers += 1
      sectionScores[matchingQuestion.sectionId] = (sectionScores[matchingQuestion.sectionId] ?? 0) - penalty
    }
  })

  const currentQuestionIndex = findFirstUnansweredIndex(activeQuestionsList, answersMap)
  const selectedOption = answersMap[activeQuestionsList[currentQuestionIndex]?.id]

  return {
    answersMap,
    correctAnswers,
    wrongAnswers,
    skippedAnswers,
    sectionScores,
    currentQuestionIndex,
    selectedOption: selectedOption ?? null,
    isAnswered: selectedOption !== undefined,
  }
}

export function createExamResetState(duration: number) {
  return {
    attemptId: null,
    answersMap: {},
    currentQuestionIndex: 0,
    selectedOption: null,
    isAnswered: false,
    correctAnswers: 0,
    wrongAnswers: 0,
    skippedAnswers: 0,
    sectionScores: {},
    timeLeft: duration,
    isFinished: false,
    hasStarted: false,
  }
}
