import prisma from "../src/config/prisma"
import * as bcrypt from 'bcrypt';

async function main() {
  console.log('Seeding database...');

  const PORT = process.env.PORT || '3000';
  const BASE_URL = `http://localhost:${PORT}`;

  // 1. Clear existing data
  await prisma.purchaseItem.deleteMany({});
  await prisma.purchase.deleteMany({});
  await prisma.weapon.deleteMany({});
  await prisma.artifact.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Users
  const adminPassword = await bcrypt.hash('admin12345', 10);
  const userPassword = await bcrypt.hash('user12345', 10);

  const admin = await prisma.user.create({
    data: {
      username: 'GenshinAdmin',
      email: 'admin@genshinimport.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.create({
    data: {
      username: 'Traveler',
      email: 'user@genshinimport.com',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Users created:', { admin: admin.email, user: user.email });

  // 3. Create Weapons
  const weapons = await prisma.weapon.createMany({
    data: [
      {
        name: 'Mistsplitter Reforged',
        type: 'SWORD',
        description: 'A sword that blazes with a fierce violet light. It was once shattered, but has since been reforged.',
        stock: 15,
        imageUrl: `${BASE_URL}/uploads/Mistsplitter_Reforged.png`,
        price: 249.99,
      },
      {
        name: "Wolf's Gravestone",
        type: 'CLAYMORE',
        description: 'A longsword used by the Greatwolf of Boreas. Originally just a heavy sheet of iron, it became legendary in battle.',
        stock: 10,
        imageUrl: `${BASE_URL}/uploads/Wolf_Gravestone.png`,
        price: 199.99,
      },
      {
        name: 'Staff of Homa',
        type: 'POLEARM',
        description: 'A polearm that was used in ancient rituals. It is said to have the power to purify all that is evil.',
        stock: 20,
        imageUrl: `${BASE_URL}/uploads/Staff_Of_Homa.png`,
        price: 299.99,
      },
      {
        name: "Kagura's Verity",
        type: 'CATALYST',
        description: 'The bells used when performing the Kagura Dance. Blessed by the Guuji herself, it smells of fresh cherry blossoms.',
        stock: 8,
        imageUrl: `${BASE_URL}/uploads/Kagura's_Verity.png`,
        price: 189.99,
      },
      {
        name: 'Aqua Simulacra',
        type: 'BOW',
        description: 'A longbow that glistens with a clean, water-like blue. Its arrows flow like mountain springs.',
        stock: 12,
        imageUrl: `${BASE_URL}/uploads/Aqua_Simulacra.png`,
        price: 229.99,
      },
    ],
  });

  console.log('Weapons seeded successfully.');

  // 4. Create Artifacts
  const artifacts = await prisma.artifact.createMany({
    data: [
      // --- Crimson Witch of Flames (Partial) ---
      {
        name: "Witch's Flower of Blazes",
        type: 'FLOWER',
        description: 'A flower touched by the Crimson Witch of Flames. Its warm petals burn with a gentle, eternal ember.',
        stock: 50,
        imageUrl: `${BASE_URL}/uploads/Flower_Witch_Flower_of_Blaze.png`,
        price: 49.99,
      },
      {
        name: "Witch's Ever-Burning Plume",
        type: 'PLUME',
        description: 'A feather plucked from a bird that flew through the fires. It still crackles with heat.',
        stock: 45,
        imageUrl: `${BASE_URL}/uploads/Witch_Ever-Burning_Plume.jpg`,
        price: 49.99,
      },
      {
        name: "Witch's End Time",
        type: 'SANDS',
        description: 'A sandglass containing liquid fire instead of sand. It measures the passage of a burning lifetime.',
        stock: 30,
        imageUrl: `${BASE_URL}/uploads/Witch_End_Time.png`,
        price: 59.99,
      },

      // --- Obsidian Codex (Full Set) ---
      {
        name: 'Reckoning of the Xenogenic',
        type: 'FLOWER',
        description: 'An artifact shaped like a tooth, used by Saurian Hunters to reckon their prey. It carries the weight of many hunts.',
        stock: 40,
        imageUrl: `${BASE_URL}/uploads/Reckoning_of_the_xenogenic.png`,
        price: 55.00,
      },
      {
        name: 'Root of the Spirit-Marrow',
        type: 'PLUME',
        description: 'A dark feather extracted from a nocturnal beast. It hums with the pulse of Natlan\'s leylines.',
        stock: 35,
        imageUrl: `${BASE_URL}/uploads/Root_Of_The_Spirit_Marrow.png`,
        price: 55.00,
      },
      {
        name: 'Myths of the Night Realm',
        type: 'SANDS',
        description: 'A timepiece that uses fine phlogiston sand to measure the flow of nightsoul energy.',
        stock: 25,
        imageUrl: `${BASE_URL}/uploads/Myths_of_the_Night_Realms.png`,
        price: 65.00,
      },
      {
        name: 'Pre-Banquet of the Contenders',
        type: 'GOBLET',
        description: 'A vessel designed for ritualistic drinking before a great battle. It is stained with the victories of old.',
        stock: 20,
        imageUrl: `${BASE_URL}/uploads/Pre_Banquet_of_Contenders.png`,
        price: 75.00,
      },
      {
        name: 'Crown of the Saints',
        type: 'CIRCLET',
        description: 'A sacred crown that bestows the blessings of the ancient saints upon its wearer.',
        stock: 15,
        imageUrl: `${BASE_URL}/uploads/Crown_Of_The_Saints.png`,
        price: 85.00,
      },

      // --- Fragment of Harmonic Whimsy (Full Set) ---
      {
        name: 'Harmonious Symphony Prelude',
        type: 'FLOWER',
        description: 'A pristine flower that resonates with the sweet prelude of a long-lost golden symphony.',
        stock: 42,
        imageUrl: `${BASE_URL}/uploads/Harmonicus_Symphony_Prelude.png`,
        price: 50.00,
      },
      {
        name: "Ancient Sea's Nocturnal Musing",
        type: 'PLUME',
        description: 'A feather that captured the musings of a midnight breeze blowing across the ancient, deep sea.',
        stock: 38,
        imageUrl: `${BASE_URL}/uploads/Ancient_Sea_Nocturnal_Musing.png`,
        price: 50.00,
      },
      {
        name: 'The Grand Jape of the Turning of Fate',
        type: 'SANDS',
        description: 'A mystical timepiece representing the whimsical jokes that fate plays on mortals.',
        stock: 28,
        imageUrl: `${BASE_URL}/uploads/The_Grand_Jape_Of_The_Turning_Fate.png`,
        price: 60.00,
      },
      {
        name: 'Ichor Shower Rhapsody',
        type: 'GOBLET',
        description: 'A chalice filled with liquid gold, playing a rhapsody to the gods of the old sea.',
        stock: 22,
        imageUrl: `${BASE_URL}/uploads/Ichor_Shower_Rhapsody.png`,
        price: 70.00,
      },
      {
        name: 'Whimsical Dance of the Withered',
        type: 'CIRCLET',
        description: 'A headpiece made of petrified petals, capturing the final, elegant dance of the withered.',
        stock: 18,
        imageUrl: `${BASE_URL}/uploads/Whimsical_Dance_Of_The_Withered.png`,
        price: 80.00,
      },

      // --- Unfinished Reverie (Extra) ---
      {
        name: 'Dark Fruit of Bright Flowers',
        type: 'FLOWER',
        description: 'A flower carved from grey stone covered with gold foil. It was used during a war to differentiate friend from foe.',
        stock: 33,
        imageUrl: `${BASE_URL}/uploads/Dark_Fruit_Of_Bright_Flowers.png`,
        price: 48.00,
      },
    ],
  });

  console.log('Artifacts seeded successfully.');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
