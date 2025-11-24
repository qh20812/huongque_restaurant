import { PrismaClient } from '../app/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new (PrismaClient as any)({} as any);

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@huongque.vn' },
    update: {},
    create: {
      email: 'admin@huongque.vn',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin Hương Quê',
    },
  });
  console.log('Admin tạo thành công: admin@huongque.vn / admin123');
}

main().then(() => prisma.$disconnect());