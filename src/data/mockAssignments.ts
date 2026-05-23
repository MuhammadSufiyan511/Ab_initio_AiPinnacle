export interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded' | 'late'
  grade?: number
  maxGrade: number
  description: string
  attachments: number
}

export const mockAssignments: Assignment[] = [
  { id: 'a1', title: 'React Hooks Deep Dive Report', course: 'Modern React & TypeScript', dueDate: '2026-05-22', status: 'pending', maxGrade: 100, description: 'Write a comprehensive report on React hooks including useCallback, useMemo, and custom hooks.', attachments: 0 },
  { id: 'a2', title: 'Neural Network Implementation', course: 'Machine Learning with Python', dueDate: '2026-05-18', status: 'submitted', maxGrade: 100, description: 'Implement a feedforward neural network from scratch using NumPy.', attachments: 2 },
  { id: 'a3', title: 'Design System Component Library', course: 'UI/UX Design Systems 2026', dueDate: '2026-05-15', status: 'graded', grade: 94, maxGrade: 100, description: 'Build a complete Figma component library with at least 30 components.', attachments: 3 },
  { id: 'a4', title: 'AWS Architecture Diagram', course: 'Cloud Architecture on AWS', dueDate: '2026-05-10', status: 'late', maxGrade: 80, description: 'Design a fault-tolerant, auto-scaling web application architecture on AWS.', attachments: 0 },
  { id: 'a5', title: 'EDA on Real Dataset', course: 'Data Science & Analytics', dueDate: '2026-05-25', status: 'pending', maxGrade: 100, description: 'Perform exploratory data analysis on the provided dataset and present findings.', attachments: 0 },
]
