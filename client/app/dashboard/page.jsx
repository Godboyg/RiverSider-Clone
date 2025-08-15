"use client"
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRouter , usePathname } from 'next/navigation';
import { FaHome, FaTasks, FaCalendarAlt } from "react-icons/fa";
import { Pathway_Gothic_One } from 'next/font/google';
import NavBar from '../Component/NavBar';
import { SharedStateContext } from '@/Context/SharedStateContext';
import { useContext } from 'react';
import Open from '../Component/sides/Open';

function page() {
  const[number , setNumber] = useState(0);
  const[room , setRoom] = useState("");
  const [ visible , setVisible ] = useState(false);
  const [ In , setIN ] = useState(false);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showBox, setShowBox] = useState(false);

  const {boolValue}= useContext(SharedStateContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize" , handleResize);
  },[])

  const handleCl = () => {
    if(isMobile) setShowBox((prev) => !prev);
    console.log("clicked!!");
  }

  useEffect(() => {
    const reload = sessionStorage.getItem("go-reload");
    if(reload){
      window.location.reload();
      sessionStorage.removeItem("go-reload");
    }
  },[])

  useEffect(()=>{
    const url = Math.floor(Math.random() * 1000);
    setNumber(url);
    const shouldLoad = sessionStorage.getItem("reload-once");
    if(shouldLoad){
      sessionStorage.removeItem("reload-once");
      window.location.reload();
    }
  },[])

  const handleClick = (e) => {
    e.preventDefault();
    console.log(room);
    setRoom("");
    router.push(`/studio/${room}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    });

    const t = setTimeout(() => {
      setVisible(false);
    }, 3000);

    console.log(visible);

    return () => clearTimeout(timer);
  },[])

  // if(visible) return <div className="h-screen absolute top-0 w-full bg-black text-gray-400 flex items-center justify-center">
  //           <h1 className='text-5xl font-bold'>Rolling out the Carpet..</h1></div>

  return (
    <>
    <div className={`absolute z-99 xl:top-15 xl:left-22 2xl:left-25 lg:top-15 lg:left-20 md:top-17 md:left-0 md:w-full md:h-[89vh] sm:top-17 sm:left-0 sm:w-full sm:h-[89vh] h-[89vh] w-full top-17 left-0 border-gray-900 border-1 rounded-2xl xl:h-[89dvh] lg:h-[91vh] 2xl:h-[92vh] bg-[#111111] text-white flex flex-col items-center gap-5 
    ${boolValue ? "xl:w-[81vw] lg:w-[78vw] 2xl:w-[81vw] md:w-full xl:left-65 2xl:left-74 lg:left-57 md:left-75" : "xl:w-[93vw] 2xl:w-[93vw] lg:w-[92vw]"}`}>
      <div className="w-full h-full">
        <div className="h-16 w-full border-b-gray-900 border-b-1"></div>
        <div className="w-full gap-7 text-white items-center justify-center flex p-4">
           <div className="flex flex-col items-center justify-center gap-1">
            <Link href={`/studio/${number}`}>
         <div className="h-16 w-16 ease-in-out flex hover:bg-red-400 hover:cursor-pointer items-center justify-center rounded-full bg-[#300C12]"
         onMouseOver={e => setIN(true)}
         onMouseLeave={e => setIN(false)}>
         <div className={`rounded-full h-5.5 flex items-center justify-center w-5.5 border-2
           ${In ? "border-white" : " border-red-700"}`}>
           <div className={`${In ? "bg-white" : "bg-red-500"} w-2.5 h-2.5 rounded-full`}></div>
         </div>
         </div>
          </Link>
          <p className='text-white text-[4.3vw] sm:text-[3vw] md:text-[3vw] lg:text-[2vw] xl:text-[1.1vw] font-bold'>Record</p>
           </div>
           <div className="flex-col gap-1 items-center justify-center inline-flex group">
            <div className="group relative inline-flex">
              <div className="h-16 w-16 transition-all z-999 duration-250 ease-in-out flex hover:bg-green-700 hover:cursor-pointer items-center justify-center rounded-full bg-black"
              onClick={handleCl}>
               <div className="rounded-full h-5.5 flex items-center justify-center w-5.5 border-2 border-green-700">
                <div className="bg-green-500 w-2.5 h-2.5 rounded-full"></div>
               </div>
              </div>
               <div
       class={`absolute left-full top-0 ml-4 w-40 h-32 bg-black text-white rounded-lg shadow-lg 
          items-center justify-center transition-opacity duration-300 
                ${
            isMobile
              ? showBox
                ? "flex"
                : "hidden"
              : "hidden lg:group-hover:block"
          }`}>
        <div className="h-42 w-42 py-4 flex flex-col items-center justify-center gap-2 rounded-md bg-black text-white">
          <h2 className='font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-black/50'>Enter Meet</h2>
          <input type="number" value={room} onChange={(e) => setRoom(e.target.value)} placeholder='Enter Meet Code.' className='w-34 p-2 border-none outline-none' />
          <button disabled={room.trim() === ""} className='text-black hover:cursor-pointer bg-green-500 disabled:bg-gray-500 py-1 px-4 rounded-lg text-xl font-bold' onClick={handleClick}>Join</button>
        </div>
               </div>
            </div>
            <p className='text-white text-[4.4vw] sm:text-[3.2vw] md:text-[3vw] lg:text-[2vw] xl:text-[1.1vw] font-bold'>Join</p> 
           </div>
        </div>
       </div>
    </div>
    </>
  )
}

export default page
