import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

// Primary pool configured to connect directly to the targeted LMS database
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Nikokovac',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ab_initio_lms',
  max: 20, // Limit maximum connections to avoid exhausting Postgres resources
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
})

// Secondary connection pool pointing to default 'postgres' database (used to check and auto-create target database if needed)
export const systemPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Nikokovac',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: 'postgres'
})
