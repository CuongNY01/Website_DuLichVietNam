const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- TOURS ---');
  const tours = await prisma.tour.findMany({ take: 8, orderBy: { createdAt: 'desc' } });
  tours.forEach(t => console.log(`${t.id}: ${t.image}`));

  console.log('\n--- HOTELS ---');
  const hotels = await prisma.hotel.findMany({ take: 4, orderBy: { rating: 'desc' } });
  hotels.forEach(h => console.log(`${h.id}: ${h.image}`));

  console.log('\n--- ARTICLES ---');
  const articles = await prisma.article.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  articles.forEach(a => console.log(`${a.id}: ${a.image}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
