import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

function Close() {
  return (
    <div className='h-4 w-4 border-white border-[1.5px] hover:cursor-pointer
         flex items-center justify-around rounded-[3px]'>
            <span className='h-full w-[1.4px] ml-[3.5px] bg-white'></span>
            <div className="text-[6.5px]">
                <IoIosArrowBack />
            </div>
        </div>
  )
}

export default Close