import { Request, Response, NextFunction as next } from 'express'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

const verifyAuthToken = (req: Request, res: Response, next: next): boolean | void => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}
export default verifyAuthToken
