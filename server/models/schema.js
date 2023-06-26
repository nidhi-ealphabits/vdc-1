const mongoose = require("mongoose");

// const sessionSchema = new mongoose.Schema({
//   session: {
//     type: String,
//     required: true
//   }
// });

const sessionSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    // required: true,
    default: Date.now
  },
  users: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true
    },
    entryTime: {
      type: Date,
      // required: true
    },
    exitTime: {
      type: Date
    },
    status: {
      type: String,
      default: 'Joined'
    }
  }]
});


const userSchema = new mongoose.Schema({
  session_id: {
    type: String,
    ref: 'Session',
  },
  name: {
    type: String,
    required: true,
  }
});


const emotionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: 'User',
  },
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