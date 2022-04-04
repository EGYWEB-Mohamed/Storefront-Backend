import client from '../database'
import bcrypt from 'bcrypt'
import { LoginType, UserType } from '../utilities/Types'
export class User {
  async index(): Promise<UserType[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id,username,fullname FROM users;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error('Index Method Error ' + error)
    }
  }
  async show(id: number): Promise<UserType | boolean> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id,username,fullname FROM users WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()
      const user = result.rows[0]
      if (typeof user !== 'undefined') {
        return user
      }
      return false
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
  async update(user: UserType): Promise<UserType | boolean> {
    const conn = await client.connect()
    const { id, username, password, fullname } = user
    const checkIfUserCount = await (
      await conn.query('SELECT * FROM users WHERE id = $1', [id])
    ).rowCount
    if (checkIfUserCount <= 1) {
      try {
        const pepper: string = process.env.BCRYPT_PASSWORD as string
        const salt: number = parseInt(process.env.SALT_ROUNDS as string)
        const Hash = bcrypt.hashSync(password + pepper, salt)

        const sql =
          'UPDATE users SET username = $1 , password = $2 , fullname = $3 WHERE id = $4 RETURNING *;'
        const result = await conn.query(sql, [username, Hash, fullname, id])
        conn.release()
        return result.rows[0]
      } catch (error) {
        throw new Error('Update Method Error ' + error)
      }
    }
    return false
  }

  async delete(id: number): Promise<UserType | string> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE id = $1'
      await conn.query(sql, [id])
      conn.release()
      return 'User Deleted Successfully'
    } catch (error) {
      throw new Error('Delete Method Error ' + error)
    }
  }

  async login(ParmsLogin: LoginType): Promise<UserType | boolean> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'
    const result = await conn.query(sql, [ParmsLogin.username])
    conn.release()
    const user = result.rows[0]
    if (typeof user !== 'undefined') {
      const pepper: string = process.env.BCRYPT_PASSWORD as string
      if (bcrypt.compareSync(ParmsLogin.password + pepper, user.password)) {
        return user
      }
    }
    return false
  }
}
