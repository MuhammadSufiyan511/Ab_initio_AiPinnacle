export interface Course {
  id: string
  title: string
  instructor: string
  category: string
  thumbnail: string
  duration: string
  rating: number
  students: number
  price: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  progress?: number
  description: string
  tags: string[]
}

export const CATEGORIES = ['All', 'Data Science', 'Web Dev', 'Design', 'AI/ML', 'Cloud', 'Security', 'Mobile']

export const mockCourses: Course[] = [
  { id: 'c1', title: 'Modern React & TypeScript Masterclass', instructor: 'Dr. Sarah Chen', category: 'Web Dev', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', duration: '42h', rating: 4.9, students: 18420, price: 89, level: 'Intermediate', progress: 68, description: 'Build production-grade React apps with TypeScript, Hooks, and modern patterns.', tags: ['React', 'TypeScript', 'Hooks'] },
  { id: 'c2', title: 'Machine Learning with Python & TensorFlow', instructor: 'Prof. Raj Patel', category: 'AI/ML', thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400', duration: '56h', rating: 4.8, students: 24100, price: 119, level: 'Advanced', progress: 32, description: 'From fundamentals to deep neural networks, covering real-world ML pipelines.', tags: ['Python', 'TensorFlow', 'Neural Networks'] },
  { id: 'c3', title: 'UI/UX Design Systems 2026', instructor: 'Emma Williams', category: 'Design', thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', duration: '28h', rating: 4.7, students: 9830, price: 69, level: 'Beginner', progress: 85, description: 'Create scalable design systems with Figma, tokens, and component libraries.', tags: ['Figma', 'Design Systems', 'Tokens'] },
  { id: 'c4', title: 'Cloud Architecture on AWS', instructor: 'Michael Torres', category: 'Cloud', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', duration: '38h', rating: 4.6, students: 12400, price: 99, level: 'Intermediate', description: 'Architect scalable, secure AWS solutions with best practices.', tags: ['AWS', 'Cloud', 'Architecture'] },
  { id: 'c5', title: 'Data Science & Analytics Bootcamp', instructor: 'Dr. Anika Sharma', category: 'Data Science', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', duration: '64h', rating: 4.9, students: 31000, price: 129, level: 'Beginner', description: 'Complete data science journey from pandas to advanced analytics.', tags: ['Python', 'Pandas', 'Visualization'] },
  { id: 'c6', title: 'Flutter & Dart Mobile Development', instructor: 'Lucas Ferreira', category: 'Mobile', thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', duration: '33h', rating: 4.7, students: 7200, price: 79, level: 'Intermediate', description: 'Build cross-platform mobile apps with Flutter and publish to stores.', tags: ['Flutter', 'Dart', 'iOS', 'Android'] },
]

export const mockModules = [
  { id: 'm1', title: 'Getting Started', lessons: [{ id: 'l1', title: 'Introduction & Setup', duration: '8:30', completed: true }, { id: 'l2', title: 'Core Concepts', duration: '14:20', completed: true }, { id: 'l3', title: 'Your First Project', duration: '22:10', completed: false }] },
  { id: 'm2', title: 'Deep Dive', lessons: [{ id: 'l4', title: 'Advanced Patterns', duration: '18:45', completed: false }, { id: 'l5', title: 'Performance Optimization', duration: '25:00', completed: false }] },
  { id: 'm3', title: 'Real-World Projects', lessons: [{ id: 'l6', title: 'Project Planning', duration: '12:00', completed: false }, { id: 'l7', title: 'Building & Testing', duration: '30:15', completed: false }] },
]
