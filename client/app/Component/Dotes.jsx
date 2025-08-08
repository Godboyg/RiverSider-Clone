import React, { useEffect, useRef, useState } from 'react'

function Dotes() {
  return (
    <>
    <div
    // onClick={e => setOpen(!open)} 
    className="text-black h-8 w-8 rounded-md hover:bg-[#3a3a3a] gap-[1.1px] flex items-center hover:cursor-pointers justify-center">
      <div className="h-[3.5px] w-[3.5px] rounded-full bg-white"></div>
      <div className="h-[3.5px] w-[3.5px] rounded-full bg-white"></div>
      <div className="h-[3.5px] w-[3.5px] rounded-full bg-white"></div>
    </div>
    </>
  )
}

export default Dotes
