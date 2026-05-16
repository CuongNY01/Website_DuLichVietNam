import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating accounts...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // 1. Admin Account
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Quản trị viên',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // 2. User Account
  await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      name: 'Người dùng mẫu',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Accounts created successfully!');
  console.log('Admin: admin@gmail.com / admin123');
  console.log('User: user@gmail.com / user123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
