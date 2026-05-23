import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const DB_PASSWORD = process.env.DB_PASSWORD
if (!DB_PASSWORD) {
  throw new Error('FATAL: DB_PASSWORD environment variable is required.')
}

// Primary pool configured to connect directly to the targeted LMS database
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ab_initio_lms',
  max: 20,
  idleTimeoutMillis: 30000,
})

// Secondary connection pool pointing to default 'postgres' database
export const systemPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: 'postgres',
})
