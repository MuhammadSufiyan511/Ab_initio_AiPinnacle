import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MotionPage } from '@/animations/MotionWrapper'
import { examsData } from '@/data/examRegistry'
import type { ExamTestData } from '@/data/examRegistry'

import FPSCStartScreen from './components/FPSCStartScreen'
import FPSCActiveExamScreen from './components/FPSCActiveExamScreen'
import FPSCResultsScreen from './components/FPSCResultsScreen'

const shuffleArray = (array: any[]) => {
  let shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const shuffleQuestionOptions = (question: any) => {
  if (!question || !question.options) return question
  const optionsWithCorrect = question.options.map((opt: string, index: number) => ({
    text: opt,
    isCorrect: index === question.answer
  }))
  const shuffledOptions = shuffleArray(optionsWithCorrect)
  return {
    ...question,
    options: shuffledOptions.map(o => o.text),
    answer: shuffledOptions.findIndex(o => o.isCorrect)
  }
}

const generateFormattedBank = (data: ExamTestData) => {
  const formatted: any[] = []
  let globalId = 1
  data.sections.forEach((section) => {
    section.questions.forEach((item) => {
      formatted.push({
        id: globalId++,
        sectionId: section.id,
        category: section.name,
        question: item[0],
        options: item[1],
        answer: item[2],
        explanation: item[3]
      })
    })
  })
  return formatted
}

export default function FPSCExamPage() {
  const { testId } = useParams()
  const activeKey = testId ?? 'fpsc-system-analyst'
  const activeTest = examsData[activeKey] ?? examsData['fpsc-system-analyst']

  const [hasStarted, setHasStarted] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [skippedAnswers, setSkippedAnswers] = useState(0)
  const [sectionScores, setSectionScores] = useState<Record<string, number>>({})

  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(activeTest.duration)

  const PENALTY = 0.25
  const TOTAL_QUESTIONS = activeTest.sections.reduce((sum, sec) => sum + sec.questions.length, 0)

  useEffect(() => {
    generateNewTest()
    setTimeLeft(activeTest.duration)
  }, [activeKey])

  const generateNewTest = () => {
    const formattedBank = generateFormattedBank(activeTest)
    const combinedTest: any[] = []
    activeTest.sections.forEach((sec) => {
      const secQuestions = shuffleArray(formattedBank.filter(q => q.sectionId === sec.id))
      combinedTest.push(...secQuestions)
    })
    const processedQuestions = combinedTest.map(q => shuffleQuestionOptions({ ...q }))
    setQuestions(processedQuestions)
  }

  useEffect(() => {
    if (isFinished || questions.length === 0 || !hasStarted) return
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval)
          setIsFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [isFinished, questions.length, hasStarted])

  const handleOptionClick = (index: number) => {
    if (isAnswered || isFinished) return
    setSelectedOption(index)
    setIsAnswered(true)
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    const isCorrect = index === currentQuestion.answer
    const points = isCorrect ? 1 : -PENALTY
    setSectionScores(prev => ({
      ...prev,
      [currentQuestion.sectionId]: (prev[currentQuestion.sectionId] ?? 0) + points
    }))

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
    } else {
      setWrongAnswers(prev => prev + 1)
    }
  }

  const handleSkip = () => {
    if (isAnswered || isFinished) return
    setSkippedAnswers(prev => prev + 1)
    setIsAnswered(true)
    setSelectedOption(-1)
  }

  const advanceToNext = () => {
    setCurrentQuestionIndex((prev) => {
      if (prev + 1 < TOTAL_QUESTIONS) {
        setSelectedOption(null)
        setIsAnswered(false)
        return prev + 1
      } else {
        setIsFinished(true)
        return prev
      }
    })
  }

  const resetStats = (startImmediately: boolean) => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setCorrectAnswers(0)
    setWrongAnswers(0)
    setSkippedAnswers(0)
    
    const initialScores: Record<string, number> = {}
    activeTest.sections.forEach(sec => {
      initialScores[sec.id] = 0
    })
    setSectionScores(initialScores)
    setTimeLeft(activeTest.duration)
    setIsFinished(false)
    setHasStarted(startImmediately)
  }

  const handleStartNewTest = () => {
    generateNewTest()
    resetStats(false)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] flex justify-center items-center font-sans" style={{ color: 'var(--text-primary)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--color-primary)' }} />
          <p className="text-sm font-semibold tracking-wide">Initializing Official Exam Environment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] p-4 md:p-8 font-sans flex justify-center w-full">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        
        {/* Navigation back button for start & result screens */}
        {(!hasStarted || isFinished) && (
          <Link to="/test-preparations" className="flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={14} /> Back to Test Preparations
          </Link>
        )}

        {/* Start Header (for start screen) */}
        {!hasStarted && !isFinished && (
          <div className="text-center mb-4 border-b pb-6" style={{ borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 mx-auto rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-lg mb-3">AB</div>
            <h1 className="text-2xl md:text-3xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>{activeTest.title}</h1>
            <h2 className="text-lg md:text-xl font-bold mb-1 text-blue-500">{activeTest.category} {activeTest.course}</h2>
            {activeTest.caseNo && <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{activeTest.caseNo} • Official Syllabus and Format</p>}
          </div>
        )}

        {/* Modular Screen Switcher */}
        {!hasStarted && !isFinished ? (
          <MotionPage>
            <FPSCStartScreen 
              activeTest={activeTest} 
              totalQuestions={TOTAL_QUESTIONS} 
              onLaunch={() => {
                setTimeLeft(activeTest.duration)
                setHasStarted(true)
              }} 
            />
          </MotionPage>
        ) : isFinished ? (
          <MotionPage>
            <FPSCResultsScreen 
              activeTest={activeTest} 
              totalQuestions={TOTAL_QUESTIONS} 
              correctAnswers={correctAnswers} 
              wrongAnswers={wrongAnswers} 
              skippedAnswers={skippedAnswers} 
              sectionScores={sectionScores} 
              timeLeft={timeLeft} 
              onRetake={handleStartNewTest} 
            />
          </MotionPage>
        ) : (
          <FPSCActiveExamScreen 
            activeTest={activeTest} 
            questions={questions} 
            currentQuestionIndex={currentQuestionIndex} 
            selectedOption={selectedOption} 
            isAnswered={isAnswered} 
            timeLeft={timeLeft} 
            sectionScores={sectionScores} 
            totalQuestions={TOTAL_QUESTIONS} 
            onOptionClick={handleOptionClick} 
            onSkip={handleSkip} 
            onAdvance={advanceToNext} 
            onEndExam={() => setIsFinished(true)} 
          />
        )}

      </div>
    </div>
  )
}
