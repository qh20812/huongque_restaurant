console.log('Node version:', process.version);

// Try to require from generated location directly
try {
  console.log('\nAttempt 1: Load from generated location');
  const { PrismaClient } = require('../node_modules/@prisma/client/.prisma/client');
  console.log('✓ PrismaClient loaded from generated location');
  
  const prisma = new PrismaClient();
  console.log('✓ PrismaClient instantiated successfully!');
  console.log('Client version:', prisma._clientVersion);
  
  prisma.$disconnect();
} catch (err) {
  console.error('✗ Error:', err.message);
}
