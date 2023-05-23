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
    ref: 'User' // Reference to the User model
  },
  Happy: {
    type: Number,
    required: true
  },
  sad:{
    type: Number,
    required: true
  },
  Anger:{
    type: Number,
    required: true
  },
  Surprise:{
    type: Number,
    required: true
  },
  Fear:{
    type: Number,
    required: true
  },
  Neural:{
    type: Number,
    required: true
  }
});


const Collection1 = mongoose.model("User", userSchema);
const Collection2=mongoose.model("Session",sessionSchema);

module.exports = {
  Collection1,
  Collection2,
};