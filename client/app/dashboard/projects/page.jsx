"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { SharedStateContext } from '@/Context/SharedStateContext'
import { GoPlus } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdViewList } from 'react-icons/md';
import ListView from '@/app/Component/view/ListView';
import Dotes from '@/app/Component/Dotes';
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector , useDispatch } from 'react-redux';
import { toggleSlide } from '@/app/Redux/Slice';

function page() {

  // const[open , setOpen] = useState(false);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.state.open);
  console.log(open);
  // const[size , setSize] = useState(false);
  const[isOpen , setIsOpen] = useState(false);
  const[isO , setIsO] = useState(false);

  const{ size , changeSize } = useContext(SharedStateContext);

  const vis = useRef(null);

  useEffect(() => {
    const handleClick = (event) =>{
      if(vis.current && !vis.current.contains(event.target)){
        // setOpen(false);
        // dispatch(toggleSlide());
        setIsOpen(false);
        setIsO(false);
      }
    }

    if(vis){
      document.addEventListener("mousedown",handleClick);
    }

    return () => {
      document.removeEventListener("mousedown",handleClick);
    }
  },[vis])

  const { boolValue } = useContext(SharedStateContext);

  return (
    <div className={`absolute overflow-auto sm:overflow-auto md:overflow-hidden xl:top-15 xl:left-22 2xl:left-25 lg:top-15 lg:left-20 md:top-17 md:left-0 md:w-full md:h-[89vh] sm:top-17 sm:left-0 sm:w-full sm:h-[89vh] h-[89vh] w-full top-17 left-0 border-gray-900 border-1 rounded-2xl xl:h-[89dvh] lg:h-[91vh] 2xl:h-[92vh] bg-[#111111] text-white flex flex-col gap-5 
    ${boolValue ? "xl:w-[81vw] lg:w-[78vw] 2xl:w-[81vw] md:w-full xl:left-65 2xl:left-74 lg:left-57 md:left-75" : "xl:w-[93vw] 2xl:w-[93vw] lg:w-[92vw]"}`}>
      <div className="w-full h-full xl:py-12 xl:px-14 sm:py-3 sm:px-4 p-2 mt-5 md:mt-0">
        <div className="h-16 w-full border-b-gray-900 border-b-1"></div>
      <div className="flex items-center justify-between">
        <h2 className='text-xl font-bold'>Projects</h2>
        <div className="flex items-center justify-center gap-2">
          <div className={`transition ease-in duration-100 flex hover:cursor-pointer items-center
            ${isOpen ? "w-48 bg-[#2a2a2a] h-8 justify-start px-2.5 rounded-xl" : "w-9 h-9 justify-center rounded-md hover:bg-[#2a2a2a]"}`}>
           <div
           ref={vis} 
           className="flex items-center justify-center gap-1.5" onClick={(e) => setIsOpen(true)}>
             <div className={`font-bold text-xl ${isOpen ? "text-[#7a7a7a]" : "text-white"}`}>
              <CiSearch />
             </div>
             <input type="text" placeholder='Find a project' className={`text-[3.4vw] sm:text-[2vw] md:text-[1.9vw] lg:text-[1.4vw] xl:text-[1vw] transitiona-all border-none outline-none w-36 h-full ease-initial duration-150 ${isOpen ? "block" : "hidden"}`} />
            </div>
          </div>
          <div className="h-9 w-9 transition ease-in duration-100 flex hover:bg-[#2a2a2a] hover:cursor-pointer items-center justify-center rounded-md"
          onClick={() => {
            dispatch(toggleSlide())
          }}>
           <div className="text-[1.7vw] font-black">
             {open ?
             <div className='text-xl'>
               <CiGrid41 /> 
             </div>  : <ListView />}
           </div>
          </div>
          <div className="h-9 w-20 rounded-md flex items-center gap-1 
          hover:bg-blue-800 justify-center bg-blue-700 hover:cursor-pointer ">
            <div className="text-xl font-bold">
              <GoPlus />
            </div>
            <span className='text-[3.5vw] sm:text-[2.6vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] font-bold'>New</span>
          </div>
        </div>
      </div>
      {
        open ? (
          <>
          <div className="text-white mt-5">
        <div className="w-full h-16 rounded-md p-2 pr-5 hover:cursor-pointer hover:bg-[#1f1f1f]">
          <div className="h-full flex items-center justify-between">
            <div className="h-full flex items-center gap-3">
              <div className="h-full w-12 rounded-md bg-[#3a3a3a]"></div>
              <div className="text-white">kushal</div>
            </div>
            <div className="relative" ref={vis} onClick={e => setIsO(true)}>
              <button>
                 <Dotes />
              </button>

              {
                isO && (
                  <div
         className="w-50 p-2 absolute z-999 top-full right-0 transition-all ease-in-out duration-300 rounded-md bg-[#3a3a3a] text-white cursor-pointer">
          <div className="hover:bg-[#1f1f1f] px-3 py-2 rounded-md flex gap-3 items-center"
          >
            <div className="text-[5vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.8vw] xl:text-[1.5vw]">
              <AiOutlineDelete />
            </div>
            <span className='text-[3.4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.1vw] font-semibold'>Remove</span>
          </div>
        </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute z-160 -top-15 -left-21 h-[99dvh] w-[99vw] ${isOpen ? "block" : "hidden"}`}>
      </div>
      </>
        ) : (
          <div className="mt-5 w-full flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-84 w-full flex flex-col gap-5">
              <div className="lg:h-56 lg:w-84 w-full sm:h-84 h-56 rounded-md bg-white">
                <div className=""></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span>Kushal</span>
                  <span className='text-[#6a6a6a]'>2 days ago</span>
                </div>
                <div className="">
                  <Dotes />
                </div>
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default page
