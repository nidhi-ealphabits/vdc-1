import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import Analyties from "../Analyties/Analyties";
import { Row, Col } from "react-bootstrap";
import Bottombar from "../Bottombar/Bottombar";
import Main from "../Main/Main";
import Header from "../Header/Header";
import socket from "../Socket/socket";
import VideoCard from "./VideoCard";
import "./Room.css";
import "./responsive.css";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import Chat from "../Chat/Chat";
import * as faceapi from "face-api.js";
import axios from "axios";

function Room() {
  const [username, setUserName] = useState("");
  const [error, setError] = useState(false);
  const currentUser = sessionStorage.getItem("user");
  const roomId = sessionStorage.getItem("path");
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const [displayChat, setDisplayChat] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const [modal, setModal] = useState(false);
  const [room, setRoom] = useState(false);
  // const roomId = props.match.params.path;
  const regex = /^[a-zA-Z0-9_-\s]+$/;
  const navigate = useNavigate();
  //object of emotions
  let [emotionCounts, setEmotionCounts] = useState({
    Happy: 0,
    Sad: 0,
    Anger: 0,
    Surprise: 0,
    Fear: 0,
    Neutral: 0,
  });

  useEffect(() => {
    //modal for username
    setModal(true);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    //   if(room){
    // loadModels();
    //   }
    // if(userVideoRef){ loadModels();}
    loadModels();
    return () => {
      socket.disconnect();
    };
  });

  //  useEffect(()=>{
  //       //  setTimeout(() => {
  //     sendDataToDb();      
  //   // }, 3000);
  // },[])

  useEffect(() => {
    // console.log(roomId)
    if (room) {
      userVideoRef && sendDataToDb()
      // if(userVideoRef){ sendDataToDb()}
      setModal(false);

      // // Get Video Devices
      // navigator.mediaDevices
      //   .enumerateDevices()
      //   .then((devices) => {
      //     const filtered = devices.filter(
      //       (device) => device.kind === "videoinput"
      //     );
      //     setVideoDevices(filtered);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // Set Back Button Event
      window.addEventListener("popstate", goToBack);

      // Connect Camera & Mic
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          userVideoRef.current.srcObject = stream;
          userStream.current = stream;
          socket.emit("BE-join-room", { roomId, userName: currentUser });
          // console.log("stream",stream)

          socket.on("FE-user-join", (users) => {
            // all users
            const peers = [];
            users.forEach(({ userId, info }) => {
              let { userName, video, audio } = info;

              if (userName !== currentUser) {
                const peer = createPeer(userId, socket.id, stream);

                peer.userName = userName;
                peer.peerID = userId;

                peersRef.current.push({
                  peerID: userId,
                  peer,
                  userName,
                });
                peers.push(peer);

                setUserVideoAudio((preList) => {
                  return {
                    ...preList,
                    [peer.userName]: { video, audio },
                  };
                });
              }
            });
            setPeers(peers);
          });

          socket.on("FE-receive-call", ({ signal, from, info }) => {
            let { userName, video, audio } = info;
            const peerIdx = findPeer(from);

            if (!peerIdx) {
              const peer = addPeer(signal, from, stream);

              peer.userName = userName;

              peersRef.current.push({
                peerID: from,
                peer,
                userName: userName,
              });
              setPeers((users) => {
                return [...users, peer];
              });
              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          });

          socket.on("FE-call-accepted", ({ signal, answerId }) => {
            const peerIdx = findPeer(answerId);
            peerIdx.peer.signal(signal);
          });

          socket.on("FE-user-leave", ({ userId, userName }) => {
            const peerIdx = findPeer(userId);
            peerIdx.peer.destroy();
            setPeers((users) => {
              users = users.filter(
                (user) => user.peerID !== peerIdx.peer.peerID
              );
              return [...users];
            });
            peersRef.current = peersRef.current.filter(
              ({ peerID }) => peerID !== userId
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });

      socket.on("FE-toggle-camera", ({ userId, switchTarget }) => {
        const peerIdx = findPeer(userId);

        setUserVideoAudio((preList) => {
          let video = preList[peerIdx.userName].video;
          let audio = preList[peerIdx.userName].audio;

          if (switchTarget === "video") video = !video;
          else audio = !audio;

          return {
            ...preList,
            [peerIdx.userName]: { video, audio },
          };
        });
      });
    }

    // return () => {
    //   socket.disconnect();
    // };
    // eslint-disable-next-line
  }, [room]);

  const sendDataToDb = async()=>{
      setInterval(async() => {
      const emotionCounts = JSON.parse(sessionStorage.getItem("emotionCounts"))

      console.log("Emotion counts: ", emotionCounts);
      const user_id = sessionStorage.getItem("user_id");
      try {
        // const response = await fetch("http://localhost:8000/emotions", {
          const response = await fetch("https://15.206.231.201:8000/emotions", {
          // const response = await fetch("https://testwebapp.ealphabits.com:8000/emotions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            emotion: emotionCounts,
          }),
        });
  
        // if (response.ok) {
        //   console.log("Emotion data sent successfully");
        // } else {
        //   console.error("Error sending emotion data:", response.statusText);
        // }
      } catch (error) {
        console.error("Error sending emotion data:", error);
      }

    }, 1000);
  
  }

  // if (room) {
  //  userVideoRef &&  loadModels();
  // }

  //functions of username modal
  const handleClose = () => setModal(false);

  const handleShow = () => setModal(true);

  const getUserName = (e) => {
    const name = e.target.value;
    setUserName(name);
  };

  const join = (e) => {
    //validation for username
    if (username.length <= 0) {
      setError("UserName is Required..!!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      username === "" ||
      username === undefined ||
      !regex.test(username)
    ) {
      regex.test(username)
        ? setError("Name cannot be blank")
        : setError("Invalid Username");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    sessionStorage.setItem("user", username);
    // setModal(false);
    // setRoom(true);
    // posting user and session to the database
    // fetch("http://localhost:8000/users", {
      fetch("https://15.206.231.201:8000/users", {
      // fetch("https://testwebapp.ealphabits.com:8000/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name: username,
        session: roomId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data",data)
        sessionStorage.setItem("user", username);
        sessionStorage.setItem("user_id", data.userId);
        sessionStorage.setItem("session_id", data.sessionId);
        setModal(false);
        setRoom(true);
        // props.onClose();
      })
      .catch((err) => console.error(err));
    e.preventDefault();
  };

  //loading models from face api to get emotion Detection
  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceDetection();
    });
  };

  //emotion Detection Function
  const faceDetection = async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          userVideoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections[0]?.expressions) {
        const emotions = detections[0].expressions;
        const highestEmotion1 = Object.entries(emotions).reduce(
          (prev, curr) => {
            return prev[1] > curr[1] ? prev : curr;
          }
        )[0];

        console.log("emotion is : ", highestEmotion1);

        if (highestEmotion1 === "happy") {
          emotionCounts.Happy = emotionCounts.Happy + 1;
        } else if (highestEmotion1 === "sad") {
          emotionCounts.Sad = emotionCounts.Sad + 1;
        } else if (highestEmotion1 === "angry") {
          emotionCounts.Anger = emotionCounts.Anger + 1;
        } else if (highestEmotion1 === "surprised") {
          emotionCounts.Surprise = emotionCounts.Surprise + 1;
        } else if (highestEmotion1 === "fearful") {
          emotionCounts.Fear = emotionCounts.Fear + 1;
        } else if (highestEmotion1 === "neutral") {
          emotionCounts.Neutral = emotionCounts.Neutral + 1;
        } else {
          console.log("unknown emotion", highestEmotion1);
        }

        sessionStorage.setItem("emotionCounts",JSON.stringify(emotionCounts))
      }
    }, 3000);
  };

  //create a peer  using simple-peer
  function createPeer(userId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-call-user", {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on("disconnect", () => {
      peer.destroy();
    });
    return peer;
  }

  //add the peer
  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-accept-call", { signal, to: callerId });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  //find peer
  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }

  //function for writing user name when camera is off
  function writeUserName(userName, index) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return (
          <div className="UserName" key={userName}>
            {userName}
          </div>
        );
      }
    }
  }

  // Open Chat
  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

  // BackButton
  const goToBack = async (e) => {
    e.preventDefault();
    socket.emit("BE-leave-room", { roomId, leaver: currentUser });
    socket.disconnect()
    // Get the user ID from sessionStorage
    const userId = sessionStorage.getItem("user");
  
    // // Make a POST request to update the user's exit time
    // try {
    //   await axios.post("/users/exit", { userId });
    // } catch (error) {
    //   console.error("Error updating user exit time:", error);
    // }

  
    sessionStorage.removeItem("user");
    navigate("/");
  };

  //for toggling audio and video
  const toggleCameraAudio = (e, kind) => {
    const target = kind;
    // const target = e.target.getAttribute("data-switch");
    console.log("target", target);

    setUserVideoAudio((preList) => {
      let videoSwitch = preList["localUser"].video;
      let audioSwitch = preList["localUser"].audio;

      if (target === "video") {
        const userVideoTrack =
          userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        userVideoTrack.enabled = videoSwitch;
      } else {
        const userAudioTrack =
          userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;

        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
        }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    socket.emit("BE-toggle-camera-audio", { roomId, switchTarget: target });
  };

  //screenshare function
  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
          const screenTrack = stream.getTracks()[0];

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0]
                .getTracks()
                .find((track) => track.kind === "video"),
              screenTrack,
              userStream.current
            );
          });

          // Listen click end
          screenTrack.onended = () => {
            peersRef.current.forEach(({ peer }) => {
              peer.replaceTrack(
                screenTrack,
                peer.streams[0]
                  .getTracks()
                  .find((track) => track.kind === "video"),
                userStream.current
              );
            });
            userVideoRef.current.srcObject = userStream.current;
            setScreenShare(false);
          };

          userVideoRef.current.srcObject = stream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  //function for toggling the anaytics
  const toggleAnalytics = () => {
    setAnalytics((state) => !state);
    console.log("Hello", analytics);
  };

  return (
    <>
      {modal && (
        <>
          <Modal show={modal} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
              {/* <Modal.Title>Child Modal</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <FloatingLabel controlId="floatingInputGrid" label="User Name">
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="User Name"
                  value={username}
                  onChange={getUserName}
                />
              </FloatingLabel>
              {error && <span className="error">{error}</span>}
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ margin: "4px", width: "112px" }} onClick={join}>
                join
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {room && (
        <>
          {/* } */}
          <Header />
          <div style={{ zIndex: 1 }}>
            {peers.length === 0 ? (
              <div className="videoContainer">
                <div className="one-video">
                  {userVideoAudio["localUser"].video ? null : (
                    <div className="UserName">{currentUser}</div>
                  )}
                  {/* {writeUserName(peer.currentUser)} */}
                  {/* <i className="fas fa-expand"></i> */}
                  <video
                    className="video-display-box"
                    ref={userVideoRef}
                    muted
                    autoPlay
                    playsInline
                  ></video>
                </div>
              </div>
            ) : (
              <div className="videocontainer">
                <div
                  className={`video-box width-peer${
                    peers.length > 10 ? "" : peers.length
                  }`}
                >
                  {userVideoAudio["localUser"].video ? null : (
                    <div className="UserName">{currentUser}</div>
                  )}
                  {/* {writeUserName(peer.currentUser)} */}
                  {/* <i className="fas fa-expand"></i> */}
                  <video
                    //  className="video-card"
                    ref={userVideoRef}
                    muted
                    playsInline
                    autoPlay
                  ></video>
                </div>

                {/* display other user's video */}
                {peers.map((peer, index, arr) => (
                  //  createUserVideo(peer, index, arr)
                  <div
                    className={`video-box width-peer${
                      peers.length > 8 ? "" : peers.length
                    }`}
                    key={index}
                  >
                    {writeUserName(peer.userName)}
                    <VideoCard key={index} peer={peer} number={arr.length} />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div style={{ zIndex: 1 }}> */}
          <Bottombar
            toggleAnalytics={toggleAnalytics}
            clickScreenSharing={clickScreenSharing}
            clickChat={clickChat}
            goToBack={goToBack}
            toggleCameraAudio={toggleCameraAudio}
            userVideoAudio={userVideoAudio["localUser"]}
            screenShare={screenShare}
            // display={displayChat}
          />
          {/* <Chat display={displayChat} roomId={roomId} /> */}
          {/* </div> */}
        </>
      )}
      {analytics && (
        <div className="analytics-overlay">
          <Analyties />
        </div>
      )}
      {/* {displayChat && <Chat display={displayChat} roomId={roomId} />} */}
    </>
  );
}

export default Room;