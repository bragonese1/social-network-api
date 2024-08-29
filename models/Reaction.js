// Bringing in models from Mongoose and a date formatting function
const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

// Creating a schema for reactions (like comments on a post)
const reactionSchema = new Schema(
  {
    // An unique ID for each reaction, automatically made
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // The text of the reaction, can't be empty and has a max length
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // The username of the person who reacted, required
    username: {
      type: String,
      required: true,
    },
    // Timestamp When the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp),
    },
  },
  {
    // Makes sure getters are included when we turn this into JSON
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;