import { Router } from 'express'
import { getExams, getExamQuestions, startExamAttempt, saveAttemptAnswer, submitExamAttempt, getExamResults, getUserExamHistory, getActiveExamAttempts } from '../controllers/exam.controller.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.use(authMiddleware)

router.get('/', getExams)
router.get('/history', getUserExamHistory)
router.get('/active-attempts', getActiveExamAttempts)
router.get('/:id/questions', getExamQuestions)
router.post('/:id/start-attempt', startExamAttempt)
router.post('/attempts/:attemptId/save-answer', saveAttemptAnswer)
router.post('/attempts/:attemptId/submit', submitExamAttempt)
router.get('/attempts/:attemptId/results', getExamResults)

export default router
