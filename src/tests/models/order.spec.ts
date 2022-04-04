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
      product_id: 1,
      quantity: 2,
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

    user.create(DummyUserData)
    product.create(DummyProductData)

    it('/api/orders | All Orders', async () => {
      const response = await request.get('/api/orders').set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/orders | Create Orders', async () => {
      const response = await request
        .post('/api/orders')
        .send(DummyOrderData)
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/orders/:id | Show Order', async () => {
      const response = await request
        .get('/api/orders/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.product_id).toEqual(1)
      expect(response.body.title).toBe('Product Title')
      expect(parseFloat(response.body.unit_price)).toEqual(5.5)
      expect(response.body.user_id).toEqual(1)
      expect(response.body.fullname).toBe('Mohamed Saied - Test Env')
      expect(response.body.quantity).toEqual(2)
      expect(parseFloat(response.body.total_price)).toEqual(11.0)
    })
    it('/api/orders/:id | Update Order', async () => {
      const response = await request
        .put('/api/orders/1')
        .send({
          product_id: 1,
          quantity: 5,
          user_id: 1
        })
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.quantity).toEqual(5)
      expect(parseFloat(response.body.total_price)).toEqual(27.5)
    })
    it('/api/orders/:id | Delete Order', async () => {
      const response = await request
        .delete('/api/orders/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
  })
})
