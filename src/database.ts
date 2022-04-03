import dotenv from 'dotenv'
import { Pool } from 'pg'
dotenv.config()
const {
  POSTGRES_HOST,
  POSTGRES_DB_NAME,
  POSTGRES_TEST_DB_NAME,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD
} = process.env
const client = new Pool({
  host: POSTGRES_HOST,
  database: process.env.ConnectionType === 'dev' ? POSTGRES_DB_NAME : POSTGRES_TEST_DB_NAME,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD
})
export default client
