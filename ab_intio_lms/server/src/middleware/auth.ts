import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_key_ab_initio_lms_2026'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    name: string
    email: string
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ error: 'Authentication required. No token found.' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; name: string; email: string }
    (req as AuthenticatedRequest).user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired session. Please sign in again.' })
    return
  }
}
