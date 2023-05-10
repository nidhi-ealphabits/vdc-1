// import e from "cors";
import React, { useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./main.css";

function Details(props) {
  const [username, setUserName] = useState("");
  const [error, setError] = useState(false);
  const meetingURL = props.link;
  const regex = /^[a-zA-Z0-9_-]+$/;
  const navigate=useNavigate()
  const path = meetingURL.split("/").pop();
  // console.log(meetingURL)

  const getUserName = (e) => {
    const name = e.target.value;
    setUserName(name);
  };

  const join = (e) => {
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
    // console.log(username)
    fetch("http://localhost:8000/users", {
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
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("user", username);
        sessionStorage.setItem("path", path);
        // console.log(data);
        navigate(`/${path}`);
        // props.history.push(`/${path}`);
        // window.location.replace(meetingURL);
        props.onClose();
      })
      .catch((error) => console.error(error));
    e.preventDefault();
  };

  return (
    <Modal show={props.show} onHide={props.onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        {/* <Modal.Title>Child Modal</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInputGrid" label="User Name">
          <Form.Control
            type="text"
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
  );
}

export default Details;
