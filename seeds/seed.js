const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
const userSeed = require('./userSeed.json');
const thoughtSeed = require('./thoughtSeed.json');

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear out any existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(userSeed);
    console.log('Users seeded successfully.');

    // Insert thoughts
    const createdThoughts = await Thought.insertMany(thoughtSeed);
    console.log('Thoughts seeded successfully.');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedData();
