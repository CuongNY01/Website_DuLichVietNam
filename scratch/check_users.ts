import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    console.log("Users in DB:", users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
