import express, { Request, Response } from 'express'
import { OrderProducts } from '../models/order_products'
import { OrderProductsType } from '../utilities/Types'
import verifyAuthToken from '../middleware/jwt'
import { OrderProductsValidator } from '../utilities/Validations'

const orderProduct = new OrderProducts()

const indexOrderProduct = async (req: Request, res: Response) => {
  try {
    const results = await orderProduct.index()
    res.json(results)
  } catch (error) {
    res.send(error)
  }
}
const showOrderProduct = async (req: Request, res: Response) => {
  try {
    const results = await orderProduct.show(parseInt(req.params.id))
    if (results) {
      res.json(results)
    } else {
      res.json('Empty')
    }
  } catch (error) {
    res.send(error)
  }
}
const createOrderProduct = async (req: Request, res: Response) => {
  try {
    const validate = await OrderProductsValidator(req.body)
    if (typeof validate == 'boolean') {
      const dataBody: OrderProductsType = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
      }
      const results = await orderProduct.create(dataBody)
      res.send(results)
    } else {
      res.status(400).json(validate)
    }
  } catch (error) {
    res.send(error)
  }
}
const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const validate = await OrderProductsValidator(req.body)
    if (typeof validate == 'boolean') {
      const dataBody: OrderProductsType = {
        id: parseInt(req.params.id),
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
      }
      const results = await orderProduct.update(dataBody)
      if (results) {
        res.send(results)
      } else {
        res.json('Order Not Found')
        return
      }
    } else {
      res.status(400).json(validate)
    }
  } catch (error) {
    res.send(error)
  }
}
const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    const results = await orderProduct.delete(parseInt(req.params.id))
    res.send(results)
  } catch (error) {
    res.send(error)
  }
}

const order_products_routes = (app: express.Application) => {
  app.get('/api/order-products', verifyAuthToken, indexOrderProduct)
  app.get('/api/order-products/:id', verifyAuthToken, showOrderProduct)
  app.post('/api/order-products', verifyAuthToken, createOrderProduct)
  app.put('/api/order-products/:id', verifyAuthToken, updateOrderProduct)
  app.delete('/api/order-products/:id', verifyAuthToken, deleteOrderProduct)
}
export default order_products_routes
