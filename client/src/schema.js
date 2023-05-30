const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  Happy: {
    type: Number,
    required: true,
  },
  sad: {
    type: Number,
    required: true,
  },
  Anger: {
    type: Number,
    required: true,
  },
  Surprise: {
    type: Number,
    required: true,
  },
  Fear: {
    type: Number,
    required: true,
  },
  Neural: {
    type: Number,
    required: true,
  },
});

const Emotion = mongoose.model("Emotion", emotionSchema);

module.exports = Emotion;
