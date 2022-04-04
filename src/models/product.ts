import client from '../database'
import { ProductType } from '../utilities/Types'

export class Product {
  async index(): Promise<ProductType[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error('Index Method Error ' + error)
    }
  }
  async show(id: number): Promise<ProductType> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Show Method Error ' + error)
    }
  }
  async create(product: ProductType): Promise<ProductType> {
    try {
      const { title, price } = product

      const conn = await client.connect()
      const sql = 'INSERT INTO products (title,price) VALUES ($1,$2) RETURNING *;'
      const result = await conn.query(sql, [title, price])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Create Method Error ' + error)
    }
  }
  async update(product: ProductType): Promise<ProductType | boolean> {
    const conn = await client.connect()
    const { id, title, price } = product
    const checkIfProductCount = await (
      await conn.query('SELECT * FROM products WHERE id = $1', [id])
    ).rowCount
    if (checkIfProductCount <= 1) {
      try {
        const sql = 'UPDATE products SET title = $1 , price = $2 WHERE id = $3 RETURNING *;'
        const result = await conn.query(sql, [title, price, id])
        conn.release()
        return result.rows[0]
      } catch (error) {
        throw new Error('Update Method Error ' + error)
      }
    }
    return false
  }

  async delete(id: number): Promise<ProductType | string> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM products WHERE id = $1;'
      await conn.query(sql, [id])
      conn.release()
      return 'Product Deleted Successfully'
    } catch (error) {
      throw new Error('Delete Method Error ' + error)
    }
  }
}
