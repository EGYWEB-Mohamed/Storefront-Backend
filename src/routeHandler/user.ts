import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { UserType } from '../utilities/Types'
import { LoginType } from '../utilities/Types'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/jwt'
import { LoginValidator, userValidator } from '../utilities/Validations'

const user = new User()
const indexUser = async (req: Request, res: Response) => {
  const results = await user.index()
  res.json(results)
}
const showUser = async (req: Request, res: Response) => {
  const results = await user.show(parseInt(req.params.id))
  res.json(results)
}
const createUser = async (req: Request, res: Response) => {
  const validate = await userValidator(req.body)
  if (typeof validate == 'boolean') {
    const dataBody: UserType = {
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname
    }
    const results = await user.create(dataBody)
    var token = jwt.sign({ user: results }, process.env.TOKEN_SECRET as string)
    res.send(token)
  } else {
    res.status(400).json(validate)
  }
}
const updateUser = async (req: Request, res: Response) => {
  const validate = await userValidator(req.body)
  if (typeof validate == 'boolean') {
    const dataBody: UserType = {
      id: parseInt(req.params.id),
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname
    }
    const results = await user.update(dataBody)
    var token = jwt.sign({ user: results }, process.env.TOKEN_SECRET as string)
    res.send(token)
  } else {
    res.status(400).json(validate)
  }
}
const deleteUser = async (req: Request, res: Response) => {
  const results = await user.delete(parseInt(req.params.id))
  res.send(results)
}
const loginUser = async (req: Request, res: Response) => {
  const validate = await LoginValidator(req.body)
  if (typeof validate == 'boolean') {
    const ParmsLogin: LoginType = {
      username: req.body.username,
      password: req.body.password
    }
    const results = await user.login(ParmsLogin)
    if (results) {
      res.json({
        token: jwt.sign({ user: results }, process.env.TOKEN_SECRET as string),
        user: results
      })
    } else {
      res.status(401)
      res.json('Account Not Found')
      return
    }
  } else {
    res.status(400).json(validate)
  }
}
const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, indexUser)
  app.get('/users/:id', verifyAuthToken, showUser)
  app.post('/users', verifyAuthToken, createUser)
  app.put('/users/:id', verifyAuthToken, updateUser)
  app.delete('/users/:id', verifyAuthToken, deleteUser)

  app.post('/login', loginUser)
  app.post('/register', createUser)
}
export default user_routes
