const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'cuong@gmail.com';
  const password = 'Cuong2004';
  const name = 'Admin Cuong';

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    console.log('User already exists');
    // Update role to ADMIN just in case
    await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });
    console.log('Updated existing user to ADMIN role');
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log('Created new ADMIN user: cuong@gmail.com');
  }
}

createAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
