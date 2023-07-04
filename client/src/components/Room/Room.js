import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Peer from "simple-peer";
// import Analyties from "../Analyties/Analyties";
import { Row, Col, Toast } from "react-bootstrap";
import Bottombar from "../Bottombar/Bottombar";
import Main from "../Main/Main";
import Header from "../Header/Header";
// import CardGrid from "./CardGrid";
import socket from "../Socket/socket";
import VideoCard from "./VideoCard";
import audioOffImage1 from "../../assests/Mutemicrophone.svg"
import audioOffImage from "../../assests/Mute-white.svg"

import "./Room.css";
import "./responsive.css";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import Chat from "../Chat/Chat";
import * as faceapi from "face-api.js";
import axios from "axios";
// import { display } from "@mui/system";
let intervalId = null;

function Room() {
  const [username, setUserName] = useState("");
  const [error, setError] = useState(false);
  const currentUser = sessionStorage.getItem("user");
  // const roomId = sessionStorage.getItem("path");
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
  const [isStreamOn, setIsStreamOn] = useState(false);
  const streamRef = useRef(null);
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

  const path = window.location.pathname;
  const roomId = path.substring(1);

  useEffect(() => {
    //modal for username
    setModal(true);
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    //   if(room){
    // loadModels();
    //   }
    // if(userVideoRef){ loadModels();}

    isStreamOn && loadModels();
    // return () => {
    //   socket.disconnect();
    // };
  }, [isStreamOn]);

  //  useEffect(()=>{
  //       //  setTimeout(() => {
  //     sendDataToDb();
  //   // }, 3000);
  // },[])

  useEffect(() => {
    // console.log(roomId)
    if (room) {
      userVideoRef && sendDataToDb();
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
          streamRef.current = stream; // Store the stream in a ref
          setIsStreamOn(true);

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

  const sendDataToDb = async () => {
    setInterval(async () => {
      const emotionCounts = JSON.parse(sessionStorage.getItem("emotionCounts"));

      if (emotionCounts != null) {
        console.log("Emotion counts: ", emotionCounts);
        const user_id = sessionStorage.getItem("user_id");
        // try {
        //   const response = await fetch("http://localhost:8000/emotions", {
        //     // const response = await fetch("https://testwebapp.ealphabits.com/emotions", {

        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       user_id: user_id,
        //       emotion: emotionCounts,
        //     }),
        //   });

        //   if (response.ok) {
        //     console.log("Emotion data sent successfully");
        //   } else {
        //     console.error("Error sending emotion data:", response.statusText);
        //   }
        // } catch (error) {
        //   console.error("Error sending emotion data:", error);
        // }
      }
    }, 1000);
  };

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
    setModal(false);
    setRoom(true);

    // posting user and session to the database
    // fetch("http://localhost:8000/users", {
    //   // fetch("https://testwebapp.ealphabits.com/users", {
    //   method: "POST",
    //   mode: "cors",
    //   cache: "no-cache",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   redirect: "follow",
    //   referrerPolicy: "no-referrer",
    //   body: JSON.stringify({
    //     name: username,
    //     session: roomId,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log("data",data)
    //     sessionStorage.setItem("user", username);
    //     sessionStorage.setItem("user_id", data.userId);
    //     sessionStorage.setItem("session_id", data.sessionId);
    //     sessionStorage.setItem("session", roomId);
        
    //     setModal(false);
    //     setRoom(true);
    //     // props.onClose();
    //   })
    //   .catch((err) => console.error(err));
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
    intervalId = setInterval(async () => {
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

        sessionStorage.setItem("emotionCounts", JSON.stringify(emotionCounts));
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
  
  function writeAudioStatus(userName, index) {
    if(userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].audio) {
        return (
          <img src={audioOffImage} alt="Audio Off" className="audio-off" />
        );
      } else {
        return null; // Render nothing if audio is on
      }
    }
  }

  //function for writing user name when camera is off
  function writeUserName(userName, index) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return (
          <div className="UserName video-off" key={userName}>
            {userName}
          </div>
        );
      } else {
        return (
          <div className="UserName video-on" key={userName}>
            {userName}
          </div>
        );
      }
    }
  }

  // Open Chat
  const clickChat = (e) => {
    e.stopPropagation();
    // setDisplayChat((state) => !state);
    setDisplayChat(!displayChat);
    console.log("display", displayChat);
  };

  // BackButton
  const goToBack = async (e) => {
    e.preventDefault();
    navigate("/analytics");
    try {
      await axios.post(`/users/${currentUser}/exitTime`);
    } catch (error) {
      console.error("Error updating user exit time:", error);
    }
    socket.emit("BE-leave-room", { roomId, leaver: currentUser });
    clearInterval(intervalId);
    sessionStorage.removeItem("emotionCounts");
    socket.disconnect();
    // const streamData = userVideoRef.current.srcObject;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null; // Clear the stored stream reference
      userVideoRef.current.srcObject = null;
    }

    sessionStorage.removeItem("user");
    // toggleAnalytics();
   

    // setTimeout(() => {
    //   toggleAnalytics();
    // }, 1000);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
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
          streamRef.current = stream; // Store the stream in a ref
          setIsStreamOn(true);
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
  };
  const closeChat=()=>{
    setDisplayChat(false);
  }

  return (
    <>
      {modal && (
        <>
          <Modal show={modal} onHide={handleClose} backdrop="static" centered>
            <Modal.Header>
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
                Join
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {room && (
        <>
          <Header />
          <div style={{ zIndex: 1, backgroundColor:"#f0f0f0" }}>
            {peers.length === 0 ? (
              <div className="videoContainer">
                <div className="one-video">
                  <div
                    className={`UserName ${
                      userVideoAudio["localUser"].video
                        ? "video-on"
                        : "video-off"
                    }`}
                  >
                    {currentUser}
                  </div>
                  
                  { userVideoAudio["localUser"].audio
                        ? null
                        :  <img src={audioOffImage} alt="Audio Off" className="audio-off" />}

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
                  <div
                    className={`UserName ${
                      userVideoAudio["localUser"].video
                        ? "video-on"
                        : "video-off"
                    }`}
                  >
                    {currentUser}
                  </div>
                  { userVideoAudio["localUser"].audio
                        ? null
                        :  <img src={audioOffImage} alt="Audio Off" className="audio-off" />}
                  <video
                    //  className="video-card"
                    ref={userVideoRef}
                    muted
                    playsInline
                    autoPlay
                  ></video>
                </div>

                {peers.map((peer, index, arr) => (
                  <div
                    className={`video-box width-peer${
                      peers.length > 8 ? "" : peers.length
                    }`}
                    key={index}
                  >
                    {writeUserName(peer.userName)}
                    {writeAudioStatus(peer.userName)}
                    <VideoCard key={index} peer={peer} number={arr.length} />
                  </div>
                ))}
              </div>
            )}
          </div>
         
          <Chat display={displayChat} roomId={roomId} closeChat={closeChat} />
          {!analytics && (
          <Bottombar
            toggleAnalytics={toggleAnalytics}
            clickScreenSharing={clickScreenSharing}
            clickChat={clickChat}
            goToBack={goToBack}
            toggleCameraAudio={toggleCameraAudio}
            userVideoAudio={userVideoAudio["localUser"]}
            screenShare={screenShare}
          />
          )}
        </>
      )}
     
    </>
  );
}

export default Room;
