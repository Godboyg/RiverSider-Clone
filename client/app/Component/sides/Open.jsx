import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

function Open() {
  return (
    <div className='h-4 w-4 border-white border-[1.5px] hover:cursor-pointer
     flex items-center justify-around rounded-[3px]'>
        <span className='h-full w-[1.4px] ml-[2.7px] bg-white'></span>
        <div className="text-[6.5px]">
            <IoIosArrowForward />
        </div>
    </div>
  )
}

export default Open
