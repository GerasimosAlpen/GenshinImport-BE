import { pool } from '../config/db';
import { User, UserCreateInput } from '../models';

export class AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    return result.length > 0 ? (result[0] as User) : null;
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM User WHERE googleId = ?', [googleId]);
    return result.length > 0 ? (result[0] as User) : null;
  }

  async createUser(data: UserCreateInput): Promise<User> {
    const result = await pool.query(
      'INSERT INTO User (username, email, password, role, googleId) VALUES (?, ?, ?, ?, ?)',
      [data.username, data.email, data.password || null, data.role || 'USER', data.googleId || null]
    );
    return this.findUserById(Number(result.insertId)) as Promise<User>;
  }

  async findUserById(id: number): Promise<User | null> {
    const result = await pool.query('SELECT * FROM User WHERE id = ?', [id]);
    return result.length > 0 ? (result[0] as User) : null;
  }
}

export const authRepository = new AuthRepository();
