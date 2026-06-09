import { pool } from '../config/db';
import { Artifact, ArtifactType, ArtifactCreateInput, ArtifactUpdateInput } from '../models';

export class ArtifactRepository {
  async findAll(params: { page: number; limit: number; type?: ArtifactType; search?: string }) {
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
    const countQuery = `SELECT COUNT(*) as total FROM Artifact WHERE ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const total = Number(countResult[0].total);

    // Get data
    const dataQuery = `SELECT * FROM Artifact WHERE ${whereClause} ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
    const dataParams = [...queryParams, limit, offset];
    const data = await pool.query(dataQuery, dataParams) as Artifact[];

    return { data, total, page, limit };
  }

  async findById(id: number): Promise<Artifact | null> {
    const result = await pool.query('SELECT * FROM Artifact WHERE id = ?', [id]);
    return result.length > 0 ? (result[0] as Artifact) : null;
  }

  // Admin methods
  async create(data: ArtifactCreateInput): Promise<Artifact> {
    const result = await pool.query(
      'INSERT INTO Artifact (name, type, description, stock, imageUrl, price) VALUES (?, ?, ?, ?, ?, ?)',
      [data.name, data.type, data.description, data.stock, data.imageUrl, data.price]
    );
    return this.findById(Number(result.insertId)) as Promise<Artifact>;
  }

  async update(id: number, data: ArtifactUpdateInput): Promise<Artifact> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
    if (data.type !== undefined) { fields.push('type = ?'); values.push(data.type); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.stock !== undefined) { fields.push('stock = ?'); values.push(data.stock); }
    if (data.imageUrl !== undefined) { fields.push('imageUrl = ?'); values.push(data.imageUrl); }
    if (data.price !== undefined) { fields.push('price = ?'); values.push(data.price); }

    if (fields.length === 0) {
      return this.findById(id) as Promise<Artifact>;
    }

    const query = `UPDATE Artifact SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    await pool.query(query, values);
    
    return this.findById(id) as Promise<Artifact>;
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM Artifact WHERE id = ?', [id]);
  }
}

export const artifactRepository = new ArtifactRepository();
