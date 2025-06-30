import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@leadlist.com' }
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
  } else {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@leadlist.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created:', admin.email);
  }

  // Check if regular user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: 'user@leadlist.com' }
  });

  if (existingUser) {
    console.log('✅ Regular user already exists');
  } else {
    // Create regular user
    const hashedPassword = await bcrypt.hash('user123', 12);
    
    const user = await prisma.user.create({
      data: {
        email: 'user@leadlist.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'USER'
      }
    });

    console.log('✅ Regular user created:', user.email);
  }

  // Create default categories
  const categories = [
    { name: 'Novi Klijenti', description: 'Potencijalni novi klijenti', color: '#3b82f6' },
    { name: 'Postojeći Klijenti', description: 'Aktivni postojeći klijenti', color: '#10b981' },
    { name: 'Partnerstva', description: 'Mogućnosti za partnerstvo', color: '#8b5cf6' },
    { name: 'Preporuke', description: 'Preporučeni klijenti', color: '#f59e0b' },
    { name: 'Internetska prodaja', description: 'Online trgovina', color: '#ef4444' }
  ];

  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: category.name }
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category
      });
      console.log(`✅ Category created: ${category.name}`);
    } else {
      console.log(`✅ Category already exists: ${category.name}`);
    }
  }

  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 