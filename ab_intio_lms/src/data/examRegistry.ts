import { rawEnglish, rawGeneral, rawProfessional } from './fpscSystemAnalyst'

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

export const examsData: Record<string, ExamTestData> = {
  'fpsc-system-analyst': {
    id: 'fpsc-system-analyst',
    title: 'FEDERAL PUBLIC SERVICE COMMISSION',
    caseNo: 'Case No. F.4-02/2026-R',
    category: 'FPSC',
    course: 'System Analyst (BS-18) Examination',
    duration: 200 * 60, // 200 Minutes
    passingScore: 40,
    attemptsAllowed: 'Unlimited',
    sections: [
      {
        id: 'english',
        name: 'Part I: English',
        questions: rawEnglish,
        studyTip: 'Focus on obscure vocabulary, prepositions, mixed conditionals, and subjunctive mood grammar rules.'
      },
      {
        id: 'general',
        name: 'Part I: General Intelligence',
        questions: rawGeneral,
        studyTip: 'Brush up on complex time/work arithmetic, basic algebraic logs, constitutional articles, and international current affairs.'
      },
      {
        id: 'professional',
        name: 'Part II: Professional Test',
        questions: rawProfessional,
        studyTip: 'Review Amdahl\'s Law speedups, pipeline hazard reduction (Tomasulo\'s), Database Normalization normal forms, operating system scheduling, and C++ OOP design patterns.'
      }
    ]
  }
}
