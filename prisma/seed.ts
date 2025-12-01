import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Only seed the admin user; leave all other tables empty
  await prisma.user.upsert({
    where: { email: 'admin@huongque.vn' },
    update: {},
    create: {
      email: 'admin@huongque.vn',
      password: await bcrypt.hash('Admin123', 10),
      name: 'Admin',
      role: 'admin',
    },
  });

  console.log('Seeded only admin user');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
