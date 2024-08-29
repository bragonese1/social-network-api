// Bringing in models from Mongoose and a date formatting function
const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');
const reactionSchema = require('./Reaction'); // importing reaction schema

// Creating a schema for thoughts
const thoughtSchema = new Schema(
    {
      // The text of the thoughts
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      // Timestamp When the thought was created
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => formatDate(timestamp),
      },
      // The username of the person who posted the thought
      username: {
        type: String,
        required: true,
      },
      // An array of reactions
      reactions: [reactionSchema],
    },
    {
      // Makes sure virtuals and getters are included when we turn this into JSON
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  // Add a virtual property to count the number of reactions
  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  // Creates the Thought model using the thoughtSchema
  const Thought = model('Thought', thoughtSchema);
  
  // Exports the Thought model so we can use it elsewhere
  module.exports = Thought;