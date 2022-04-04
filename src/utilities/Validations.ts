import validator from 'validator'
import { LoginType, UserType, ProductType, OrderType } from './Types'

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
  if (!params.product_id || !params.quantity || !params.user_id) {
    return 'Parameter {product_id & quantity & user_id} is Required'
  }
  return true
}
