// Test if Prisma client can be loaded
async function testPrismaClient() {
  try {
    console.log('Attempting to load Prisma client...');
    const { PrismaClient } = require('@prisma/client');
    console.log('✓ Prisma client loaded successfully!');
    
    const prisma = new PrismaClient();
    console.log('✓ Prisma client instantiated!');
    
    // Try a simple query
    const userCount = await prisma.user.count();
    console.log(`✓ Database connection successful! Users in DB: ${userCount}`);
    
    await prisma.$disconnect();
    console.log('✓ Disconnected successfully!');
  } catch (err) {
    console.error('✗ Error:', err.message);
    console.error('Full error:', err);
  }
}

testPrismaClient();
