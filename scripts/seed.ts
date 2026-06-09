import * as bcrypt from 'bcrypt';
import { pool } from '../src/config/db';

async function main() {
  console.log('Seeding database using raw SQL...');

  const PORT = process.env.PORT || '3000';
  const BASE_URL = `http://localhost:${PORT}`;

  try {
    // 1. Clear existing data (using TRUNCATE or DELETE)
    // Order matters due to foreign keys! We must delete child tables first.
    console.log('Clearing existing data...');
    await pool.query('DELETE FROM PurchaseItem');
    await pool.query('DELETE FROM Purchase');
    await pool.query('DELETE FROM Weapon');
    await pool.query('DELETE FROM Artifact');
    await pool.query('DELETE FROM User');
    
    // Reset auto-increment
    await pool.query('ALTER TABLE Weapon AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE Artifact AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE User AUTO_INCREMENT = 1');

    // 2. Create Users
    console.log('Seeding Users...');
    const adminPassword = await bcrypt.hash('admin12345', 10);
    const userPassword = await bcrypt.hash('user12345', 10);

    const insertUserQuery = `INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)`;
    await pool.query(insertUserQuery, ['GenshinAdmin', 'admin@genshinimport.com', adminPassword, 'ADMIN']);
    await pool.query(insertUserQuery, ['Traveler', 'user@genshinimport.com', userPassword, 'USER']);

    console.log('Users created: admin@genshinimport.com, user@genshinimport.com');

    // 3. Create Weapons
    console.log('Seeding Weapons...');
    const insertWeaponQuery = `INSERT INTO Weapon (name, type, description, stock, imageUrl, price) VALUES (?, ?, ?, ?, ?, ?)`;
    const weapons = [
      ['Mistsplitter Reforged', 'SWORD', 'A sword that blazes with a fierce violet light. It was once shattered, but has since been reforged.', 15, `${BASE_URL}/uploads/Mistsplitter_Reforged.png`, 249.99],
      ["Wolf's Gravestone", 'CLAYMORE', 'A longsword used by the Greatwolf of Boreas. Originally just a heavy sheet of iron, it became legendary in battle.', 10, `${BASE_URL}/uploads/Wolf_Gravestone.png`, 199.99],
      ['Staff of Homa', 'POLEARM', 'A polearm that was used in ancient rituals. It is said to have the power to purify all that is evil.', 20, `${BASE_URL}/uploads/Staff_Of_Homa.png`, 299.99],
      ["Kagura's Verity", 'CATALYST', 'The bells used when performing the Kagura Dance. Blessed by the Guuji herself, it smells of fresh cherry blossoms.', 8, `${BASE_URL}/uploads/Kagura's_Verity.png`, 189.99],
      ['Aqua Simulacra', 'BOW', 'A longbow that glistens with a clean, water-like blue. Its arrows flow like mountain springs.', 12, `${BASE_URL}/uploads/Aqua_Simulacra.png`, 229.99]
    ];
    await pool.batch(insertWeaponQuery, weapons);
    console.log('Weapons seeded successfully.');

    // 4. Create Artifacts
    console.log('Seeding Artifacts...');
    const insertArtifactQuery = `INSERT INTO Artifact (name, type, description, stock, imageUrl, price) VALUES (?, ?, ?, ?, ?, ?)`;
    const artifacts = [
      // Crimson Witch
      ["Witch's Flower of Blazes", 'FLOWER', 'A flower touched by the Crimson Witch of Flames. Its warm petals burn with a gentle, eternal ember.', 50, `${BASE_URL}/uploads/Flower_Witch_Flower_of_Blaze.png`, 49.99],
      ["Witch's Ever-Burning Plume", 'PLUME', 'A feather plucked from a bird that flew through the fires. It still crackles with heat.', 45, `${BASE_URL}/uploads/Witch_Ever-Burning_Plume.jpg`, 49.99],
      ["Witch's End Time", 'SANDS', 'A sandglass containing liquid fire instead of sand. It measures the passage of a burning lifetime.', 30, `${BASE_URL}/uploads/Witch_End_Time.png`, 59.99],
      // Obsidian Codex
      ['Reckoning of the Xenogenic', 'FLOWER', 'An artifact shaped like a tooth, used by Saurian Hunters to reckon their prey. It carries the weight of many hunts.', 40, `${BASE_URL}/uploads/Reckoning_of_the_xenogenic.png`, 55.00],
      ['Root of the Spirit-Marrow', 'PLUME', "A dark feather extracted from a nocturnal beast. It hums with the pulse of Natlan's leylines.", 35, `${BASE_URL}/uploads/Root_Of_The_Spirit_Marrow.png`, 55.00],
      ['Myths of the Night Realm', 'SANDS', 'A timepiece that uses fine phlogiston sand to measure the flow of nightsoul energy.', 25, `${BASE_URL}/uploads/Myths_of_the_Night_Realms.png`, 65.00],
      ['Pre-Banquet of the Contenders', 'GOBLET', 'A vessel designed for ritualistic drinking before a great battle. It is stained with the victories of old.', 20, `${BASE_URL}/uploads/Pre_Banquet_of_Contenders.png`, 75.00],
      ['Crown of the Saints', 'CIRCLET', 'A sacred crown that bestows the blessings of the ancient saints upon its wearer.', 15, `${BASE_URL}/uploads/Crown_Of_The_Saints.png`, 85.00],
      // Fragment of Harmonic Whimsy
      ['Harmonious Symphony Prelude', 'FLOWER', 'A pristine flower that resonates with the sweet prelude of a long-lost golden symphony.', 42, `${BASE_URL}/uploads/Harmonicus_Symphony_Prelude.png`, 50.00],
      ["Ancient Sea's Nocturnal Musing", 'PLUME', 'A feather that captured the musings of a midnight breeze blowing across the ancient, deep sea.', 38, `${BASE_URL}/uploads/Ancient_Sea_Nocturnal_Musing.png`, 50.00],
      ['The Grand Jape of the Turning of Fate', 'SANDS', 'A mystical timepiece representing the whimsical jokes that fate plays on mortals.', 28, `${BASE_URL}/uploads/The_Grand_Jape_Of_The_Turning_Fate.png`, 60.00],
      ['Ichor Shower Rhapsody', 'GOBLET', 'A chalice filled with liquid gold, playing a rhapsody to the gods of the old sea.', 22, `${BASE_URL}/uploads/Ichor_Shower_Rhapsody.png`, 70.00],
      ['Whimsical Dance of the Withered', 'CIRCLET', 'A headpiece made of petrified petals, capturing the final, elegant dance of the withered.', 18, `${BASE_URL}/uploads/Whimsical_Dance_Of_The_Withered.png`, 80.00],
      // Unfinished Reverie
      ['Dark Fruit of Bright Flowers', 'FLOWER', 'A flower carved from grey stone covered with gold foil. It was used during a war to differentiate friend from foe.', 33, `${BASE_URL}/uploads/Dark_Fruit_Of_Bright_Flowers.png`, 48.00]
    ];
    await pool.batch(insertArtifactQuery, artifacts);
    console.log('Artifacts seeded successfully.');

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
