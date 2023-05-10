import React, { useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Details from "./Details";

function JoinMeeting(props) {
  // const [showChildModal, setShowChildModal] = useState(false);
  const [code, setCode] = useState("");
const navigate=useNavigate()

  // const joinLink=window.location.origin + "/" + code
  const getCode = (e) => {
    setCode(e.target.value);
  };
  const joinRoom = () => {
    // console.log(code)
    // console.log(joinLink)
    sessionStorage.setItem("path",code)
    navigate(`${code}`)
    // setShowChildModal(true);
    
  };
  const handleClose = () => {
    setShowChildModal(false);
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Join Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInputGrid" label="Enter Code">
          <Form.Control
            type="text"
            autoComplete="off"
            value={code}
            onChange={getCode}
            placeholder="Enter Code"
          />
        </FloatingLabel>
       <Modal.Footer>
       <Button onClick={joinRoom}>Join Meeting</Button>
        {/* <Details link={joinLink} show={showChildModal} onClose={handleClose} /> */}
       </Modal.Footer>
        
      </Modal.Body>
    </Modal>
  );
}

export default JoinMeeting;
