export async function fetchExamQuestions(examDbId: string) {
  const response = await fetch(`/api/exams/${examDbId}/questions`, { credentials: 'include' })
  if (!response.ok) throw new Error('Failed to fetch exam')
  return response.json()
}

export async function startExamAttempt(examDbId: string, remainingTime: number) {
  const response = await fetch(`/api/exams/${examDbId}/start-attempt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ remainingTime }),
  })
  if (!response.ok) throw new Error('Could not start exam attempt')
  return response.json()
}

export async function saveExamAnswer(attemptId: number, questionId: number, selectedOptionIndex: number, remainingTime: number) {
  return fetch(`/api/exams/attempts/${attemptId}/save-answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ questionId, selectedOptionIndex, remainingTime }),
  })
}

export async function submitExamAttempt(attemptId: number, timeSpent: number) {
  const response = await fetch(`/api/exams/attempts/${attemptId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ timeSpent }),
  })
  if (!response.ok) throw new Error('Could not submit exam attempt')
  return response.json()
}
