import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    const toursCount = await prisma.tour.count();
    const hotelsCount = await prisma.hotel.count();
    console.log(`Connection successful!`);
    console.log(`Tours in DB: ${toursCount}`);
    console.log(`Hotels in DB: ${hotelsCount}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
