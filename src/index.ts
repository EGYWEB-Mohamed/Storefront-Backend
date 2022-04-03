import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import user_routes from './routeHandler/user'
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
  console.log(`Server Work On 127.0.0.1:${PORT}`)
})

export default app
