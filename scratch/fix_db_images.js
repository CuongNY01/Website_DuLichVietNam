const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Fixing Database Images ---');

  // Update Articles
  await prisma.article.updateMany({
    where: { image: { contains: 'unsplash' } },
    data: { image: '/news/food.png' }
  });

  // Update Hotels (if any external links are broken, we replace with local or working ones)
  await prisma.hotel.updateMany({
    where: { image: { contains: 'unsplash' } },
    data: { image: '/promo_japan.png' }
  });

  // Update Tours
  await prisma.tour.updateMany({
    where: { image: { contains: 'unsplash' } },
    data: { image: '/hero_bg.png' }
  });

  console.log('Done fixing images in database.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
