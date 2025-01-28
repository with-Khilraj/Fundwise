const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const seedAdminUser = async () => {
  const email = 'admin@gmail.com'; // Set the admin email
  const password = 'admin123'; // Set the admin password

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('Admin user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const adminUser = new User({
    firstName: 'Admin',
    lastName: 'User',
    email,
    password: hashedPassword,
    role: 'admin'
  });

  await adminUser.save();
  console.log('Admin user created successfully');
  mongoose.connection.close();
};

seedAdminUser();
