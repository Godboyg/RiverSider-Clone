import React from 'react'

function ListView() {
  return (
    <div className='flex flex-col gap-[2px] items-center justify-center'>
      <div className="flex items-center gap-[1.7px] justify-center">
        <div className="h-[3px] w-[3px] rounded-full bg-white"></div>
        <div className="w-3 h-[1.5px] bg-white rounded-sm"></div>
      </div>
      <div className="flex items-center gap-[1.7px] justify-center">
        <div className="h-[3px] w-[3px] rounded-full bg-white"></div>
        <div className="w-3 h-[1.5px] bg-white rounded-sm"></div>
      </div>
      <div className="flex items-center gap-[1.7px] justify-center">
        <div className="h-[3px] w-[3px] rounded-full bg-white"></div>
        <div className="w-3 h-[1.5px] bg-white rounded-sm"></div>
      </div>
    </div>
  )
}

export default ListView
