import React, { useState } from "react";
import "./main.css";
import Img from '../../assests/Component 1 – 1.png'
import personIcon from "../../assests/personIcon.png";
import CreateMeeting from "./CreateMeeting";
import JoinMeeting from "./JoinMeeting";

function Main() {
  const [new_meeting, setNew_Meeting] = useState(false);
  const [join_meeting, setJoin_Meeting] = useState(false);

  const newMeeting = () => {
    setNew_Meeting(true);
  };

  const joinMeeting = () => {
    setJoin_Meeting(true);
  };
  return (
    <div className="home-page">
      <div className="header">
        <div className="logo"></div>

        <div className="description">
          <div className="time-and-date">23 March 2023, 2:04 PM</div>
          <div className="setting-icon"></div>
          <div className="avatar">
            <img className="person-icon" src={personIcon} alt="" />
          </div>
        </div>
      </div>

      <div className="main-content">
                <div className="left-content">
                    <div></div>
                   <div className="lft-content"> <div className="company-logo"></div>
                    <p className="main-text" >Secure video conferencing For everyone</p>
                    <div className="btnn">
                    <button className="custom-btn left-btn" onClick={newMeeting} >
                        <p className="left-btn-text">
                            New Meeting
                        </p>
                    </button>
                    {new_meeting && (
              <>
                <CreateMeeting
                  show={new_meeting}
                  onClose={() => setNew_Meeting(false)}
                />
              </>
            )}
                    <button className="custom-btn right-btn" onClick={joinMeeting} ><p className="right-btn-text">Join Meeting</p></button>
                    {join_meeting && (
              <>
                <JoinMeeting
                  show={join_meeting}
                  onClose={() => setJoin_Meeting(false)}
                />
              </>
            )}</div>
                    <a href="test" className="signup">Create your account</a>
                    </div>
                <div className="version-text">Version 1.0</div>
                </div>
                
                
                <div className="right-content">
                </div>

            </div>

        </div>

    
  );
}

export default Main;
