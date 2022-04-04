export type UserType = {
  id?: number
  username: string
  password: string
  fullname: string
}
export type LoginType = {
  username: string
  password: string
}
export type ProductType = {
  id?: number
  title: string
  price: number
}

export type OrderType = {
  id?: number
  status: string
  user_id: number
}

export type OrderProductsType = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}
