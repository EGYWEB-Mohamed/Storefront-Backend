import client from '../database'
import { OrderType } from '../utilities/Types'

export class Order {
  async index(): Promise<OrderType[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT orders.id, product_id, products.title, products.price as unit_price,user_id,users.fullname,quantity, (products.price * quantity) as total_price FROM orders INNER join products ON orders.product_id = products.id INNER join users ON orders.user_id = users.id;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error('Index Method Error ' + error)
    }
  }
  async show(id: number): Promise<OrderType> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT orders.id, product_id, products.title, products.price as unit_price,user_id,users.fullname,quantity, (products.price * quantity) as total_price FROM orders INNER join products ON orders.product_id = products.id INNER join users ON orders.user_id = users.id WHERE orders.id = $1'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Show Method Error ' + error)
    }
  }
  async create(order: OrderType): Promise<OrderType> {
    try {
      const { product_id, quantity, user_id } = order

      const conn = await client.connect()
      const sql = 'INSERT INTO orders (product_id,quantity,user_id) VALUES ($1,$2,$3) RETURNING *;'
      const result = await conn.query(sql, [product_id, quantity, user_id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Create Method Error ' + error)
    }
  }
  async update(order: OrderType): Promise<OrderType | boolean> {
    const conn = await client.connect()
    const { id, product_id, quantity, user_id } = order
    const checkIfOrderCount = await (
      await conn.query('SELECT * FROM orders WHERE id = $1', [id])
    ).rowCount
    if (checkIfOrderCount <= 1) {
      try {
        const sql =
          'UPDATE orders SET product_id = $1 , quantity = $2 , user_id = $3 WHERE id = $4;'
        const result = await conn.query(sql, [product_id, quantity, user_id, id])
        const returnUpdated = await conn.query(
          'SELECT orders.id, product_id, products.title, products.price as unit_price,user_id,users.fullname,quantity, (products.price * quantity) as total_price FROM orders INNER join products ON orders.product_id = products.id INNER join users ON orders.user_id = users.id WHERE orders.id = $1',
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
      const result = await conn.query(sql, [id])
      conn.release()
      return 'Order Deleted Successfully'
    } catch (error) {
      throw new Error('Delete Method Error ' + error)
    }
  }
}
