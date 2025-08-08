"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { FaHome, FaTasks, FaCalendarAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { usePathname } from 'next/navigation';
import Filter from "./Filter";
import { useContext } from 'react';
import { SharedStateContext } from '@/Context/SharedStateContext';
import { RxCross2 } from "react-icons/rx";
import Open from './sides/Open';
import Close from './sides/Close';
import NavSide from './NavSide';

function NavBar() {

    const { setBoolValue } = useContext(SharedStateContext);
    console.log("state in navbar",setBoolValue);

    const[activeIndex, setActiveIndex] = useState(0);
    const[open , setOpen] = useState(false);
    const[isOpen , setIsOpen] = useState(false);
    const [visible , setVisible] = useState(false);
    const path = usePathname();
    const contentRef = useRef(null);
 
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setVisible(!visible);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

    const navItems = [
    { name: "Home", icon: <FaHome /> , path : "/dashboard"},
    { name: "Project", icon: <FaTasks /> , path: "/dashboard/projects"  },
    { name: "Schedule", icon: <FaCalendarAlt /> , path: "/dashboard/schedule"},
  ];

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
    setBoolValue(!open);
  }

  const handle = () => {
    setIsOpen(true);
    console.log("clikcked");
  }
 
  return (
    <div className="max-h-screen max-w-full realative flex gap-2 bg-black">
      <div className="text-white fixed h-18 pl-3 flex items-center justify-center lg:hidden"
      onClick={handle}>
        <div className="h-11 w-11 rounded-full flex items-center justify-center bg-[#1a1a1a]">
        <NavSide />
        </div>
      </div>
      <div className={`${isOpen ? "block z-999" : "hidden z-0"} pt-3 pl-3.5 pr-1 fixed h-full min-w-56 top-0 left-0 bg-black`}>
        <div className="flex flex-col gap-3">
           <div className="h-10 w-10 bg-[#111111] text-white rounded-full flex items-center justify-center"
           onClick={e => setIsOpen(false)}>
            <RxCross2 />
           </div>
           <div className="flex flex-col gap-1">
              { navItems.map((item,index) => {
            const isActive = path === item.path;

            return (
             <Link
               key={index}
               href={item.path}
               onClick={e => setIsOpen(false)}
                className={`h-12 w-full flex items-center justify-start space-x-2 px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
              isActive ? "bg-[#1a1a1a] text-white" : "bg-black text-white hover:bg-[#141414]"
            }`}
             >
             <span className="text-xl">{item.icon}</span>
             <span className={`${isActive ? "text-white" : "text-gray-400"}`}>{item.name}</span>
            </Link>
            )
           }) }
           </div>
        </div>
        <div className="absolute bottom-5 left-5 text-white">Logout</div>
      </div>
      <div className={`xl:h-14 hidden lg:block ${open ? 'xl:w-[20vw]' : "xl:w-[7vw]"} text-black`}>
         <div className={`flex items-center h-16 ${open ? `w-[20vw] pl-4 justify-between` : "w-[6vw] ml-2 justify-center"} text-white`}>
          <h1 className="font-bold text-xl tracking-wider hidden lg:block">{ open ? "Podforge" : ""}</h1>
          <div className='w-16 -ml-2 lg:flex items-center justify-center hidden'>
            <p onClick={handleClick} className='font-bold text-xl hover:cursor-pointer'>{ open ? <Close /> : <Open /> }</p>
          </div>
         </div>
         <div className={`${ open ? `flex flex-col gap-1 mt-3` : `flex flex-col gap-1 justify-center items-center mt-1`}`}>
           { navItems.map((item,index) => {
            const isActive = path === item.path;

            return (
             <Link
               key={index}
               href={item.path}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
              isActive ? "bg-[#1a1a1a] text-white" : "bg-black text-white hover:bg-[#141414]"
            } ${open ? "h-10 ml-2 xl:w-60 2xl:w-64 justify-start" : "flex flex-col items-center justify-center h-18 w-18"} `}
             >
             <span className="text-xl">{item.icon}</span>
             <span className={`${isActive ? "text-white" : "text-gray-400"}
             ${open ? "text-[1.2vw]" : "text-[1vw]"}`}>{item.name}</span>
            </Link>
            )
           }) }
         </div>
      </div>
      <div className="w-full">
         <div className="text-white w-full xl:h-[10vh] 2xl:h-[6vh] lg:h-[10vh] md:h-[9vh] sm-[7vh] h-18 flex items-center justify-center">
        <div className="xl:w-[40vw] rounded-xl xl:h-9 md:h-9 2xl:h-10 lg:w-[50vw] sm:[45vw] h-10 w-[60vw] gap-2 bg-[#1e1e1e] hover:bg-[#141414] hover:cursor-pointer flex items-center justify-center"
        onClick={e => setVisible(!visible)}>
            <div className="text-[5vw] sm:text-[3.5vw] md:text-[3vw] lg:text-[2vw] xl:text-[1.5vw]">
                <CiSearch />
            </div>
            <p className="text-[4vw] sm:text-[1.8vw] md:text-[2.2vw] lg:text-[1.5vw] xl:text-[1.2vw]">Search</p>
        </div>
         </div>
      </div>
      <div 
      className={`h-screen flex items-center justify-center w-full absolute bg-black/50 backdrop-blur-sm
      ${visible ? "block z-70 bg-opacity-60" : "hidden"}`}>
        <div
        ref={contentRef}  
        className="h-[78dvh] scrollbar-custom overflow-auto py-3 px-5 rounded-xl absolute bottom-0 xl:w-[50vw] md:w-[60vw] sm:w-[70vw] w-[95vw] bg-[#1e1e1e]">
            <input type="text" className='w-full h-12 text-xl font-light border-none outline-none text-white' placeholder='Search Podfoge.' />
            <div className="mt-2">
                 <Filter />
            </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
