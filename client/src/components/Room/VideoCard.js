import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
const VideoCard = (props) => {
  const ref = useRef();
  const peer = props.peer;
// console.log("from videoCard..!!")
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
    });
  }, [peer]);

  return <video playsInline autoPlay ref={ref} ></video>;
};

export default VideoCard;
