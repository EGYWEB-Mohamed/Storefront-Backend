import client from '../database'
import bcrypt from 'bcrypt'
import { error } from 'console'

export type UserType = {
  id: number
  username: string
  password: string
  fullname: string
}

const SALT = parseInt(process.env.SALT_ROUND as string) as number

export class User {
  async index(): Promise<UserType[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error('Index Method Error ' + error)
    }
  }
  async show(id: number): Promise<UserType> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Show Method Error ' + error)
    }
  }
  async create(user: UserType): Promise<UserType> {
    try {
      const { username, password, fullname } = user
      const pepper: string = process.env.BCRYPT_PASSWORD as string
      const salt: number = parseInt(process.env.SALT_ROUNDS as string)
      const Hash = bcrypt.hashSync(password + pepper, salt)

      const conn = await client.connect()
      const sql = 'INSERT INTO users (username,password,fullname) VALUES ($1,$2,$3) RETURNING *;'
      const result = await conn.query(sql, [username, Hash, fullname])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Create Method Error ' + error)
    }
  }
  async update(user: UserType): Promise<UserType> {
    try {
      const { username, password, fullname } = user
      const pepper: string = process.env.BCRYPT_PASSWORD as string
      const salt: number = parseInt(process.env.SALT_ROUNDS as string)
      const Hash = bcrypt.hashSync(password + pepper, salt)

      const conn = await client.connect()
      const sql = 'INSERT INTO users (username,password,fullname) VALUES ($1,$2,$3) RETURNING *;'
      const result = await conn.query(sql, [username, Hash, fullname])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Create Method Error ' + error)
    }
  }

  async delete(id: number): Promise<UserType | string> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()
      return 'User Deleted Successfully'
    } catch (error) {
      throw new Error('Delete Method Error ' + error)
    }
  }
}
