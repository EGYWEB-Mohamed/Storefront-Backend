import express, { Request, Response } from 'express'
import { Order } from '../models/order'
import { OrderType } from '../utilities/Types'
import verifyAuthToken from '../middleware/jwt'
import { OrderValidator } from '../utilities/Validations'

const order = new Order()

const indexOrder = async (req: Request, res: Response) => {
  const results = await order.index()
  res.json(results)
}
const showOrder = async (req: Request, res: Response) => {
  const results = await order.show(parseInt(req.params.id))
  if (results) {
    res.json(results)
  } else {
    res.json('Empty')
  }
}
const createOrder = async (req: Request, res: Response) => {
  const validate = await OrderValidator(req.body)
  if (typeof validate == 'boolean') {
    const dataBody: OrderType = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id
    }
    const results = await order.create(dataBody)
    res.send(results)
  } else {
    res.status(400).json(validate)
  }
}
const updateOrder = async (req: Request, res: Response) => {
  const validate = await OrderValidator(req.body)
  if (typeof validate == 'boolean') {
    const dataBody: OrderType = {
      id: parseInt(req.params.id),
      product_id: parseInt(req.body.product_id),
      quantity: parseInt(req.body.quantity),
      user_id: parseInt(req.body.user_id)
    }
    const results = await order.update(dataBody)
    if (results) {
      res.send(results)
    } else {
      res.json('Order Not Found')
      return
    }
  } else {
    res.status(400).json(validate)
  }
}
const deleteOrder = async (req: Request, res: Response) => {
  const results = await order.delete(parseInt(req.params.id))
  res.send(results)
}

const order_routes = (app: express.Application) => {
  app.get('/api/orders', verifyAuthToken, indexOrder)
  app.get('/api/orders/:id', verifyAuthToken, showOrder)
  app.post('/api/orders', verifyAuthToken, createOrder)
  app.put('/api/orders/:id', verifyAuthToken, updateOrder)
  app.delete('/api/orders/:id', verifyAuthToken, deleteOrder)
}
export default order_routes
