import { User } from '../../models/user'
import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import app from '../../index'
import client from '../../database'
import dotenv from 'dotenv'
dotenv.config()

const user = new User()
// create a request object
const request = supertest(app)

describe('User Model', () => {
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(
      'TRUNCATE order_Products RESTART IDENTITY CASCADE;TRUNCATE users RESTART IDENTITY CASCADE;TRUNCATE products RESTART IDENTITY CASCADE;TRUNCATE order_products RESTART IDENTITY CASCADE;'
    )
    conn.release()
  })

  describe('Model Methods Check', () => {
    it('User Index Defined', () => {
      expect(user.index).toBeDefined()
    })
    it('User Create Defined', () => {
      expect(user.create).toBeDefined()
    })
    it('User Update Defined', () => {
      expect(user.update).toBeDefined()
    })
    it('User Show Defined', () => {
      expect(user.show).toBeDefined()
    })
    it('User Delete Defined', () => {
      expect(user.delete).toBeDefined()
    })
    it('User Login Defined', () => {
      expect(user.login).toBeDefined()
    })
  })
  describe('Check Endpoint *API* Access And Functionally', () => {
    const DummyData = {
      username: 'Test User Name',
      password: '123456',
      fullname: 'Mohamed Saied - Test Env'
    }

    const tempToken = jwt.sign({ user: DummyData }, process.env.TOKEN_SECRET as string)

    it('/api/users | All Users', async () => {
      const response = await request.get('/api/users').set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/users | Create User', async () => {
      const response = await request
        .post('/api/users')
        .send(DummyData)
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/users/:id | Show User', async () => {
      const response = await request.get('/api/users/1').set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.username).toBe('Test User Name')
      expect(response.body.fullname).toBe('Mohamed Saied - Test Env')
    })
    it('/api/users/:id | Update User', async () => {
      const response = await request
        .put('/api/users/1')
        .send({
          username: 'Test Name',
          password: '123456',
          fullname: 'Mohamed'
        })
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/users/:id | Delete User', async () => {
      const response = await request
        .delete('/api/users/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
  })
})
