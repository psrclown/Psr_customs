/**
 * Seed Script - Populates database with initial data
 * Run: npm run seed
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');

const services = [
  {
    name: 'Ceramic Coating',
    description: 'Premium ceramic coating provides long-lasting protection with hydrophobic properties. Keeps your vehicle looking showroom fresh with enhanced gloss and UV resistance.',
    priceMin: 15000,
    priceMax: 50000,
    duration: 24,
  },
  {
    name: 'Paint Protection Film (PPF)',
    description: 'Invisible shield that protects your paint from stone chips, scratches, and minor abrasions. Self-healing technology for minor scratches.',
    priceMin: 25000,
    priceMax: 80000,
    duration: 48,
  },
  {
    name: 'Car Washing & Detailing',
    description: 'Complete exterior wash with hand drying, wheel cleaning, and tire dressing. Interior vacuum, dashboard wipe, and window cleaning included.',
    priceMin: 500,
    priceMax: 2000,
    duration: 2,
  },
  {
    name: 'Interior Cleaning',
    description: 'Deep interior cleaning including upholstery shampooing, leather conditioning, carpet extraction, and odor elimination.',
    priceMin: 2000,
    priceMax: 8000,
    duration: 4,
  },
  {
    name: 'Scratch & Paint Correction',
    description: 'Professional paint correction to remove swirl marks, scratches, and oxidation. Restores your paint to like-new condition.',
    priceMin: 5000,
    priceMax: 25000,
    duration: 8,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data (optional - comment out in production)
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@psrcustoms.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@psrcustoms.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@psrcustoms.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Insert services
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();
