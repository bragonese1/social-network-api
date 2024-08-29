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

