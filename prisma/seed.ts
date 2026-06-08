import prisma from "../src/config/prisma"
import * as bcrypt from 'bcrypt';

async function main() {
  console.log('Seeding database...');

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
        imageUrl: 'https://api.ambr.top/assets/UI/UI_EquipIcon_Sword_Narukami.png',
        price: 249.99,
      },
      {
        name: "Wolf's Gravestone",
        type: 'CLAYMORE',
        description: 'A longsword used by the Greatwolf of Boreas. Originally just a heavy sheet of iron, it became legendary in battle.',
        stock: 10,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_EquipIcon_Claymore_Wolfmound.png',
        price: 199.99,
      },
      {
        name: 'Staff of Homa',
        type: 'POLEARM',
        description: 'A polearm that was used in ancient rituals. It is said to have the power to purify all that is evil.',
        stock: 20,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_EquipIcon_Pole_Homa.png',
        price: 299.99,
      },
      {
        name: "Kagura's Verity",
        type: 'CATALYST',
        description: 'The bells used when performing the Kagura Dance. Blessed by the Guuji herself, it smells of fresh cherry blossoms.',
        stock: 8,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_EquipIcon_Catalyst_Kagura.png',
        price: 189.99,
      },
      {
        name: 'Aqua Simulacra',
        type: 'BOW',
        description: 'A longbow that glistens with a clean, water-like blue. Its arrows flow like mountain springs.',
        stock: 12,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_EquipIcon_Bow_Kirin.png',
        price: 229.99,
      },
    ],
  });

  console.log('Weapons seeded successfully.');

  // 4. Create Artifacts
  const artifacts = await prisma.artifact.createMany({
    data: [
      {
        name: "Witch's Flower of Blazes",
        type: 'FLOWER',
        description: 'A flower touched by the Crimson Witch of Flames. Its warm petals burn with a gentle, eternal ember.',
        stock: 50,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_RelicIcon_15003_4.png',
        price: 49.99,
      },
      {
        name: "Witch's Ever-Burning Plume",
        type: 'PLUME',
        description: 'A feather plucked from a bird that flew through the fires. It still crackles with heat.',
        stock: 45,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_RelicIcon_15003_2.png',
        price: 49.99,
      },
      {
        name: "Witch's Enduring Timepiece",
        type: 'SANDS',
        description: 'A sandglass containing liquid fire instead of sand. It measures the passage of a burning lifetime.',
        stock: 30,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_RelicIcon_15003_5.png',
        price: 59.99,
      },
      {
        name: "Witch's Heart Flames",
        type: 'GOBLET',
        description: 'A vessel filled with liquid fire. It radiates a dangerous but comforting heat to the touch.',
        stock: 25,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_RelicIcon_15003_1.png',
        price: 69.99,
      },
      {
        name: "Witch's Scorching Hat",
        type: 'CIRCLET',
        description: 'A large hat that once belonged to the Crimson Witch. It shielded her eyes from the blinding ashes.',
        stock: 15,
        imageUrl: 'https://api.ambr.top/assets/UI/UI_RelicIcon_15003_3.png',
        price: 79.99,
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
