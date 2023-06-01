const express = require("express");
const app = express();
const http = require("http").createServer(app);
const fs = require("fs");
const { hostname } = require("os");
const path = require("path");
const cors = require("cors");
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8000;

let socketList = {};
// database connection
// const User = require("./models/schema");
const { User, Session, Emotion } = require("./models/schema.js");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/webrtc")
  .then(() => console.log("Database Connected Successfully"))
  .catch((error) => console.log(error));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(cors());

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/build/index.html')),
//     function(err){
//       if(err){
//         res.status(500).send(err);
//       }
//     }
//   });

// Route
app.get("/ping", (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});

app.post("/users", async (req, res) => {
  try {
    // Retrieve values from input fields
    const name = req.body.name;
    const session = req.body.session;
    //   // Insert values into the User collection
    //   const a1= await User.create({ name });
    //   // Insert values into the Session collection
    //  const a2= await Session.create({ session });
    //  a1.session_id.push(a2._id); // Add the session ID to the user's session_id array
    //   await user.save(); // Save the updated user document
    // res.send({ userId: a1._id, sessionId: a2._id });
    const user = await User.create({ name }); // Create a new User document

    let sessionDoc = await Session.findOne({ session }); // Check if a Session document with the same session name exists

    if (!sessionDoc) {
      // If no matching Session document found, create a new one
      sessionDoc = new Session({ session }); // Create a new Session document
      await sessionDoc.save(); // Save the new Session document
    }

    user.session_id.push(sessionDoc._id); // Add the session ID to the user's session_id array
    await user.save(); // Save the updated user document

    sessionDoc.user_id.push(user._id); // Add the user ID to the session's user_id array
    await sessionDoc.save(); // Save the updated session document

    res.send({ userId: user._id, sessionId: sessionDoc._id });
    // res.send('Values added to both collections successfully.');
  } catch (error) {
    console.error("Error adding values to collections:", error);
    res.status(500).send("Error adding values to collections");
  }
  // const user = new User({
  //   name: req.body.name,
  // });
  // try {
  //   const a1 = await user.save();
  //   res.json(a1);
  // } catch (err) {
  //   console.log(err);
  // }
});

// Create an endpoint to handle the creation of emotion data
// app.post('/emotions', async (req, res) => {
//   console.log(req.body)
//   try {
//     const userId = req.body.user_id; // Assuming the user ID is passed in the request body
//     const emotions = req.body.emotion; // Assuming the emotion data is passed in the request body as an object

//     const newEmotion = new Emotion({
//       user_id: userId,
//       emotion: emotions,
//     });

//     await newEmotion.save();

//     newEmotion.user_id.push(userId);
//     res.status(201).json(newEmotion);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.post("/emotions", async (req, res) => {
  try {
    const userId = req.body.user_id; // Assuming the user ID is passed in the request body
    const emotions = req.body.emotion; // Assuming the emotion data is passed in the request body as an object

    // Check if there is an existing document for the user
    const existingEmotion = await Emotion.findOne({ user_id: userId });

    if (existingEmotion) {
      // Update the existing document with the new emotion counts
      existingEmotion.emotion = emotions;
      await existingEmotion.save();
      res.status(200).json(existingEmotion);
    } else {
      // Create a new document for the user
      const newEmotion = new Emotion({
        user_id: userId,
        emotion: emotions,
      });
      await newEmotion.save();
      res.status(201).json(newEmotion);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Socket
io.on("connection", (socket) => {
  console.log(`New User connected: ${socket.id}`);
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User disconnected!");
  });

  socket.on("BE-check-user", ({ roomId, userName }) => {
    // console.log("BE-CHECK_USER", roomId, userName);
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit("FE-error-user-exist", { error });
    });
  });

  /**
   * Join Room
   */
  socket.on("BE-join-room", ({ roomId, userName }) => {
    // console.log("BE-JOIN-ROOM", roomId, userName);
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        // console.log("userlist",users)
        socket.broadcast.to(roomId).emit("FE-user-join", users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit("FE-error-user-exist", { err: true });
      }
    });
  });

  socket.on("BE-call-user", ({ userToCall, from, signal }) => {
    // console.log("BE-CALL-USER", userToCall);

    io.to(userToCall).emit("FE-receive-call", {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on("BE-accept-call", ({ signal, to }) => {
    // console.log("BE-ACCEPT-CALL");

    io.to(to).emit("FE-call-accepted", {
      signal,
      answerId: socket.id,
    });
  });

  socket.on("BE-send-message", ({ roomId, msg, sender }) => {
    // console.log("send message", roomId, "+", msg, "+", sender);
    io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
  });

  socket.on("BE-leave-room", ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit("FE-user-leave", { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on("BE-toggle-camera-audio", ({ roomId, switchTarget }) => {
    if (switchTarget === "video") {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit("FE-toggle-camera", { userId: socket.id, switchTarget });
  });
});

http.listen(PORT, () => {
  console.log("Connected..!! ", PORT);
});
