import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import examRoutes from './routes/exam.routes.js'
import { initDb } from './db/init.js'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use(compression())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/exams', examRoutes)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Express global error:', err.message)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

async function startServer() {
  try {
    await initDb()
    app.listen(PORT, () => {
      console.log(`[PrepPro Server] running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to initialize server:', err)
    process.exit(1)
  }
}

startServer()
