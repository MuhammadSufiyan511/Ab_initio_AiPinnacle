import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db/pool.js'
import { AuthenticatedRequest } from '../middleware/auth.js'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_key_ab_initio_lms_2026'
const ONE_DAY = 24 * 60 * 60 * 1000

function generateToken(user: { id: string; name: string; email: string }) {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1d' })
}

export async function signup(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email, and password are required.' })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address format.' })
    return
  }

  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters long.' })
    return
  }

  try {
    const existing = await pool.query('SELECT 1 FROM users WHERE email = $1', [email.toLowerCase()])
    if (existing.rowCount && existing.rowCount > 0) {
      res.status(400).json({ error: 'Email is already registered. Please sign in instead.' })
      return
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const insertRes = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, avatar, bio',
      [name, email.toLowerCase(), passwordHash]
    )

    const newUser = insertRes.rows[0]
    const token = generateToken({ id: newUser.id, name: newUser.name, email: newUser.email })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ONE_DAY
    })

    res.status(201).json({ user: newUser })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Internal server error during registration.' })
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address format.' })
    return
  }

  try {
    const userRes = await pool.query('SELECT id, name, email, password_hash, avatar, bio FROM users WHERE email = $1', [email.toLowerCase()])
    if (userRes.rowCount === 0) {
      res.status(400).json({ error: 'No account found with this email.' })
      return
    }

    const user = userRes.rows[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      res.status(400).json({ error: 'Incorrect password. Please try again.' })
      return
    }

    const token = generateToken({ id: user.id, name: user.name, email: user.email })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ONE_DAY
    })

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio
      }
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Internal server error during sign-in.' })
  }
}

export function logout(req: Request, res: Response): void {
  res.clearCookie('token')
  res.json({ message: 'Successfully signed out.' })
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  try {
    const userRes = await pool.query('SELECT id, name, email, avatar, bio FROM users WHERE id = $1', [authReq.user.id])
    if (userRes.rowCount === 0) {
      res.status(404).json({ error: 'User not found.' })
      return
    }
    res.json({ user: userRes.rows[0] })
  } catch (err) {
    console.error('Get profile error:', err)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  const { name, email, avatar, bio } = req.body

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required.' })
    return
  }

  if (avatar) {
    const base64Data = avatar.includes(',') ? avatar.split(',')[1] : avatar
    const sizeInBytes = base64Data.length * 0.75
    if (sizeInBytes > 100 * 1024) {
      res.status(400).json({ error: 'Profile picture must be under 100KB.' })
      return
    }
  }

  try {
    // Check if new email is already taken by another user
    const existing = await pool.query('SELECT 1 FROM users WHERE email = $1 AND id != $2', [email.toLowerCase(), authReq.user.id])
    if (existing.rowCount && existing.rowCount > 0) {
      res.status(400).json({ error: 'Email is already registered by another account.' })
      return
    }

    const updateRes = await pool.query(
      'UPDATE users SET name = $1, email = $2, avatar = $3, bio = $4 WHERE id = $5 RETURNING id, name, email, avatar, bio',
      [name, email.toLowerCase(), avatar, bio, authReq.user.id]
    )

    if (updateRes.rowCount === 0) {
      res.status(404).json({ error: 'User not found.' })
      return
    }

    const updatedUser = updateRes.rows[0]
    res.json({ user: updatedUser })
  } catch (err) {
    console.error('Update profile error:', err)
    res.status(500).json({ error: 'Internal server error during profile update.' })
  }
}
