import express, { Request, Response } from 'express'
import { User, UserType } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/jwt'
const user = new User()
const indexUser = async (req: Request, res: Response) => {
  const data = await user.index()
  res.json(data)
}
const showUser = async (req: Request, res: Response) => {
  const data = await user.show(parseInt(req.params.id))
  res.json(data)
}
const createUser = async (req: Request, res: Response) => {
  const dataBody: UserType = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname
  }
  const data = await user.create(dataBody)
  var token = jwt.sign({ user: data }, process.env.TOKEN_SECRET as string)
  res.send(token)
}
const updateUser = async (req: Request, res: Response) => {
  const dataBody: UserType = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname
  }
  const data = await user.create(dataBody)
  var token = jwt.sign({ user: data }, process.env.TOKEN_SECRET as string)
  res.send(token)
}
const deleteUser = async (req: Request, res: Response) => {
  const data = await user.delete(parseInt(req.params.id))
  res.send(data)
}
const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, indexUser)
  app.get('/users/:id', verifyAuthToken, showUser)
  app.post('/users', createUser)
  app.put('/users/:id', updateUser)
  app.delete('/users/:id', verifyAuthToken, deleteUser)
}
export default user_routes
