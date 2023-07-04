import React, { useCallback,useState } from "react";
import "./Bottombar.css";
import { Container, Col, Row, Stack } from "react-bootstrap";
import Microphone from "../../assests/mic.svg";
import Mutemicrophone from "../../assests/Mutemicrophone.svg";
import Screenshare from "../../assests/Screenshare.svg";
import Hangup from "../../assests/Hangup.svg";
import Chat from "../../assests/Chat.svg";
import Analytics from "../../assests/Analytics.svg";
import VideoIcon from "../../assests/Videocamera.svg";
import VideoOffIcon from "../../assests/VideoSlash.svg";
import { useNavigate } from "react-router-dom";

function Bottombar({
  toggleAnalytics,
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare
}) {
  // const [show,setShow]=useState(true)
  // const handleToggle = useCallback(
  //   (e) => {
  //     setShowVideoDevices((state) => !state);
  //   },
  //   [setShowVideoDevices]
  // );

  const navigate = useNavigate();

  // const openAnalytics = (e) => {
  //   setShow(!show)
  //   if (show) {
  //     navigate("/analyties");
  //   } else {
  //     navigate("/")
  //   }
  // };

  return (
    <>
    {/* {show && (
      <>
      <Analytics/>
      </>
    )} */}
      <div className="container">
        <div className="bottombar">
          <div></div>
          {/* <div className="analytics"> */}
            {/* <img className="icon"  src={Analytics}></img> */}
            {/* <div className="text">Call Analytics</div> */}
          {/* </div> */}
          <div className="activities">
            <div className="camera-button" onClick={(e)=>toggleCameraAudio(e,'audio')} data-switch="audio">
              <div>
                {userVideoAudio.audio ? (
                  <img className="icon" src={Microphone}></img>
                ) : (
                  // <FaIcon className='fas fa-video'></FaIcon>
                  <img className="icon" src={Mutemicrophone}></img>
                  // <FaIcon className='fas fa-video-slash'></FaIcon>
                )}
              </div>
            </div>
            <div className="camera-button" onClick={(e)=>toggleCameraAudio(e,'video')} data-switch="video">
              <div>
                {userVideoAudio.video ? (
                  <img className="icon" src={VideoIcon}></img>
                ) : (
                  // <FaIcon className='fas fa-video'></FaIcon>
                  <img className="icon" src={VideoOffIcon}></img>
                  // <FaIcon className='fas fa-video-slash'></FaIcon>
                )}
              </div>
            </div>
            <div onClick={clickScreenSharing}>
              <img className="icon" src={Screenshare}></img>
            </div>
            <div className="call-container" onClick={goToBack}>
              <img className="call-icon" src={Hangup}></img>
            </div>
          </div>
          <div className="chat" onClick={clickChat} >
            <div>
              <img src={Chat}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bottombar;
