import React, { useEffect, useState, useRef } from 'react';
import './chat.css'
// import styled from 'styled-components';
import socket from "../Socket/socket";


const Chat = ({ display, roomId }) => {
  const currentUser = sessionStorage.getItem('user');
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();
  
  useEffect(() => {
    socket.on('FE-receive-message', ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => {scrollToBottom()}, [msg])

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      const msg = e.target.value;

      if (msg) {
        socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`chat-container ${display ? '' : 'width0'}`}>
      <div className="top-header">Group Chat Room</div>
      <div className='chat-area'>
        <div className='message-list'>
          {msg &&
            msg.map(({ sender, msg }, idx) => {
              if (sender !== currentUser) {
                return (
                  <div className='message' key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </div>
                );
              } else {
                return (
                  <div className='user-message' key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </div>
                );
              }
            })}
            <div style={{float:'left', clear: 'both'}} ref={messagesEndRef} />
        </div>
      </div>
      <input className='bottom-input'
        ref={inputRef}
        onKeyUp={sendMessage}
        placeholder="Enter your message"
      />
    </div>
  );
};



export default Chat;
