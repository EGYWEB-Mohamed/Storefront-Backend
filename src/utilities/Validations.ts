import client from '../database'
import { LoginType, UserType, ProductType, OrderType, OrderProductsType } from './Types'

export const LoginValidator = async (params: LoginType): Promise<boolean | string> => {
  if (!params.username || !params.password) {
    return 'Parameter {username & password } is Required'
  }
  return true
}

export const userValidator = async (params: UserType): Promise<boolean | string> => {
  if (!params.username || !params.password || !params.fullname) {
    return 'Parameter {username & password & fullname} is Required'
  }
  return true
}

export const ProductValidator = async (params: ProductType): Promise<boolean | string> => {
  if (!params.title || !params.price) {
    return 'Parameter {title & price} is Required'
  }
  return true
}
export const OrderValidator = async (params: OrderType): Promise<boolean | string> => {
  if (!params.user_id || !params.status) {
    return 'Parameter {user_id & status} is Required'
  }
  const conn = await client.connect()
  const checkUser = (await conn.query('SELECT * FROM users WHERE id = $1;', [params.user_id]))
    .rowCount
  conn.release()
  if (checkUser == 0) {
    return 'User With id ' + params.user_id + ' Not Exist'
  }
  const AvailableStatus = ['complete', 'active']
  if (!AvailableStatus.includes(params.status)) {
    return 'Status Should be (active Or complete)'
  }
  return true
}
export const OrderProductsValidator = async (
  params: OrderProductsType
): Promise<boolean | string> => {
  if (!params.order_id || !params.product_id || !params.quantity) {
    return 'Parameter {order_id & product_id & quantity} is Required'
  }
  const conn = await client.connect()
  const checkOrder = await conn.query('SELECT * FROM orders WHERE id = $1;', [params.order_id])
  const checkProduct = await conn.query('SELECT * FROM products WHERE id = $1;', [
    params.product_id
  ])
  conn.release()
  if (checkOrder.rowCount == 0) {
    return 'Order With id ' + params.order_id + ' Not Exist'
  }
  if (checkProduct.rowCount == 0) {
    return 'Product With id ' + params.product_id + ' Not Exist'
  }
  return true
}
