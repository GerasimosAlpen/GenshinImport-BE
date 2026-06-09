import { pool } from '../config/db';
import { User } from '../models';

export class ProfileRepository {
  async updateProfile(id: number, data: Partial<User>) {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.username !== undefined) { fields.push('username = ?'); values.push(data.username); }
    if (data.password !== undefined) { fields.push('password = ?'); values.push(data.password); }

    if (fields.length === 0) {
      // Just return the user without password
      const user = await pool.query('SELECT id, email, username, role, createdAt, updatedAt FROM User WHERE id = ?', [id]);
      return user[0];
    }

    const query = `UPDATE User SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    await pool.query(query, values);
    
    const result = await pool.query('SELECT id, email, username, role, createdAt, updatedAt FROM User WHERE id = ?', [id]);
    return result[0];
  }
}

export const profileRepository = new ProfileRepository();
