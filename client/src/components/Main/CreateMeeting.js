import { useEffect, useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
// import Details from "./Details";
import {useNavigate} from 'react-router-dom'

function CreateMeeting(props) {
  const [showChildModal, setShowChildModal] = useState(false);

  const navigate=useNavigate();
  const randomString = [
    generateRandomLetters(3),
    generateRandomLetters(3),
    generateRandomLetters(3),
    generateRandomLetters(3),
  ].join('-');
  
  function generateRandomLetters(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [joinLink, setJoinLink] = useState(
    window.location.origin + "/" + randomString
  );
  // const joinLink=window.location.origin + "/" + randomString

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joinLink);

    // var text = document.getElementById("joinLink");
    // navigator.clipboard.writeText(text.value);
  };

  const join = () => {
    setJoinLink(joinLink);
    const path=joinLink.split("/").pop();
    sessionStorage.setItem("path",path)
    navigate(`${path}`)
    // window.location.replace(joinLink)
    // setShowChildModal(true);
  };

  const handleClose = () => {
    setShowChildModal(false);
    props.onClose();
  };

  const handleInputChange = () => {
    console.log("object");
  };

  return (
    <div className="my-modal">
      <Modal
        show={props.show}
        onHide={props.onClose}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            {" "}
            <Form.Control
              // placeholder="Recipient's username"
              // aria-label="Recipient's username"
              // id="joinLink"
              value={joinLink}
              onChange={handleInputChange}
              aria-describedby="basic-addon2"
              readOnly
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </InputGroup>     
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={join}>Join Meeting</Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
}


export default CreateMeeting;
