export const weeklyStudyData = [
  { day: 'Mon', hours: 2.5, target: 3 },
  { day: 'Tue', hours: 3.8, target: 3 },
  { day: 'Wed', hours: 1.2, target: 3 },
  { day: 'Thu', hours: 4.0, target: 3 },
  { day: 'Fri', hours: 3.2, target: 3 },
  { day: 'Sat', hours: 5.1, target: 3 },
  { day: 'Sun', hours: 2.0, target: 3 },
]

export const monthlyProgressData = [
  { month: 'Jan', completed: 12, enrolled: 15 },
  { month: 'Feb', completed: 18, enrolled: 20 },
  { month: 'Mar', completed: 25, enrolled: 28 },
  { month: 'Apr', completed: 30, enrolled: 33 },
  { month: 'May', completed: 38, enrolled: 42 },
]

export const studentEngagementData = [
  { month: 'Jan', active: 420, new: 80 },
  { month: 'Feb', active: 510, new: 120 },
  { month: 'Mar', active: 680, new: 95 },
  { month: 'Apr', active: 740, new: 150 },
  { month: 'May', active: 890, new: 200 },
]

export const courseCompletionData = [
  { name: 'React Masterclass', value: 68, fill: '#6366f1' },
  { name: 'ML with Python', value: 32, fill: '#8b5cf6' },
  { name: 'UI/UX Design', value: 85, fill: '#10b981' },
]

export const adminMetrics = {
  totalUsers: 4821,
  activeUsers: 3102,
  totalCourses: 148,
  completionRate: 72,
  monthlyRevenue: 48250,
  avgScore: 84,
}

export const userGrowthData = [
  { month: 'Jan', students: 320, instructors: 18 },
  { month: 'Feb', students: 480, instructors: 22 },
  { month: 'Mar', students: 650, instructors: 28 },
  { month: 'Apr', students: 820, instructors: 35 },
  { month: 'May', students: 1100, instructors: 42 },
]

export const heatmapData = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 12 }, (_, col) => ({
    row, col,
    value: Math.floor(Math.random() * 5),
  }))
).flat()
