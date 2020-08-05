import MP4Box from "mp4box";

const detectMime = data => {
  return new Promise((resolve, reject) => {
    //console.log("check first");
    const mp4boxfile = MP4Box.createFile();
    mp4boxfile.onReady = info => {
      //console.log("mp4box onReady", { info });
      resolve(info.mime);
    };
    mp4boxfile.onError = error => {
      reject(error);
    };
    //const { data } = msg;
    data.fileStart = 0;
    mp4boxfile.appendBuffer(data);
    //console.log("end of detectMime");
  });
};

export { detectMime };
