import type { ExamSection, ExamTestData } from '@/data/examRegistry'

export type ExamQuestionRow = {
  id: number
  sectionId: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export function hashStringToInt(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function seedShuffle<T>(items: T[], seed: string | number): T[] {
  const seedValue = typeof seed === 'number' ? seed : hashStringToInt(String(seed))
  const shuffled = [...items]
  let remaining = shuffled.length
  let tempSeed = seedValue * 15485863

  const random = () => {
    tempSeed = (tempSeed * 9301 + 49297) % 233280
    return tempSeed / 233280
  }

  while (remaining) {
    const index = Math.floor(random() * remaining--)
    const value = shuffled[remaining]
    shuffled[remaining] = shuffled[index]
    shuffled[index] = value
  }

  return shuffled
}

export function normalizeExamTitle(value?: string | null) {
  return (value || 'System Analyst')
    .replace(/Mock Exam/gi, '')
    .replace(/Proctored Simulation/gi, '')
    .replace(/Simulation/gi, '')
    .replace(/Mock/gi, '')
    .trim()
}

function buildSectionStudyTip(sectionId: string) {
  if (sectionId === 'part-i') {
    return 'Focus on grammar, vocabulary, prepositions, mixed conditionals, and subjunctive mood.'
  }
  if (sectionId === 'part-ii-gi') {
    return 'Brush up on arithmetic, general knowledge, current affairs, and constitutional amendments.'
  }
  if (sectionId === 'part-iii-cs') {
    return 'Review programming concepts, OS, DBMS, networking, software engineering, and DSA.'
  }
  return 'Review standard syllabus and past papers.'
}

export function mapExamSections(sections: any[], questions: any[]): ExamSection[] {
  return sections.map((section) => {
    const sectionQuestions = questions.filter((question) => question.section_id === section.id)

    return {
      id: section.id,
      name: section.name,
      questions: sectionQuestions.map((question) => [
        question.question_text,
        question.options,
        question.correct_answer_index,
        question.explanation,
      ]),
      studyTip: buildSectionStudyTip(section.id),
    }
  })
}

export function buildDynamicExam(data: any): ExamTestData & { negativeMarking: number } {
  return {
    id: data.exam.id,
    title: data.exam.title,
    caseNo: data.exam.case_no || '',
    category: data.exam.category,
    course: data.exam.course,
    duration: data.exam.duration,
    passingScore: data.exam.passing_score || 50,
    attemptsAllowed: 'Unlimited',
    sections: mapExamSections(data.sections || [], data.questions || []),
    negativeMarking: data.exam.negative_marking ?? 0.25,
  }
}

export function mapExamQuestions(questions: any[]): ExamQuestionRow[] {
  return questions.map((question) => ({
    id: question.id,
    sectionId: question.section_id,
    question: question.question_text,
    options: question.options,
    answer: question.correct_answer_index,
    explanation: question.explanation,
  }))
}
