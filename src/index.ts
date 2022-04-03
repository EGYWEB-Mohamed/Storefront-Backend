import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import user_routes from './handler/user'
import * as bcrypt from 'bcrypt'
import bodyParser from 'body-parser'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
app.use(bodyParser.json())
// HTTP request logger middleware
app.use(morgan('short'))
// add routing for / path
user_routes(app)
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
