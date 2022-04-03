import { User, UserType } from '../../models/user'
import supertest from 'supertest'
import app from '../../index'

import dotenv from 'dotenv'
dotenv.config()

const user = new User()
// create a request object
const request = supertest(app)

describe('User Model', () => {
  describe('Model Methods Check', () => {
    it('User Index Defined', () => {
      expect(user.index).toBeDefined()
    })
    it('User Create Defined', () => {
      expect(user.create).toBeDefined()
    })
    it('User Show Defined', () => {
      expect(user.show).toBeDefined()
    })
    it('User Delete Defined', () => {
      expect(user.delete).toBeDefined()
    })
  })
  describe('End Point Check', () => {
    const DummyData = {
      username: 'Test User Name',
      password: '123456',
      fullname: 'Mohamed Saied - Test Env'
    }

    it('/users | All Users', async () => {
      const response = await request.get('/users')
      expect(response.status).toBe(200)
    })
    it('/users | Create User', async () => {
      const response = await request.post('/users').send(DummyData)
      expect(response.status).toBe(200)
    })

    it('/users/:id | Show User', async () => {
      const response = await request.get('/users/1')
      expect(response.status).toBe(200)
      expect(response.body.username).toBe('Test User Name')
      expect(response.body.fullname).toBe('Mohamed Saied - Test Env')
    })
  })
})
