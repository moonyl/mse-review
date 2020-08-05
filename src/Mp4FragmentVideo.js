import React, { useEffect, useRef } from "react";
import { createStreamReceiver } from "./StreamReceiver";
import { detectMime } from "./detectMime";

const createMediaSourceStuff = (video) => {
  let mediaSource = null;
  const receiver = createStreamReceiver();
  receiver.onStart = (startTime) => {
    console.log("start time: ", startTime);
  };
  receiver.onData = (data) => {
    //console.log(data);
    mediaSource ||
      detectMime(data)
        .then((mime) => {
          //mimeType = mime;
          if (MediaSource.isTypeSupported(mime)) {
            mediaSource = new MediaSource();
            console.log("mediaSource: ", mediaSource);
            video.src = URL.createObjectURL(mediaSource);
          }
          console.log(mime);
        })
        .catch((error) => {
          console.log(error);
        });
  };
};

const Mp4FragmentVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log("mount", videoRef.current);
    createMediaSourceStuff(videoRef.current);
  }, []);

  return <video ref={videoRef}></video>;
};

export default Mp4FragmentVideo;
