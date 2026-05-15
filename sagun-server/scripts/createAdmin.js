const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const MONGO = process.env.MONGO_URI;
if (!MONGO) {
  console.error('MONGO_URI not found in environment. Please set it in .env');
  process.exit(1);
}

const admin = {
  firstName: process.env.ADMIN_FIRSTNAME || 'Admin',
  lastName: process.env.ADMIN_LASTNAME || 'User',
  age: process.env.ADMIN_AGE || '30',
  gender: process.env.ADMIN_GENDER || 'other',
  contactNumber: process.env.ADMIN_CONTACT || '09170000000',
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  type: 'admin',
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'AdminPass123!',
  address: process.env.ADMIN_ADDRESS || 'Local',
  isActive: true,
};

async function run() {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: admin.email });
    if (existing) {
      console.log(`User with email ${admin.email} already exists. Exiting.`);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(admin.password, 10);
    const newUser = await User.create({ ...admin, password: hashed });
    console.log('Admin user created:', { id: newUser._id.toString(), email: newUser.email });
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err.message || err);
    process.exit(1);
  }
}

run();
