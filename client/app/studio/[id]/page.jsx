"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'next/navigation';
import { io } from 'socket.io-client';
import { set } from 'date-fns';
import { PiVideoCamera, PiVideoCameraSlashFill } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { flushSync } from 'react-dom';
import { FlagIcon } from '@heroicons/react/24/outline';
import { IoChatbubbleOutline } from "react-icons/io5";
import Chat from '@/app/Component/Chat';
import { startRecording , stopRecording } from './Recording';
import { useSelector , useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addUsers, userAdded , clearRoom } from '@/app/Redux/Slice';

const socket = io('https://riversider-clone.onrender.com/');

function page() {
    const [ visible , setVisible ] = useState(true);
    const [ Isvisible , setIsVisible ] = useState(false);
    const [error, setError] = useState(null);
    const [med, setMed] = useState(null);
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [screenSharing , setScreenSharing] = useState(false);
    const [roomId, setroomId] = useState(0);
    const [title, setTitle] = useState("Untitled Recording");
    const [name , setName] = useState("");
    const [userReq , setUserReq] = useState("");
    const [user , setUser] = useState(0);
    const [join , setJoin] = useState(true);
    const [req , setReq] = useState(false);
    const [JoinerId , setJoinerId] = useState("");
    const [rejected , setRejected] = useState(false);
    const [newUser , setNewUser ] = useState(false);
    const [border , setBorder] = useState(false);
    const [joined , setJoined] = useState("idle");
    const [isSharing, setIsSharing] = useState(false);
    const [screenStream, setScreenStream] = useState(null);
    const [msgView , setMsgView] = useState(false);
    const [recording , setRecording] = useState(true);
    const [streamLoaded, setStreamLoaded] = useState(false);
    const [admin , setAdmin] = useState(false);
    const [adminId , setAdminId] = useState("");
    const [typ , setTyp] = useState(false);
    const [remoteStream , setRemoteStream] = useState(false);
    const [partnerVoice , setPartnerVoice] = useState(false);
    
    const localVideoRef = useRef(null);
    const [peers, setPeers] = useState({});
    const localStreamRef = useRef(null);
    const peerConnections = useRef({});
    const peerConnectionRef = useRef(null);

    const dispatch = useDispatch();
    const router = useRouter();
    const users = useSelector((state) => state.state.allUsers);
    console.log("all suers",users);

    const param = useParams();
    console.log("params",param.id);

    //const peerConnections = new Map();
    const currentUser = useSelector((state) => state.state.user);
    console.log("current user",currentUser);

    useEffect(() => {
      if(!currentUser){
        router.push("/");
      }
    },[])
    
    useEffect(()=>{
        setroomId(param.id);
        setTimeout(() => {
          setVisible(false);
        }, 1000);
        setIsVisible(true);
        setTimeout(()=>{
          setIsVisible(false);
        },3000)
    },[])

    const getStream = async() => {
      try{
        const stream = await navigator.mediaDevices.getUserMedia({ audio:true , video: true});

        setMed(stream);
        localVideoRef.current.srcObject = stream;
        // setStreamLoaded(true);

        socket.emit("join", param.id);
      }
      catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      const getMedia = async() => {
      try{
        const stream = await navigator.mediaDevices.getUserMedia({ video: true , audio: true });
        setMed(stream);

        if(localStreamRef.current && stream){
           localStreamRef.current.srcObject = stream;
        }

      } catch (err){
        setError(err.message);
      }
    }

    socket.on("user-typing",() => {
      console.log("user typing.....");
      setTyp(true);
      setTimeout(() => {
        setTyp(false);
      },3000);
    })

    socket.on("user-stop-typing",() => {
     console.log("typing stopped");
     setTyp(false);
    })

     const timeoutId = setTimeout(() => {
      getMedia();
      console.log("local stream",localStreamRef);
     }, 4000);

     socket.on("ur-admin", ({ roomId, socket }) => {
      setAdminId(socket);
      setAdmin(true);
     })

     socket.on("admin-disconnected",() => {
      router.push("/dashboard");
      console.log("admin disconnected room ended");
      window.location.reload();
     })

     socket.on("st-recording",() => {
      const stream = localVideoRef.current?.srcObject;
      startRecording({ localStream : stream , remoteStreams : peers });
      console.log("recording started");
      // alert("recording started");
     })

     socket.on("stp-recording", () => {
      stopRecording();
      console.log("recording stopped");
     })

     socket.on("user-requesting-to-join",({ user , name , roomId}) => {
      console.log("user requesting to join", user , name);
      const id = user;
      setUserReq(name);
      setPeers(p => ({
        ...p,
        [id]: {
          ...p[id],
          na: name,
        },
      }))
      dispatch(addUsers({
        id: roomId,
        user: name,
        joined: false
      }))
      setJoinerId(user);
      setReq(true);
     })

     socket.emit("check-room-size",param.id);

     socket.on("user-audio", ({ audio }) => {
      if(audio){
          setPartnerVoice(audio);
          alert("partner voice comming");
      }
      setPartnerVoice(!audio);
     })

     socket.on("know-room-size", (size) => {
      setUser(size);
      console.log("room size",size);
     })

     socket.on("request-acc",({ setPeers }) => {
      // setPeers(setPeers);
      console.log("setpeerss.",setPeers);
      setJoin(false);
      setNewUser(true);
      console.log("call accepted");
      setTimeout(() => {
        getStream();
      },2000)
      console.log("stream from join",localVideoRef);
      console.log("pod joined",param.id);
     })

     socket.on("pod-j" , () => {
      // setJoin(false);
      setReq(false);
      console.log("setjoined false");
     })

     socket.on("request-rej",() => {
      console.log("join request not accepted");
      setRejected(true);
      setJoined("idle");
     })

    socket.on('all-users', users => {
      console.log("current user",socket.id);
      console.log("all users",users.length);
      users.forEach(id => {
        createPeer(id, true);
      });
    })

    socket.on('user-joined', (userId) => {
      console.log("user joined",userId);
      createPeer(userId, false);
    });

    socket.on('signal', async ({ caller, signal }) => {
      console.log("in signal");
      const pc = peerConnections.current[caller];
      if (!pc) return;

      if (signal.type === 'offer') {
        await pc.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('signal', { target: caller, signal: pc.localDescription });
      } else if (signal.type === 'answer') {
        await pc.setRemoteDescription(new RTCSessionDescription(signal));
        setRemoteStream(true);
      } else if (signal.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(signal));
      }
    });

    socket.on('user-left', (id , room) => {
      socket.emit("new-room-size",room);
      const pc = peerConnections.current[id];
      if (pc) pc.close();
      delete peerConnections.current[id];
      setPeers(p => {
        const copy = { ...p };
        delete copy[id];
        return copy;
      });
    });

      socket.on("connect",(socket)=>{
        console.log("connected",socket.id);
      })

      socket.on("room-size",(size)=>{
        setUser(size);
        console.log("size",size);
      })

      socket.on('user-joined',async ({soc , val}) => {
        console.log(`New user joined: ${soc}`, val);
        console.log("current socket id",socket.id);
      });

      socket.on("room-full",() => {
        alert("room full!!");
        window.location.reload;
      })

      return () => clearTimeout(timeoutId);
  },[])

  useEffect(() => {
    console.log("room size",user);
    if(user === 0){
      dispatch(clearRoom());
    }
  },[])

  const handleJoinRoom = (e) => {
    try{
      e.preventDefault();
      setJoined("pending");
      setTimeout(() => {
        getStream();
      },2000)
      setTimeout(() => {
        setJoin(false);
      },2000)
      // socket.emit("join", param.id);
      console.log("stream from join",localVideoRef);
    } catch(errror){
      console.log("error",error);
    } finally {
      // setJoined("idle");
      console.log("finnaly");
    }
  }

  const handleSendJoinRequest = (e) => {
    e.preventDefault();
    setJoined("pending");
    socket.emit("request-join-room", { user : socket.id , name , roomId : param.id });
  }

  const handleRequestAccepted = (e) => {
    e.preventDefault();
    console.log("user",userReq , name);
    dispatch(userAdded(userReq));
    setReq(false);
    console.log("user requested",JoinerId);
    // socket.emit("join", param.id);
    console.log("setpeers",peers);
    socket.emit("request-accepted", { joiner : JoinerId , setPeers: peers});
    socket.emit("pod-joined", param.id);
  }

  const handleRequestRejected = (e) => {
    e.preventDefault();
    setReq(false);
    socket.emit("request-rejected",{ joiner : JoinerId});
  }

  const createPeer = (id , initiator) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    peerConnectionRef.current = pc;

    peerConnections.current[id] = pc;
    console.log("peerconnecftiosn",peerConnections);

    setTimeout(() => {
      const stream = localVideoRef.current?.srcObject;
      console.log("local stream",stream);

      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      pc.onicecandidate = e => {
       if (e.candidate) {
        socket.emit('signal', { target: id, signal: e.candidate });
       }
      };

      pc.ontrack = e => {
       setPeers(p => ({
        ...p,
        [id]: {
          ...p[id],
          stream: e.streams[0],
        },
       }));
      };
      setRemoteStream(true);

      if (initiator) {
       pc.onnegotiationneeded = async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('signal', { target: id, signal: pc.localDescription });
       };
      }
    },1000)
  }

  const toggleMic = () => {
    const audioTrack = med?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      socket.emit("audio",{ audio : audioTrack.enabled , roomId : param.id});
      setMicOn(audioTrack.enabled);
      setBorder(!audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    const videoTrack = med?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCamOn(videoTrack.enabled);
    }
  };

  const toggleScreenShare = async() => {
    if(!isSharing){
      try{
        const stream = await navigator.mediaDevices.getDisplayMedia({ video:true , audio: false});

        const screenTrack = stream.getVideoTracks()[0];

        const sender = peerConnectionRef
        .current
        .getSenders()
        .find((s) => s.track.kind === "video");

        if(sender){
          sender.replaceTrack(screenTrack);
        }

        setIsSharing(true);
        setScreenStream(stream);
        setScreenSharing(true);

        screenTrack.onended = () => {
          stopScreenShare();
        };
      } catch(err){
        console.log("Error sharing screen:", err);
      }
    }
    else {
      stopScreenShare();
    }
  }

  const stopScreenShare = async() => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }

    const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const webcamTrack = webcamStream.getVideoTracks()[0];

    const sender = peerConnectionRef
     .current     
     .getSenders()
     .find((s) => s.track.kind === "video");

     if (sender) {
      sender.replaceTrack(webcamTrack);
     }

     setIsSharing(false); 
     setScreenSharing(false);
  }

  const handleToggleView = () => {
    console.log("view changed");
    setMsgView(false);
  }

  const handleStart = () => {
    startRecording({ localStream : med , remoteStreams : peers });
    socket.emit("start-recording", param.id);
    setRecording(false);
  }

  const handleStop = () => {
    stopRecording();
    socket.emit("stop-recording",param.id);
    setRecording(true);
  }

  const handleBack = () => {
    console.log("go back");
    sessionStorage.setItem("go-reload","true");
    router.push("/dashboard");
  }

  if(visible) return <div className="h-screen absolute top-0 w-full bg-black text-gray-400 flex items-center justify-center">
            <h1 className='xl:text-5xl md:text-5xl sm:text-3xl text-xl font-bold'>Rolling out the Carpet..</h1></div>

  if(Isvisible) return <div className="h-screen w-full absolute top-0 bg-gray-950 flex gap-3 items-center justify-center">
    <div className="w-6 h-6 border-3 border-t-purple-800 border-l-purple-800 rounded-full animate-spin"></div>
    <span className='text-white font-bold text-xl'>Loading..</span>
  </div>
  
  return (
    <div className='h-screen absolute top-0 w-full block md:flex md:gap-5 bg-black text-white'>
      {
        join ? (
          <div className="h-screen w-full flex items-center bg-black justify-center absolute top-0">
        <div className="h-[12vh] w-full absolute top-0 flex gap-3 items-center px-6">
          <div className="text-xl hover:cursor-pointer hover:bg-[#3a3a3a]"
          onClick={handleBack}>
            <MdKeyboardArrowLeft />
          </div>
          <div className="flex items-center gap-2">
            <span className='xl:text-[1.5vw] md:text-[2.3vw] sm:text-[2.6vw] text-[4.4vw] font-bold'>Podforge</span>
            <span className=''>|</span>
            <span className='rounded-md hover:bg-[#2a2a2a] font-bold'>{currentUser}'s Studio</span>
          </div>
         </div>
        <div className="h-[65vh] md:h-[60dvh] w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] z-100 py-2 rounded-xl flex flex-col items-center justify-center md:flex-row px-4">
          <div className="w-full md:w-[30vw] flex items-center gap-5 justify-center h-full p-2">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <div className="w-full">
                <input
                type="text"
                placeholder='Enter Name..' 
                className='outline-none border-none rounded-md text-[3.0vw] md:text-xl bg-black w-full h-12 py-1.5 px-4 font-bold'
                value={name}
                onChange={e => setName(e.target.value)} />
              </div>
              <button className='w-full h-12 flex items-center justify-center rounded-xl hover:cursor-pointer font-bold
               text-[3.5vw] md:text-xl bg-[#A274FF] text-white'>
                {
                  user > 0 ? (
                  <>
                    {
                      joined === "idle" && (
                        <span onClick={handleSendJoinRequest} className='h-full w-full flex items-center justify-center'>Request To Join</span>
                      )
                    }
                    {
                      joined === "pending" && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="border-t-2 border-purple-700 animate-spin h-6 w-6 rounded-full"></div>
                          <span className='text-[3.5vw] sm:text-[3.vw] md:text-[3vw] lg:text-[1.5vw] font-bold'>Requesting to Join..</span>
                        </div>
                      )
                    }
                    {
                      joined === "rejected" && (
                        <div className="flex items-center justify-center text-[3.5vw] sm:text-[3vw] md:text-[3vw] lg:text-[1.5vw]  font-bold text-white">Try Again!</div>
                      )
                    }
                  </>
                  ) : (
                    <>
                    {
                      joined === "idle" && (
                        <span onClick={handleJoinRoom} className='h-full w-full flex items-center justify-center'>Join Studio</span>
                      )
                    }
                    {
                      joined === "pending" && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="border-t-2 border-l-2 border-purple-700 animate-spin h-6 w-6 rounded-full"></div>
                          <span className='text-[3.5vw] sm:text-[3vw] md:text-[3vw] lg:text-[1.5vw] font-bold'>Joining Studio</span>
                        </div>
                      )
                    }
                    </>
                  )
                }
              </button>
              {
                  rejected && <div className="text-[3.5vw] sm:text-[3vw] md:text-[3vw] lg:text-[1.5vw] font-bold text-red-800">Request to Join Pod not Accpeted</div>
              }
            </div>
          </div>
          <div className="w-full relative md:w-[30vw] p-5 flex items-center justify-center h-full">
            <div className="rounded-md z-999 h-full overflow-hidden">
              <video 
               ref={localStreamRef} 
               autoPlay 
               playsInline 
               className='rounded-xl h-full w-full'
            /> 
            <div className="absolute w-full flex items-center justify-center">
                <button onClick={toggleMic} className="px-4 py-2 text-[3.9vw] sm:text-[3vw] md:text-[3vw] lg:text-[2vw] rounded text-white">
                 {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button onClick={toggleCamera} className="px-4 py-2 text-[3.9vw] sm:text-[3vw] md:text-[3vw] lg:text-[2vw] rounded text-white">
                 {camOn ? <PiVideoCamera /> : <PiVideoCameraSlashFill />}
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
        ) : (
          <>
          <div className="w-full md:w-[95vw] h-screen flex flex-col items-center justify-between">
            <div className={`absolute rounded-xl flex flex-col items-center justify-around shadow-sm shadow-cyan-500 
              top-10 bg-black right-0 md:right-10 duration-150 p-3 xl:w-56 xl:h-28 md:w-64 md:h-30 sm:h-30 sm:w-66 h-32 w-full text-white
             ${req ? "scale-100 opacity-100 z-21" : "scale-60 opacity-0 z-0"}`}>
               <p>{userReq} want to Join the Pod</p>
              <div className="flex items-center justify-around w-full">
                <button className='hover:cursor-pointer text-green-600' onClick={handleRequestAccepted}>Yes</button>
                <button className='hover:cursor-pointer text-red-600' onClick={handleRequestRejected}>No</button>
              </div>
             </div>
         <div className="h-[12vh] w-full flex flex-col">
           <div className="h-full w-full flex gap-3 items-center justify-between px-3">
              <div className="flex items-center justify-center gap-2">
           <div className="text-xl hover:cursor-pointer" 
          onClick={handleBack}>
            <MdKeyboardArrowLeft />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <span className='xl:text-[1.5vw] md:text-[2.3vw] sm:text-[2.6vw] text-[4vw] font-bold'>Podforge</span>
            <span className=''>|</span>
            <span className='py-2 px-3 rounded-md hover:bg-[#2a2a2a]'
            ><input type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='h-6 text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.3vw] xl:text-[1vw] font-bold border-none outline-none text-white' placeholder='Untitled Recording' /></span>
            </div>
          </div>
           </div>
           <div className="md:hidden relative rounded-xl transition-all flex items-center justify-center h-19 w-18 duration-150 ease-in-out hover:bg-[#1D1D1D] p-2 hover:cursor-pointer"
          onClick={e => setMsgView(true)}>
          <div className="flex flex-col gap-[3px] items-center justify-center">
            <div className="text-[3.1vw] sm:text-[2vw] md:text-[1.7vw] lg:text-[1.2vw] xl:text-[1vw] font-bold">
              <IoChatbubbleOutline />
            </div>
            <span className='text-[3.4vw] sm:text-[2.2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1vw]'>Chat</span>
          </div>
          {
            !msgView && typ && (
              <div className="absolute font-bold text-green-500 text-[2vw] sm:text-[1.3vw] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[0.8vw] top-2 right-0">
                Typing...
              </div>
            )
          }
           </div>
           </div>
           <div className="text-[3.6vw] sm:text-[2.1vw] md:text-[1.7vw] lg:text-[1.2vw] xl:text-[1vw] text-cyan-500 ml-5">
            RoomId : {param.id}
           </div>
         </div>
         <div className={`h-[90vh] sm:h-[84vh] md:h-[83vh] lg:h-[80vh] xl:h-[75vh] w-full flex flex-wrap justify-center gap-2 p-3 ${ user <=2 ? "items-center justify-center" : ""}`}>
          {
              localVideoRef ? (
               <div className={`relative ${ user === 1 ? "h-full w-full flex justify-center items-center" : ""} ${ user <= 2 ? "h-[35vh] sm:h-[52vh] md:h-[60vh] lg:h-[70vh] xl:h-[64vh] xl:w-[40vw] lg:w-[35vw] sm:w-[45vw] md:w-[35vw] w-full" : "h-[35vh] sm:h-[35vh] md:h-[40vh] xl:h-[35vh] w-[40vw] sm:w-[30vw] md:w-[25vw] xl:w-[22vw]"}`}>
                  <video 
                ref={localVideoRef} 
                autoPlay 
                playsInline 
                className={`rounded-md h-full w-full object-cover ${border ? "border-2 border-purple-700 shadow shadow-indigo-50" : ""}`}
               />
               <p className='absolute text-white font-bold text-xl bottom-1 left-1'>{name}</p>
               </div>
              ) : (
               <div className='h-full w-full flex items-center justify-center text-white font-bold'>Player 1</div>
              )
            }
           {
            peers && remoteStream && (
               Object.entries(peers).map(([id,{ stream , na }]) => (
                 <div className={`rounded-md overflow-hidden relative
                  ${ user <= 2 ? "h-[35vh] sm:h-[52vh] md:h-[60vh] lg:h-[70vh] xl:h-[64vh] xl:w-[40vw] lg:w-[35vw] sm:w-[45vw] md:w-[35vw] w-full" : "h-[35vh] sm:h-[35vh] md:h-[38vh] xl:h-[35vh] w-[40vw] sm:w-[30vw] md:w-[24vw] xl:w-[22vw]"}`}>
                  <video key={id} autoPlay playsInline ref={video => video && (video.srcObject = stream)} 
                  className={`rounded-md h-full w-full object-cover ${partnerVoice ? "border-2 border-green-600" : ""}`} />
                <div className={`absolute bottom-1 font-bold left-1 text-white ${ stream ? "block" : "hidden"}`}>{na}</div>
              </div>
             )
            )
            )}
          {/* <div className="rounded-md overflow-hidden relative bg-cyan-400">
          </div> */}
         </div>
         <div className="h-[10vh] xl:h-[15vh w-full flex items-center justify-center">
          <div className="flex gap-3 items-center">
            { admin && (
              <button className="py-2 px-4 bg-red-700 hover:cursor-pointer text-[1.3vw] rounded-md font-bold text-white flex items-center justify-center gap-2">
              <span className='flex items-center justify-center rounded-full h-4 w-4 border-2 border-white'>
                <span className='h-2 w-2 rounded-full bg-white'></span>
              </span>
              <div className='text-[3.7vw] sm:text-[2.2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1.2vw] font-bold'>
                {
                    recording ? 
                      <span className='h-full w-full' onClick={handleStart}>Record</span> : 
                      <span className='h-full w-full' onClick={handleStop}>Stop</span> 
                }
              </div>
            </button>
            )}
            <button onClick={toggleMic} className="px-4 py-2 text-[3.7vw] sm:text-[2.2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1.2vw] rounded text-white">
             {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <button onClick={toggleCamera} className="px-4 py-2 text-[3.7vw] sm:text-[2.2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1.2vw] rounded text-white">
             {camOn ? <PiVideoCamera /> : <PiVideoCameraSlashFill />}
            </button>
            <div className='px-4 py-2 hover:cursor-pointer flex items-center justify-center'>
              {screenSharing ? 
                <button className="text-white text-[3.7vw] sm:text-[2.2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1.2vw]" onClick={stopScreenShare}>
                 <MdStopScreenShare />
                </button> :
                <button className='text-white text-[3.7vw] sm:text-[2.2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1.2vw]' onClick={toggleScreenShare}>
                  <MdScreenShare />
                </button> 
              }
            </div>
          </div>
         </div>
         </div>
       <div className="h-screen w-[7vw] hidden md:flex items-center justify-center">
        <div className="flex flex-col pr-4 h-[70vh]">
          <div className="rounded-xl relative z-20 transition-all flex items-center justify-center h-19 w-18 duration-150 ease-in-out hover:bg-[#1D1D1D] p-2 hover:cursor-pointer"
          onClick={e => setMsgView(true)}>
          <div className="flex flex-col gap-[3px] items-center justify-center">
            <div className="text-[3.1vw] sm:text-[2vw] md:text-[1.7vw] lg:text-[1.2vw] xl:text-[1vw] font-bold">
              <IoChatbubbleOutline />
            </div>
            <span className='text-[3.4vw] sm:text-[2.2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1vw]'>Chat</span>
          </div>
          {
            !msgView && typ && (
              <div className="absolute font-bold text-green-500 text-[2vw] sm:text-[1.3vw] md:text-[1.2vw] lg:text-[1.1vw] xl:text-[0.8vw] top-2 right-0">
                Typing...
              </div>
            )
          }
          </div>
        </div>
       </div>
       <Chat View={msgView} toggleView={handleToggleView} socket={socket} roomId={param.id}/>
          </>
        )
      }
    </div>
  )
}

export default page
