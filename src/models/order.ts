import client from '../database'
import { OrderType } from '../utilities/Types'

export class Order {
  async index(): Promise<OrderType[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT orders.id , status , users.username , users.fullname from orders INNER JOIN users ON orders.user_id = users.id;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error('Index Method Error ' + error)
    }
  }
  async show(id: number): Promise<OrderType | Object> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT orders.id , status , users.username , users.fullname from orders INNER JOIN users ON orders.user_id = users.id WHERE orders.id = $1'
      const result = await conn.query(sql, [id])
      const OrderProducts = await conn.query(
        'SELECT order_products.id,order_products.order_id , order_products.quantity , orders.status , products.title , products.price as unit_price , (products.price * order_products.quantity) as total_price FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id WHERE order_products.order_id = $1',
        [id]
      )
      conn.release()
      return {
        order: result.rows[0],
        products: OrderProducts.rows
      }
    } catch (error) {
      throw new Error('Show Method Error ' + error)
    }
  }
  async create(order: OrderType): Promise<OrderType> {
    try {
      const { user_id, status } = order
      const conn = await client.connect()
      const sql = 'INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *;'
      const result = await conn.query(sql, [user_id, status])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Create Method Error ' + error)
    }
  }
  async update(order: OrderType): Promise<OrderType | boolean> {
    const conn = await client.connect()
    const { id, user_id, status } = order
    const checkIfOrderCount = await (
      await conn.query('SELECT * FROM orders WHERE id = $1', [id])
    ).rowCount
    if (checkIfOrderCount <= 1) {
      try {
        const sql = 'UPDATE orders SET user_id = $1 , status = $2 WHERE id = $3;'
        await conn.query(sql, [user_id, status, id])
        const returnUpdated = await conn.query(
          'SELECT orders.id , status , users.username , users.fullname from orders INNER JOIN users ON orders.user_id = users.id WHERE orders.id = $1',
          [id]
        )
        conn.release()
        return returnUpdated.rows[0]
      } catch (error) {
        throw new Error('Update Method Error ' + error)
      }
    }
    return false
  }

  async delete(id: number): Promise<OrderType | string> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM orders WHERE id = $1;'
      await conn.query(sql, [id])
      conn.release()
      return 'Order Deleted Successfully'
    } catch (error) {
      throw new Error('Delete Method Error ' + error)
    }
  }
}
