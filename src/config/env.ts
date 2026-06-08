import 'dotenv/config';

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/GenshinImport',
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
};
