import client from '../database'
import { OrderProductsType } from '../utilities/Types'

export class OrderProducts {
  async index(): Promise<OrderProductsType[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT order_products.id,order_products.order_id , order_products.quantity , orders.status , products.title , products.price as unit_price , (products.price * order_products.quantity) as total_price FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error('Index Method Error ' + error)
    }
  }
  async show(id: number): Promise<OrderProductsType> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT order_products.id,order_products.order_id , order_products.quantity , orders.status , products.title , products.price as unit_price , (products.price * order_products.quantity) as total_price FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id WHERE order_products.id = $1'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Show Method Error ' + error)
    }
  }
  async create(orderProducts: OrderProductsType): Promise<OrderProductsType> {
    try {
      const { order_id, product_id, quantity } = orderProducts
      const conn = await client.connect()
      const sql =
        'INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *;'
      const result = await conn.query(sql, [order_id, product_id, quantity])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Create Method Error ' + error)
    }
  }
  async update(orderProducts: OrderProductsType): Promise<OrderProductsType> {
    const conn = await client.connect()
    const { id, order_id, product_id, quantity } = orderProducts
    const checkIfOrderProductsCount = await (
      await conn.query('SELECT * FROM order_products WHERE id = $1', [id])
    ).rowCount
    if (checkIfOrderProductsCount <= 1) {
      try {
        const sql =
          'UPDATE order_products SET order_id = $1 , product_id = $2 , quantity = $3 WHERE id = $4;'
        await conn.query(sql, [order_id, product_id, quantity, id])
        const returnUpdated = await conn.query(
          'SELECT order_products.id,order_products.order_id , order_products.quantity , orders.status , products.title , products.price as unit_price , (products.price * order_products.quantity) as total_price FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id WHERE order_products.id = $1',
          [id]
        )
        conn.release()
        return returnUpdated.rows[0]
      } catch (error) {
        throw new Error('Update Method Error ' + error)
      }
    }
    throw new Error('Order Product Not Found')
  }

  async delete(id: number): Promise<OrderProductsType | string> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM order_products WHERE id = $1;'
      await conn.query(sql, [id])
      conn.release()
      return 'Order Product Deleted Successfully'
    } catch (error) {
      throw new Error('Delete Method Error ' + error)
    }
  }
}
