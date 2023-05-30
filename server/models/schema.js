const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const sessionSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  }
});

const emotionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Happy: {
    type: Number,
    required: true,
  },
  Sad: {
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
  Neutral: {
    type: Number,
    required: true,
  },
});


const Collection1 = mongoose.model("User", userSchema);
const Collection2=mongoose.model("Session",sessionSchema);
const Emotion=mongoose.model("Emotion",emotionSchema);


module.exports = {
  Collection1,
  Collection2,
  Emotion
};