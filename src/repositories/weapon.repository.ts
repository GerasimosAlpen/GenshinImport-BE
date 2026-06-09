import { pool } from '../config/db';
import { Weapon, WeaponType, WeaponCreateInput, WeaponUpdateInput } from '../models';

export class WeaponRepository {
  async findAll(params: { page: number; limit: number; type?: WeaponType; search?: string }) {
    const { page, limit, type, search } = params;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const queryParams: any[] = [];

    if (type) {
      whereClause += ' AND type = ?';
      queryParams.push(type);
    }

    if (search) {
      whereClause += ' AND name LIKE ?';
      queryParams.push(`%${search}%`);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM Weapon WHERE ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const total = Number(countResult[0].total);

    // Get data
    const dataQuery = `SELECT * FROM Weapon WHERE ${whereClause} ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
    const dataParams = [...queryParams, limit, offset];
    const data = await pool.query(dataQuery, dataParams) as Weapon[];

    return { data, total, page, limit };
  }

  async findById(id: number): Promise<Weapon | null> {
    const result = await pool.query('SELECT * FROM Weapon WHERE id = ?', [id]);
    return result.length > 0 ? (result[0] as Weapon) : null;
  }

  // Admin methods
  async create(data: WeaponCreateInput): Promise<Weapon> {
    const result = await pool.query(
      'INSERT INTO Weapon (name, type, description, stock, imageUrl, price) VALUES (?, ?, ?, ?, ?, ?)',
      [data.name, data.type, data.description, data.stock, data.imageUrl, data.price]
    );
    return this.findById(Number(result.insertId)) as Promise<Weapon>;
  }

  async update(id: number, data: WeaponUpdateInput): Promise<Weapon> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
    if (data.type !== undefined) { fields.push('type = ?'); values.push(data.type); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.stock !== undefined) { fields.push('stock = ?'); values.push(data.stock); }
    if (data.imageUrl !== undefined) { fields.push('imageUrl = ?'); values.push(data.imageUrl); }
    if (data.price !== undefined) { fields.push('price = ?'); values.push(data.price); }

    if (fields.length === 0) {
      return this.findById(id) as Promise<Weapon>;
    }

    const query = `UPDATE Weapon SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    await pool.query(query, values);
    
    return this.findById(id) as Promise<Weapon>;
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM Weapon WHERE id = ?', [id]);
  }
}

export const weaponRepository = new WeaponRepository();
