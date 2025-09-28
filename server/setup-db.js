// server/setup-db.js
// Script to setup database and create initial data

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Create admin user if not exists
    const adminExists = await prisma.user.findFirst({
      where: { email: 'admin@example.com' }
    });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
          name: 'Admin User',
          telephone: '0123456789',
          role: 'admin',
          enabled: true
        }
      });
      
      console.log('✅ Admin user created: admin@example.com / admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
    
    // Create test user if not exists
    const userExists = await prisma.user.findFirst({
      where: { email: 'user@example.com' }
    });
    
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('user123', 10);
      
      await prisma.user.create({
        data: {
          email: 'user@example.com',
          password: hashedPassword,
          name: 'Test User',
          telephone: '0987654321',
          role: 'user',
          enabled: true
        }
      });
      
      console.log('✅ Test user created: user@example.com / user123');
    } else {
      console.log('ℹ️ Test user already exists');
    }
    
    // Create sample cars if not exists
    const carCount = await prisma.car.count();
    
    if (carCount === 0) {
      const sampleCars = [
        {
          brand: 'Toyota',
          model: 'Camry',
          year: 2022,
          licensePlate: 'ABC-1234',
          pricePerDay: 1500,
          status: 'available'
        },
        {
          brand: 'Honda',
          model: 'Civic',
          year: 2021,
          licensePlate: 'DEF-5678',
          pricePerDay: 1200,
          status: 'available'
        },
        {
          brand: 'BMW',
          model: '3 Series',
          year: 2023,
          licensePlate: 'GHI-9012',
          pricePerDay: 2500,
          status: 'available'
        }
      ];
      
      for (const car of sampleCars) {
        await prisma.car.create({
          data: car
        });
      }
      
      console.log('✅ Sample cars created');
    } else {
      console.log(`ℹ️ ${carCount} cars already exist`);
    }
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('✅ Setup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    });
}

module.exports = setupDatabase;
