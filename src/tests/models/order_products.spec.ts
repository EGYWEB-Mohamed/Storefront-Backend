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
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE order_products RESTART IDENTITY CASCADE;')
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE order_products RESTART IDENTITY CASCADE;')
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
    const tempToken = jwt.sign({ user: DummyUserData }, process.env.TOKEN_SECRET as string)

    beforeAll(async () => {
      const user = new User()
      const product = new Product()
      const order = new Order()

      await user.create(DummyUserData)
      await product.create(DummyProductData)
      await order.create(DummyOrderData)
    })

    it('/api/order-products | All Order Products', async () => {
      const response = await request
        .get('/api/order-products')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
    it('/api/order-products | Create Order Products', async () => {
      const response = await request
        .post('/api/order-products')
        .send(DummyOrderProductData)
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.order_id).toEqual(DummyOrderProductData.order_id)
      expect(response.body.product_id).toEqual(DummyOrderProductData.product_id)
      expect(response.body.quantity).toEqual(DummyOrderProductData.quantity)
    })
    it('/api/order-products/:id | Show Order Products', async () => {
      const response = await request
        .get('/api/order-products/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/order-products/:id | Update Order Products', async () => {
      const response = await request
        .put('/api/order-products/1')
        .send({
          order_id: 1,
          product_id: 1,
          quantity: 5
        })
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.quantity).toEqual(5)
      expect(response.body.order_id).toEqual(1)
    })
    it('/api/order-products/:id | Delete Order', async () => {
      const response = await request
        .delete('/api/order-products/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({})
    })
  })
  describe('Test Order Products Model Methods Functionality', () => {
    const orderProducts = new OrderProducts()
    it('Method Index', async () => {
      const result = await orderProducts.index()
      expect(result).toEqual([])
    })
    it('Method Create', async () => {
      const result = await orderProducts.create(DummyOrderProductData)
      expect(result.order_id).toBe(DummyOrderProductData.order_id)
      expect(result.product_id).toBe(DummyOrderProductData.product_id)
      expect(result.quantity).toBe(DummyOrderProductData.quantity)
    })
    it('Method Show', async () => {
      const result = await orderProducts.show(2)
      expect(result.quantity).toBe(DummyOrderProductData.quantity)
      expect(result).toBeTruthy()
    })
    it('Method Update', async () => {
      const result = await orderProducts.update({
        id: 2,
        order_id: 1,
        product_id: 1,
        quantity: 5
      })
      expect(result.quantity).toBe(5)
      expect(result).toBeTruthy()
    })
    it('Method Delete', async () => {
      const result = await orderProducts.delete(2)
      expect(result).toBe('Order Product Deleted Successfully')
    })
  })
})
