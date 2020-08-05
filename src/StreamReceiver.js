const getLivePath = (cameraId, index) => {
  const { host, protocol, port } = window.location;
  //console.log({ host, protocol, port });
  const wsProtocol = protocol === "https:" ? "wss:" : "ws:";

  //return `${wsProtocol}//${host}/livews/${cameraId}/${index}`;
  return `${wsProtocol}//localhost:8090/livews/${cameraId}/${index}`;
};

const createStreamReceiver = () => {
  let _handleStart = null;
  let _handleData = null;
  const socket = new WebSocket(
    getLivePath("ff7d59d2-7886-496b-b48f-dc23431bce70", 0)
  );
  socket.binaryType = "arraybuffer";
  socket.onopen = () => {
    console.log("connected");
    socket.send("start");
  };
  socket.onclose = () => {
    console.log("socket closed");
  };
  socket.onmessage = (msg) => {
    const { data } = msg;
    if (!(data instanceof ArrayBuffer)) {
      const start = JSON.parse(data);
      const { pts } = start;
      console.log({ start: pts });
      if (_handleStart) {
        _handleStart(pts);
      }
      return;
    }
    if (data instanceof ArrayBuffer) {
      //console.log("binary data");
      if (_handleData) {
        _handleData(data);
      }

      return;
    }

    //console.log("msg received", msg);
  };
  //console.log(path);
  return {
    set onStart(handleStart) {
      _handleStart = handleStart;
    },
    set onData(handleData) {
      _handleData = handleData;
    },
  };
};

export { createStreamReceiver };
