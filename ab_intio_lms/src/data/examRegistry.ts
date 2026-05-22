export interface ExamQuestion {
  id: number
  sectionId: string
  category: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface ExamSection {
  id: string
  name: string
  questions: [string, string[], number, string][]
  studyTip: string
}

export interface ExamTestData {
  id: string
  title: string
  caseNo: string
  category: string
  course: string
  duration: number // in seconds
  passingScore: number // percentage
  attemptsAllowed: number | string
  sections: ExamSection[]
}
