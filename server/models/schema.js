const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  session_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  }],
  name: {
    type: String,
    required: true,
    unique:true
  }
});


const emotionSchema = new mongoose.Schema({
  user_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  emotion: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});



const User = mongoose.model("User", userSchema);
const Session=mongoose.model("Session",sessionSchema);
const Emotion=mongoose.model("Emotion",emotionSchema);


module.exports = {
  User,
  Session,
  Emotion
};