const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  email: String,
  role: String,
  image: String,
  password: String,
  enabled: Boolean,
});

mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
  seedDatabase();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/rhcv');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await connectToDatabase();
  try {
    await User.insertMany([
      {
        name: "Admin",
        email: "admin@gmail.com",
        role: "Admin",
        image: "https://localhost:5001/files/user.jpeg",
        password: "$2a$10$dteGbvU8zzgY7AvCgmE8Q.HFdoJ81ihPxGxF82041oF/fgYj.RcQa",
      },
      {
        name: "John",
        email: "john@gmail.com",
        password: "$2a$10$riJ6EA7PIiBLktaaME/NmO4eN4KV80MLiPo/hr/w.604IDwcrn0bW",
        image: "https://localhost:5001/files/user.jpeg",
        role: "Receptionist",
        enabled: true,
      },
    ]);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};
seedDatabase();
