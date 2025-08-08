import React from 'react'

function Desc() {
  return (
    <div className='p-1 tranisition-all flex flex-col gap-[2px]
    w-[5vw] sm:w-[2.7vw] md:w-[2.3vw] lg:w-[1.9vw] xl:w-[1.7vw] rounded-sm
     ease-in-out duration-100 bg-white hover:bg-white hover:cursor-pointer'>
        <span className='w-3.5 h-0.5 rounded-sm bg-gray-600'></span>
        <span className='w-2.5 h-0.5 rounded-sm bg-gray-600'></span>
        <span className='w-3.5 h-0.5 rounded-sm bg-gray-600'></span>
        <span className='w-2.5 h-0.5 rounded-sm bg-gray-600'></span>
    </div>
  )
}

export default Desc