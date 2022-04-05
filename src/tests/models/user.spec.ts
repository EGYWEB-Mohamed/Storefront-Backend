import { User } from '../../models/user'
import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import app from '../../index'
import client from '../../database'
import dotenv from 'dotenv'
import { UserType } from '../../utilities/Types'
dotenv.config()

const user = new User()
// create a request object
const request = supertest(app)
const DummyData = {
  username: 'Test User Name',
  password: '123456',
  fullname: 'Mohamed Saied - Test Env'
}

describe('User Model', () => {
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE users RESTART IDENTITY CASCADE;')
    conn.release()
  })
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE users RESTART IDENTITY CASCADE;')
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
    const tempToken = jwt.sign({ user: DummyData }, process.env.TOKEN_SECRET as string)

    it('/api/users | All Users', async () => {
      const response = await request.get('/api/users').set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
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
      expect(response.body).toEqual({})
    })
  })
  describe('Test User Model Methods Functionality', () => {
    const user = new User()
    it('Method Index', async () => {
      const result = await user.index()
      expect(result).toEqual([])
    })
    it('Method Create', async () => {
      const result = await user.create(DummyData)
      expect(result.username).toBe(DummyData.username)
      expect(result.fullname).toBe(DummyData.fullname)
    })
    it('Method Show', async () => {
      const result = await user.show(2)
      expect(result.username).toBe(DummyData.username)
      expect(result.fullname).toBe(DummyData.fullname)
    })
    it('Method Update', async () => {
      const result = await user.update({
        id: 2,
        username: 'Test User',
        password: '123456',
        fullname: 'Mohamed'
      })
      expect(result.username).toBe('Test User')
      expect(result.fullname).toBe('Mohamed')
    })
    it('Method Delete', async () => {
      const result = await user.delete(2)
      expect(result).toBe('User Deleted Successfully')
    })
  })
})
