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
    type: String,
    required: true
  },
  sad:{
    type: String,
    required: true
  },
  Anger:{
    type: String,
    required: true
  },
  Surprise:{
    type: String,
    required: true
  },
  Fear:{
    type: String,
    required: true
  },
  Neural:{
    type: String,
    required: true
  }
  // other emotion fields...
});


const Collection1 = mongoose.model("User", userSchema);
const Collection2=mongoose.model("Session",sessionSchema);

module.exports = {
  Collection1,
  Collection2,
};