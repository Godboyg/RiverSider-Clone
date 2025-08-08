import axios from "axios";

let mediaRecorder = null;
let recordedChunks = [];

async function uploadRecording(blob) {
  const formData = new FormData();
  formData.append('file', blob, 'recording.webm');
  // const files = blob.target.files;

  // const data = await fetch(, {
  //   method: 'POST',
  //   body: formData
  // });

  const data = await axios.post("http://localhost:8000/uploads", formData);
  console.log("data",data);
}

export const startRecording = ({ localStream , remoteStreams }) => {
    const combinedStream = new MediaStream();

     localStream.getTracks().forEach(track => {
      combinedStream.addTrack(track);
     });

     console.log("local stream,",localStream);

    //  Object.entries(remoteStreams).forEach(([id , remoteStream]) => {
    //   remoteStream.getAudioTracks().forEach(track => {
    //   combinedStream.addTrack(track);
    //   });
    //  });

    mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm;codecs=vp8,opus',
      videoBitsPerSecond: 2500000
    });

    recordedChunks = [];

    mediaRecorder.ondataavailable = (e) => {
     if (e.data.size > 0) {
      recordedChunks.push(e.data);
     }
    };

    setInterval(() => {
      const blob = new Blob(recordedChunks , { type : 'video/webm'});
      uploadRecording(Blob);
    }, 2000);

    mediaRecorder.onstop = () => {
     const blob = new Blob(recordedChunks, { type: 'video/webm' });
     uploadRecording(blob);
    };

    mediaRecorder.start();
    console.log('Recording started...');
}

export function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    console.log('Recording stopped.');
  }
}