import React, { useCallback } from "react";
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
import {  useNavigate } from "react-router-dom";

function Bottombar1() {
  
const path=sessionStorage.getItem("path")
  const navigate = useNavigate();

  const openAnalytics = (e) => {
    // navigate("/analyties");
    navigate(`/${path}`)

  };

  return (
    <>
      <div className="container">
        <div className="bottombar">
          <div className="analytics" onClick={openAnalytics}>
            <img className="icon" src={Analytics}></img>
            <div className="text">Call Analytics</div>
          </div>
          <div className="activities">
            <div className="camera-button"  data-switch="audio">
            <img className="icon" src={Microphone}></img>

              {/* <div>
                {userVideoAudio.audio ? (
                  <img className="icon" src={Microphone}></img>
                ) : (
                  // <FaIcon className='fas fa-video'></FaIcon>
                  <img className="icon" src={Mutemicrophone}></img>
                  // <FaIcon className='fas fa-video-slash'></FaIcon>
                )}
              </div> */}
            </div>
            <div className="camera-button"  data-switch="video">
            <img className="icon" src={VideoIcon}></img>
              {/* <div>
                {userVideoAudio.video ? (
                  <img className="icon" src={VideoIcon}></img>
                ) : (
                  // <FaIcon className='fas fa-video'></FaIcon>
                  <img className="icon" src={VideoOffIcon}></img>
                  // <FaIcon className='fas fa-video-slash'></FaIcon>
                )}
              </div> */}
            </div>
            <div >
              <img className="icon" src={Screenshare}></img>
            </div>
            <div className="call-container" >
              <img className="call-icon" src={Hangup}></img>
            </div>
          </div>
          <div className="chat"  >
            <div>
              <img src={Chat}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bottombar1;
