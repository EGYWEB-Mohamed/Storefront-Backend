import { Product } from '../../models/product'
import supertest from 'supertest'
import app from '../../index'
import client from '../../database'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const product = new Product()
// create a request object
const request = supertest(app)

describe('Product Model', () => {
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(
      'TRUNCATE order_Products RESTART IDENTITY CASCADE;TRUNCATE users RESTART IDENTITY CASCADE;TRUNCATE products RESTART IDENTITY CASCADE;TRUNCATE order_products RESTART IDENTITY CASCADE;'
    )
    conn.release()
  })

  describe('Model Methods Check', () => {
    it('Product Index Defined', () => {
      expect(product.index).toBeDefined()
    })
    it('Product Create Defined', () => {
      expect(product.create).toBeDefined()
    })
    it('Product Update Defined', () => {
      expect(product.update).toBeDefined()
    })
    it('Product Show Defined', () => {
      expect(product.show).toBeDefined()
    })
    it('Product Delete Defined', () => {
      expect(product.delete).toBeDefined()
    })
  })
  describe('Check Endpoint *API* Access And Functionally', () => {
    const DummyProductData = {
      title: 'Product Title',
      price: 9.99
    }
    const DummyUserData = {
      username: 'Test User Name',
      password: '123456',
      fullname: 'Mohamed Saied - Test Env'
    }
    const tempToken = jwt.sign({ user: DummyUserData }, process.env.TOKEN_SECRET as string)

    it('/api/products | All Products', async () => {
      const response = await request
        .get('/api/products')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/products | Create Products', async () => {
      const response = await request
        .post('/api/products')
        .send(DummyProductData)
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
    it('/api/products/:id | Show Product', async () => {
      const response = await request
        .get('/api/products/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.title).toBe('Product Title')
    })
    it('/api/products/:id | Update Product', async () => {
      const response = await request
        .put('/api/products/1')
        .send({
          title: 'Product Title',
          price: 4.99
        })
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.title).toBe('Product Title')
      expect(response.body.price).toBe('4.99')
    })
    it('/api/products/:id | Delete Product', async () => {
      const response = await request
        .delete('/api/products/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
    })
  })
})
