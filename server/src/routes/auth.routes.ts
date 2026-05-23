import { Router } from 'express'
import { signup, login, logout, getProfile, updateProfile } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)

export default router
