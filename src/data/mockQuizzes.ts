export interface QuizQuestion {
  id: string
  question: string
  type: 'mcq' | 'truefalse'
  options: string[]
  correct: number
  explanation?: string
}

export interface Quiz {
  id: string
  title: string
  course: string
  duration: number // in seconds
  totalQuestions: number
  passingScore: number
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  attemptsAllowed: number
  questions: QuizQuestion[]
}

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'FPSC General Ability Test',
    course: 'Federal Public Service Commission',
    duration: 900, // 15 mins
    totalQuestions: 5,
    passingScore: 80,
    category: 'FPSC',
    difficulty: 'Medium',
    attemptsAllowed: 3,
    questions: [
      { 
        id: 'qq1', 
        question: 'Which of the following is the capital of Pakistan?', 
        type: 'mcq', 
        options: ['Karachi', 'Islamabad', 'Lahore', 'Peshawar'], 
        correct: 1,
        explanation: 'Islamabad is the capital of Pakistan.'
      },
      { 
        id: 'qq2', 
        question: 'The United Nations was founded in 1945.', 
        type: 'truefalse', 
        options: ['True', 'False'], 
        correct: 0,
        explanation: 'The United Nations was founded on October 24, 1945.'
      },
      { 
        id: 'qq3', 
        question: 'What is the standard currency of Pakistan?', 
        type: 'mcq', 
        options: ['Dollar', 'Euro', 'Rupee', 'Yen'], 
        correct: 2,
        explanation: 'The Pakistani Rupee is the official currency.'
      },
      { 
        id: 'qq4', 
        question: 'K2 is the highest peak in the world.', 
        type: 'truefalse', 
        options: ['True', 'False'], 
        correct: 1,
        explanation: 'Mount Everest is the highest; K2 is the second highest.'
      },
      { 
        id: 'qq5', 
        question: 'Who was the founder of Pakistan?', 
        type: 'mcq', 
        options: ['Allama Iqbal', 'Liaquat Ali Khan', 'Muhammad Ali Jinnah', 'Sir Syed Ahmad Khan'], 
        correct: 2,
        explanation: 'Quaid-e-Azam Muhammad Ali Jinnah is the founder of Pakistan.'
      },
    ],
  },
  {
    id: 'q2',
    title: 'PPSC Pakistan Studies & GK',
    course: 'Punjab Public Service Commission',
    duration: 1200, // 20 mins
    totalQuestions: 4,
    passingScore: 75,
    category: 'PPSC',
    difficulty: 'Hard',
    attemptsAllowed: 2,
    questions: [
      { 
        id: 'ml1', 
        question: 'Which is the largest province of Pakistan by population?', 
        type: 'mcq', 
        options: ['Sindh', 'Punjab', 'KPK', 'Balochistan'], 
        correct: 1,
        explanation: 'Punjab is the most populated province of Pakistan.'
      },
      { 
        id: 'ml2', 
        question: 'The Shalimar Gardens were built by Emperor Shah Jahan.', 
        type: 'truefalse', 
        options: ['True', 'False'], 
        correct: 0,
        explanation: 'Shalimar Gardens in Lahore were built by Mughal Emperor Shah Jahan in 1642.'
      },
      { 
        id: 'ml3', 
        question: 'Who is the current national poet of Pakistan?', 
        type: 'mcq', 
        options: ['Faiz Ahmad Faiz', 'Allama Iqbal', 'Habib Jalib', 'Ahmad Faraz'], 
        correct: 1,
        explanation: 'Allama Muhammad Iqbal is the national poet of Pakistan.'
      },
      { 
        id: 'ml4', 
        question: 'The Ravi River flows through Lahore.', 
        type: 'truefalse', 
        options: ['True', 'False'], 
        correct: 0,
        explanation: 'The River Ravi flows along the northern border of Lahore.'
      },
    ],
  },
  {
    id: 'q3',
    title: 'SPSC General Knowledge & History',
    course: 'Sindh Public Service Commission',
    duration: 900,
    totalQuestions: 2,
    passingScore: 70,
    category: 'SPSC',
    difficulty: 'Easy',
    attemptsAllowed: 3,
    questions: [
      { 
        id: 'sp1', 
        question: 'Which historical site is located in Larkana, Sindh?', 
        type: 'mcq', 
        options: ['Mohenjo-daro', 'Harappa', 'Taxila', 'Rohtas Fort'], 
        correct: 0,
        explanation: 'Mohenjo-daro is an archaeological site in Sindh built around 2500 BCE.'
      },
      { 
        id: 'sp2', 
        question: 'Karachi is the capital city of Sindh province.', 
        type: 'truefalse', 
        options: ['True', 'False'], 
        correct: 0,
        explanation: 'Karachi is the capital of Sindh and the largest city of Pakistan.'
      },
    ],
  },
  {
    id: 'q4',
    title: 'BPSC Balochistan Geography Test',
    course: 'Balochistan Public Service Commission',
    duration: 900,
    totalQuestions: 2,
    passingScore: 70,
    category: 'BPSC',
    difficulty: 'Medium',
    attemptsAllowed: 3,
    questions: [
      { 
        id: 'bp1', 
        question: 'Which deep-sea port is located in Balochistan?', 
        type: 'mcq', 
        options: ['Karachi Port', 'Port Qasim', 'Gwadar Port', 'Keti Bandar'], 
        correct: 2,
        explanation: 'Gwadar Port is a warm-water, deep-sea port situated on the Arabian Sea at Gwadar in Balochistan.'
      },
      { 
        id: 'bp2', 
        question: 'Balochistan is the largest province of Pakistan by land area.', 
        type: 'truefalse', 
        options: ['True', 'False'], 
        correct: 0,
        explanation: 'Balochistan makes up approximately 44% of Pakistan\'s total land area.'
      },
    ],
  }
]

export const mockCertificates = [
  { id: 'cert1', title: 'UI/UX Design Systems 2026', issueDate: '2026-04-28', instructor: 'Emma Williams', credentialId: 'AB-2026-UX-001', badge: '🎨' },
  { id: 'cert2', title: 'Web Fundamentals', issueDate: '2026-02-14', instructor: 'James Park', credentialId: 'AB-2026-WF-042', badge: '🌐' },
  { id: 'cert3', title: 'Intro to Python', issueDate: '2025-12-01', instructor: 'Dr. Anika Sharma', credentialId: 'AB-2025-PY-118', badge: '🐍' },
]

export const mockNotifications = [
  { id: 'n1', type: 'assignment', message: 'New assignment posted in React Masterclass', time: '5m ago', read: false },
  { id: 'n2', type: 'grade', message: 'Your Design System assignment was graded: 94/100', time: '2h ago', read: false },
  { id: 'n3', type: 'message', message: 'Dr. Sarah Chen sent you a message', time: '3h ago', read: true },
  { id: 'n4', type: 'course', message: 'New lesson available in ML with Python', time: '1d ago', read: true },
]
