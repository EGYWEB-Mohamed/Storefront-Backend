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
  const DummyProductData = {
    title: 'Product Title',
    price: 9.99
  }
  const DummyUserData = {
    username: 'Test User Name',
    password: '123456',
    fullname: 'Mohamed Saied - Test Env'
  }

  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE products RESTART IDENTITY CASCADE;')
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE products RESTART IDENTITY CASCADE;')
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
    const tempToken = jwt.sign({ user: DummyUserData }, process.env.TOKEN_SECRET as string)

    it('/api/products | All Products', async () => {
      const response = await request
        .get('/api/products')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
    it('/api/products | Create Products', async () => {
      const response = await request
        .post('/api/products')
        .send(DummyProductData)
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body.title).toEqual(DummyProductData.title)
      expect(parseFloat(response.body.price)).toEqual(DummyProductData.price)
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
      expect(parseFloat(response.body.price)).toEqual(4.99)
    })
    it('/api/products/:id | Delete Product', async () => {
      const response = await request
        .delete('/api/products/1')
        .set('Authorization', `Bearer ${tempToken}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({})
    })
  })
  describe('Test Product Model Methods Functionality', () => {
    const product = new Product()
    it('Method Index', async () => {
      const result = await product.index()
      expect(result).toEqual([])
    })
    it('Method Create', async () => {
      const result = await product.create(DummyProductData)
      expect(result.title).toBe(DummyProductData.title)
      expect(parseFloat(result.price as unknown as string)).toBe(DummyProductData.price)
    })
    it('Method Show', async () => {
      const result = await product.show(2)
      expect(result.title).toBe(DummyProductData.title)
      expect(parseFloat(result.price as unknown as string)).toEqual(DummyProductData.price)
    })
    it('Method Update', async () => {
      const result = await product.update({
        id: 2,
        title: 'Product',
        price: 10
      })
      expect(result.title).toBe('Product')
      expect(parseFloat(result.price as unknown as string)).toEqual(10)
    })
    it('Method Delete', async () => {
      const result = await product.delete(2)
      expect(result).toBe('Product Deleted Successfully')
    })
  })
})
