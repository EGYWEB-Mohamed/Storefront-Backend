import { Order } from '../../models/order'
import supertest from 'supertest'
import app from '../../index'
import client from '../../database'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../../models/user'
import { Product } from '../../models/product'
import { OrderType } from '../../utilities/Types'
dotenv.config()

const order = new Order()
// create a request object
const request = supertest(app)

describe('Product Model', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE orders RESTART IDENTITY CASCADE;')
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE orders RESTART IDENTITY CASCADE;')
    conn.release()
  })

  describe('Model Methods Check', () => {
    it('Order Index Defined', () => {
      expect(order.index).toBeDefined()
    })
    it('Order Create Defined', () => {
      expect(order.create).toBeDefined()
    })
    it('Order Update Defined', () => {
      expect(order.update).toBeDefined()
    })
    it('Order Show Defined', () => {
      expect(order.show).toBeDefined()
    })
    it('Order Delete Defined', () => {
      expect(order.delete).toBeDefined()
    })
  })
  describe('Check Endpoint *API* Access And Functionally', () => {
    const DummyOrderData: OrderType = {
      status: 'active',
      user_id: 1
    }
    const DummyUserData = {
      username: 'Test User Name',
      password: '123456',
      fullname: 'Mohamed Saied - Test Env'
    }
    const DummyProductData = {
      title: 'Product Title',
      price: 5.5
    }
    const tempToken = jwt.sign({ user: DummyUserData }, process.env.TOKEN_SECRET as string)
    const user = new User()
    const product = new Product()
    beforeAll(async () => {
      await user.create(DummyUserData)
      await product.create(DummyProductData)
    })
    it('/api/orders | All Orders', async () => {
      const response = await request.get('/api/orders').set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
    it('/api/orders | Create Orders', async () => {
      const response = await request
        .post('/api/orders')
        .send(DummyOrderData)
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.status).toEqual(DummyOrderData.status)
      expect(response.body.user_id).toEqual(DummyOrderData.user_id)
    })
    it('/api/orders/:id | Show Order', async () => {
      const response = await request
        .get('/api/orders/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/orders/:id | Update Order', async () => {
      const response = await request
        .put('/api/orders/1')
        .send({
          status: 'complete',
          user_id: 1
        })
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.status).toBe('complete')
    })
    it('/api/orders/:id | Delete Order', async () => {
      const response = await request
        .delete('/api/orders/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({})
    })
  })
})
