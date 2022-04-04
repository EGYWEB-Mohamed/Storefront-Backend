import { OrderProducts } from '../../models/order_products'
import supertest from 'supertest'
import app from '../../index'
import client from '../../database'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../../models/user'
import { Product } from '../../models/product'
import { OrderProductsType, OrderType, ProductType, UserType } from '../../utilities/Types'
import { Order } from '../../models/order'
dotenv.config()

const orderProducts = new OrderProducts()
// create a request object
const request = supertest(app)

describe('Order Products Model', () => {
  const DummyOrderData: OrderType = {
    status: 'active',
    user_id: 1
  }
  const DummyUserData: UserType = {
    username: 'Test User Name',
    password: '123456',
    fullname: 'Mohamed Saied - Test Env'
  }
  const DummyProductData: ProductType = {
    title: 'Product Title',
    price: 5.5
  }
  const DummyOrderProductData: OrderProductsType = {
    order_id: 1,
    product_id: 1,
    quantity: 2
  }
  const tempToken = jwt.sign({ user: DummyUserData }, process.env.TOKEN_SECRET as string)

  beforeAll(async () => {
    const user = new User()
    const product = new Product()
    const order = new Order()

    user.create(DummyUserData)
    product.create(DummyProductData)
    order.create(DummyOrderData)
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(
      'TRUNCATE order_Products RESTART IDENTITY CASCADE;TRUNCATE users RESTART IDENTITY CASCADE;TRUNCATE products RESTART IDENTITY CASCADE;TRUNCATE order_products RESTART IDENTITY CASCADE;'
    )
    conn.release()
  })

  describe('Model Methods Check', () => {
    it('Order Products Index Defined', () => {
      expect(orderProducts.index).toBeDefined()
    })
    it('Order Products Create Defined', () => {
      expect(orderProducts.create).toBeDefined()
    })
    it('Order Products Update Defined', () => {
      expect(orderProducts.update).toBeDefined()
    })
    it('Order Products Show Defined', () => {
      expect(orderProducts.show).toBeDefined()
    })
    it('Order Products Delete Defined', () => {
      expect(orderProducts.delete).toBeDefined()
    })
  })
  describe('Check Endpoint *API* Access And Functionally', () => {
    it('/api/order-products | All Order Products', async () => {
      const response = await request
        .get('/api/order-products')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/order-products | Create Order Products', async () => {
      const response = await request
        .post('/api/order-products')
        .send(DummyOrderProductData)
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/order-products/:id | Show Order', async () => {
      const response = await request
        .get('/api/order-products/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/order-products/:id | Update Order', async () => {
      const response = await request
        .put('/api/order-products/1')
        .send({
          order_id: 1,
          product_id: 1,
          quantity: 5
        })
        .set('Authorization', `Bearer ${tempToken}`)
      console.log(response.body)
      expect(response.status).toBe(200)
    })
    it('/api/order-products/:id | Delete Order', async () => {
      const response = await request
        .delete('/api/order-products/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
  })
})
