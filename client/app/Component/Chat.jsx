"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import Typing from './Typing';
import { SYSTEM_ENTRYPOINTS } from 'next/dist/shared/lib/constants';

function Chat({ View , toggleView , socket , roomId}) {

    const [msg , setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [typing , setTyping] = useState(false);
    const bottomRef = useRef(null);

    const getCurrentTime = () => {
      const now = new Date();

      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12 || 12; 
      const formattedMinutes = minutes.toString().padStart(2, '0');

      return `${hours}:${formattedMinutes} ${ampm}`;
    };

    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior : "smooth" })
    },[messages])

    useEffect(() => {
       console.log(messages);
       socket.on("receive-msg",({ msg , socketId , timestamp }) => {
        console.log("msg",msg , socketId);
        setMessages(prev => [...prev , { socketId , msg , timestamp }]);
       })

       socket.on("user-typing",() => {
        console.log("user typing.....");
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
        },3000);
       })

       socket.on("user-stop-typing",() => {
        console.log("typing stopped");
        setTyping(false);
        // Typing(false);
       })
    },[])

    const handleMsg = (e) => {
      e.preventDefault();
      setMsg("");
      setTyping(false);
      // Typing(false);
      socket.emit("send-msg", { roomId , msg , socketId: socket.id ,  timestamp: getCurrentTime() });
    }

    const handleSetMsg = (e) => {
      e.preventDefault();
      setMsg(e.target.value);
      if(e.target.value.length === 0){
        console.log("nothing!");
        // Typing(false);
        socket.emit("stop-typing", roomId);
      }
      else if(e.target.value.length){
        console.log("user is typing...");
        socket.emit("typing", roomId);
        // Typing(true);
      }
      else{
        setTimeout(() => {
          // Typing(false);
          socket.emit("stop-typing", roomId);
        }, 4000);
      }
    }

    console.log("current socketid", socket.id);

  return (
    <div className={`absolute top-20 right-4 md:right-[7.5vw] md:origin-top-right h-[70vh] w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[30vw] p-3 rounded-xl bg-black shadow shadow-cyan-500
     transform transition-all duration-300 ease-in-out flex flex-col ${View ? "scale-100 opacity-100 z-2" : "scale-50 opacity-0 z-0"}`}>
       <div className="flex items-center justify-between w-full">
        <span className='text-[3.9vw] sm:text-[2.5vw] md:text-[2.2vw] md:text-[1.7] lg:text-[1.4vw] font-bold'>Chat</span>
        <span className='p-1 text-white text-[4vw] sm:text-[2.5vw] md:text-[2.2vw] md:text-[1.7] lg:text-[1.4vw] hover:cursor-pointer'
        onClick={toggleView}>
            <IoCloseOutline />
        </span>
       </div>
       <div className="scrollbar-custom min-h-[55vh] w-full mt-1 pt-2 overflow-auto rounded-xl">
        {
          messages.map((msg , index) => {
            const isMe = socket.id === msg.socketId;
           
            return (
              <div
              className='flex'
              style={{ justifyContent : isMe ? "flex-end" : "flex-start",
                color: 'white',
              }}>
                <div className="flex gap-1.5 w-[65vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] xl:w-[24vw] mt-1 items-center p-1 rounded-xl"
                style={{
                  justifyContent: isMe ? "flex-end" : "flex-start" ,
                  // backgroundColor: isMe ? "green" : "white" 
                 }}>
                  <div className="max-w-full rounded-xl pl-2"
                  style={{ borderBottom: isMe ? "1.5px solid purple" : "1.5px solid cyan"}}>
                    <span className='w-[90%] md:max-w-full break-words text-[4vw] sm:text-[2.2vw] md:text-[1.6vw] lg:text-[1.3vw] xl:text-[1vw]'>{msg.msg}</span>
                    <span className='text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[0.9vw] text-end text-gray-400 ml-2 mt-5'>
                      {msg.timestamp}
                      {/* {new Date(msg.timestamp).toLocaleTimeString()} */}
                    </span>
                  </div>
                  <div ref={bottomRef}></div>
                </div>
              </div>
            )
          })
        }
        {
          typing && (
            <div className=''>
          <Typing />
        </div>
          )
        }
       </div>
       <div className="flex border-2 border-gray-800 rounded-xl mt-0.5">
        <input type="text" value={msg} onChange={handleSetMsg} className='w-[24.5vw] flex-1 border-none outline-none p-2 px-3'
        placeholder='Type a message' />
        <button disabled={msg.trim() === ""} className='text-[3.4vw] sm:text-[2.5vw] md:text-[2.2vw] md:text-[1.7] lg:text-[1.4vw] font-bold disabled:text-gray-800 text-purple-400'
        onClick={handleMsg}>Send</button>
       </div>
    </div>
  )
}

export default Chat
