import express, { Request, Response } from 'express'
import { Product } from '../models/product'
import { ProductType } from '../utilities/Types'
import verifyAuthToken from '../middleware/jwt'
import { ProductValidator } from '../utilities/Validations'

const product = new Product()

const indexProduct = async (req: Request, res: Response) => {
  try {
    const results = await product.index()
    res.json(results)
  } catch (error) {
    res.send(error)
  }
}
const showProduct = async (req: Request, res: Response) => {
  try {
    const results = await product.show(parseInt(req.params.id))
    if (results) {
      res.json(results)
    } else {
      res.json('Empty')
    }
  } catch (error) {
    res.send(error)
  }
}
const createProduct = async (req: Request, res: Response) => {
  try {
    const validate = await ProductValidator(req.body)
    if (typeof validate == 'boolean') {
      const dataBody: ProductType = {
        title: req.body.title,
        price: req.body.price
      }
      const results = await product.create(dataBody)
      res.send(results)
    } else {
      res.status(400).json(validate)
    }
  } catch (error) {
    res.send(error)
  }
}
const updateProduct = async (req: Request, res: Response) => {
  try {
    const validate = await ProductValidator(req.body)
    if (typeof validate == 'boolean') {
      const dataBody: ProductType = {
        id: parseInt(req.params.id),
        title: req.body.title,
        price: req.body.price
      }
      const results = await product.update(dataBody)
      if (results) {
        res.send(results)
      } else {
        res.json('Product Not Found')
        return
      }
    } else {
      res.status(400).json(validate)
    }
  } catch (error) {
    res.send(error)
  }
}
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const results = await product.delete(parseInt(req.params.id))
    res.send(results)
  } catch (error) {
    res.send(error)
  }
}

const product_routes = (app: express.Application) => {
  app.get('/api/products', indexProduct)
  app.get('/api/products/:id', showProduct)
  app.post('/api/products', verifyAuthToken, createProduct)
  app.put('/api/products/:id', verifyAuthToken, updateProduct)
  app.delete('/api/products/:id', verifyAuthToken, deleteProduct)
}
export default product_routes
