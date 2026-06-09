import mariadb from 'mariadb';
import { env } from './env';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in env configuration');
}

const dbUrl = new URL(env.DATABASE_URL);

// Create a connection pool for MariaDB
export const pool = mariadb.createPool({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1), // Remove leading slash
  connectionLimit: 10,
  dateStrings: true, // Returns dates as strings rather than Date objects if preferred, though default is false. We'll leave as default or pass string to avoid tz issues.
});

// Utility function for transactions
export async function withTransaction<T>(
  callback: (conn: mariadb.PoolConnection) => Promise<T>
): Promise<T> {
  let conn: mariadb.PoolConnection | null = null;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (err) {
    if (conn) await conn.rollback();
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

export default pool;
