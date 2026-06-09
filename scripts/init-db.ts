import { pool } from '../src/config/db';

const schema = `
  CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(191) NULL,
    role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    googleId VARCHAR(191) NULL UNIQUE,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
  );

  CREATE TABLE IF NOT EXISTS Weapon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    type ENUM('SWORD', 'CLAYMORE', 'POLEARM', 'CATALYST', 'BOW') NOT NULL,
    description TEXT NOT NULL,
    stock INT NOT NULL,
    imageUrl VARCHAR(191) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
  );

  CREATE TABLE IF NOT EXISTS Artifact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    type ENUM('FLOWER', 'PLUME', 'SANDS', 'GOBLET', 'CIRCLET') NOT NULL,
    description TEXT NOT NULL,
    stock INT NOT NULL,
    imageUrl VARCHAR(191) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
  );

  CREATE TABLE IF NOT EXISTS Purchase (
    id VARCHAR(191) PRIMARY KEY,
    userId INT NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'COMPLETED',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS PurchaseItem (
    id VARCHAR(191) PRIMARY KEY,
    purchaseId VARCHAR(191) NOT NULL,
    weaponId INT NULL,
    artifactId INT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (purchaseId) REFERENCES Purchase(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (weaponId) REFERENCES Weapon(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (artifactId) REFERENCES Artifact(id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

async function initDb() {
  console.log('Initializing database schema...');
  try {
    const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
    for (const stmt of statements) {
      await pool.query(stmt);
    }
    console.log('Database initialized successfully!');
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDb();
