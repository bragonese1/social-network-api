// Importing the necessary modules from Mongoose
const { Schema, model } = require('mongoose');

// Defining the schema for the User model
const userSchema = new Schema(
  {
    // Username field, required and unique with no extra spaces
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Email field, required and unique with validation to match an email format
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    // Array of Thought references, linking to Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // Array of Friend references, linking to User model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Including virtuals when converting document to JSON
    toJSON: {
      virtuals: true,
    },
    // Disabling the default 'id' virtual
    id: false,
  }
);

// Adding a virtual field 'friendCount' to count the number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Creating the User model from the schema
const User = model('User', userSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
