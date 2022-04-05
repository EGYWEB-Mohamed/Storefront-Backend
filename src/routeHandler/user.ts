import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { UserType } from '../utilities/Types'
import { LoginType } from '../utilities/Types'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/jwt'
import { LoginValidator, userValidator } from '../utilities/Validations'

const user = new User()
const indexUser = async (req: Request, res: Response) => {
  try {
    const results = await user.index()
    res.json(results)
  } catch (error) {
    res.send(error)
  }
}
const showUser = async (req: Request, res: Response) => {
  try {
    const results = await user.show(parseInt(req.params.id))
    if (results) {
      res.json(results)
    } else {
      res.json('Empty')
    }
  } catch (error) {
    res.send(error)
  }
}
const createUser = async (req: Request, res: Response) => {
  try {
    const validate = await userValidator(req.body)
    if (typeof validate == 'boolean') {
      const dataBody: UserType = {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname
      }
      const results = await user.create(dataBody)
      const token = jwt.sign({ user: results }, process.env.TOKEN_SECRET as string)
      res.send(token)
    } else {
      res.status(400).json(validate)
    }
  } catch (error) {
    res.send(error)
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const validate = await userValidator(req.body)
    if (typeof validate == 'boolean') {
      const dataBody: UserType = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname
      }
      const results = await user.update(dataBody)
      if (results) {
        const token = jwt.sign({ user: results }, process.env.TOKEN_SECRET as string)
        res.send(token)
      } else {
        res.json('Account Not Found ')
        return
      }
    } else {
      res.status(400).json(validate)
    }
  } catch (error) {
    res.send(error)
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const results = await user.delete(parseInt(req.params.id))
    res.send(results)
  } catch (error) {
    res.send(error)
  }
}
const loginUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.send(error)
  }
}
const user_routes = (app: express.Application) => {
  app.get('/api/users', verifyAuthToken, indexUser)
  app.get('/api/users/:id', verifyAuthToken, showUser)
  app.post('/api/users', verifyAuthToken, createUser)
  app.put('/api/users/:id', verifyAuthToken, updateUser)
  app.delete('/api/users/:id', verifyAuthToken, deleteUser)

  app.post('/api/login', loginUser)
  app.post('/api/register', createUser)
}
export default user_routes
