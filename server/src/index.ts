import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import examRoutes from './routes/exam.routes.js'
import { initDb } from './db/init.js'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173').split(',')

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "https://images.unsplash.com", "data:", "blob:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'", "https://www.youtube.com"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}))

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(compression())

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please try again in 15 minutes.' },
})

app.use(generalLimiter)
app.use('/api/auth/login', authLimiter)
app.use('/api/auth/signup', authLimiter)

app.use('/api/auth', authRoutes)
app.use('/api/exams', examRoutes)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

async function startServer() {
  try {
    await initDb()
    app.listen(PORT, () => {
      console.log(`[PrepPro Server] running on port ${PORT}`)
    })
  } catch (err) {
    process.exit(1)
  }
}

startServer()
