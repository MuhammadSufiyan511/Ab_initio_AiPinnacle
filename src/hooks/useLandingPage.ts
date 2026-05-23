import { useState, useCallback } from 'react'

export type TabType = 'quiz' | 'flash' | 'heat'

export interface QuizState {
  answered: boolean
  selected: string | null
  isCorrect: boolean | null
}

const INITIAL_QUIZ_STATE: QuizState = {
  answered: false,
  selected: null,
  isCorrect: null,
}

export function useLandingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('quiz')
  const [flashFlipped, setFlashFlipped] = useState(false)
  const [quizState, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE)

  const switchTab = useCallback((tab: TabType) => {
    setActiveTab(tab)
    if (tab !== 'quiz') {
      setQuizState(INITIAL_QUIZ_STATE)
    }
    if (tab !== 'flash') {
      setFlashFlipped(false)
    }
  }, [])

  const checkAnswer = useCallback((selectedOption: string) => {
    setQuizState({
      answered: true,
      selected: selectedOption,
      isCorrect: selectedOption === 'b',
    })
  }, [])

  const resetDemo = useCallback(() => {
    setQuizState(INITIAL_QUIZ_STATE)
  }, [])

  const flipFlashcard = useCallback(() => {
    setFlashFlipped((prev) => !prev)
  }, [])

  return {
    activeTab,
    flashFlipped,
    quizState,
    switchTab,
    checkAnswer,
    resetDemo,
    flipFlashcard,
  }
}
