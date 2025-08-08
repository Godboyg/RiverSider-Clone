"use client"
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { SharedStateContext } from '@/Context/SharedStateContext'
import { GoPlus } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import globals from "../../globals.css"
import PodTime from "../../Component/PodTime"
import Desc from "../../Component/Desc"
import { useDispatch , useSelector } from 'react-redux';
import { toggle } from '@/app/Redux/Slice';

function page() {

  const IsOpen = useSelector((state) => state.state.IsOpen);
  const dispatch = useDispatch(); 

  const { boolValue } = useContext(SharedStateContext);
  // const[open , setOpen] = useState(false);
  const[name , setName] = useState("");
  const[error , setError] = useState(false);
  const[sessions , setSession] = useState(false);
  const [time, setTime] = useState('');
  const [podtime, setPodTime] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' }); 
  const date = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
    if(e.target.value.trim() === ""){
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
     <div className={`absolute xl:top-15 xl:left-22 2xl:left-25 lg:top-15 lg:left-20 md:top-17 md:left-0 md:w-full md:h-[89vh] sm:top-17 sm:left-0 sm:w-full sm:h-[89vh] h-[89vh] w-full top-17 left-0 border-gray-900 border-1 rounded-2xl xl:h-[89dvh] lg:h-[91vh] 2xl:h-[92vh] bg-[#111111] text-white flex flex-col items-center gap-5 
    ${boolValue ? "xl:w-[81vw] lg:w-[78vw] 2xl:w-[81vw] md:w-full xl:left-65 2xl:left-74 lg:left-57 md:left-75" : "xl:w-[93vw] 2xl:w-[93vw] lg:w-[92vw]"}`}>
      <div className="flex flex-col h-full w-full items-center justify-between">
        <div className="h-16 w-full border-b-gray-900 border-b-1"></div>
        <div className="flex h-full w-full items-center justify-center">
          {
            IsOpen ? (
              <>
              <div className="flex flex-col gap-5 text-center mt-10">
                <div className="flex items-center justify-center">
                  <div className="h-20 w-22 rounded-xl bg-[#1E1E1E] relative mb-5">
                    <div className="absolute flex flex-col text-start p-3 h-22 w-26 bg-[#1E1E1E] top-2 -left-2 rounded-xl">
                      <span className='text-gray-500 text-[2.9vw] sm:text-[2vw] md:text-[1.4vw] lg:text-[1vw] xl:text-[0.9vw]'>{day}</span>
                      <span className='text-white text-[3.6vw] sm:text-[1.4vw] md:text-[1.6vw] lg:text-[1.4vw] xl:text-[1.2vw] font-bold'>{date}</span>
                      <span className='text-white text-[3.6vw] sm:text-[1.4vw] md:text-[1.6vw] lg:text-[1.4vw] xl:text-[1.2vw] font-bold'>{month.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className='text-xl font-bold'>No upcoming sessions</p>
                </div>
                <div className="">
                  <span className='text-[#A3A3A3] text-[3.9vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[1.8vw] xl:text-[1.2vw]'>Plan your sessions in advance. Choose a date and time,<br />
                      then invite others to join or watch your event.</span>
                </div>
                <div className="w-full flex items-center justify-center">
                  <div className="flex items-center justify-center gap-2 hover:bg-[#7C4DFF]/80 transition-opacity duration-200 hover:cursor-pointer py-2 px-4 rounded-md bg-[#7C4DFF]">
                    <div className="text-xl">
                      <GoPlus />
                    </div>
                    <div className='font-bold text-[4.4vw] sm:text-[2.3vw] md:text-[2.1vw] lg:text-[1.8vw] xl:text-[1.1vw]' onClick={() => dispatch(toggle())}>New session</div>
                  </div>
                </div>
              </div>
              </>
            ) : (
              <div className="overflow-auto scrollbar-custom p-2 absolute bottom-0 
              xl:h-[65dvh] h-[72dvh] xl:w-[43vw] lg:w-[48vw] md:w-[54vw] sm:w-[60vw] w-[90vw] bg-[#111111]">
                <div className="w-full h-16 flex flex-col gap-2">
                  <input type="text" value={name} className='w-full h-12 px-3 py-2 text-3xl font-bold border-none outline-none'
                  placeholder='Session name*' required={true} onChange={handleChange}/>
                  <div className={`w-full border-b-1 ${error ? "border-red-300" : "border-[#3a3a3a]"}`}></div>
                  {
                    error && <div className="w-full text-start text-red-300">Enter a session name</div>
                  }
                </div>
                <div className="flex mt-17 h-11 w-full items-center justify-start gap-2">
                  <div className="text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.7vw] xl:text-[1.7vw]">
                    <MdAccessTime />
                  </div>
                  <div className="flex items-center justify-start px-3 rounded-md h-11 bg-[#2a2a2a] gap-2 w-[22vw]">
                    <div className="text-[3.7vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.7vw] xl:text-[1.7vw] font-bold">
                      <CiCalendar />
                    </div>
                    <div className="overflow-hidden">
                      <DatePicker
                         selected={selectedDate}
                         onChange={(date) => setSelectedDate(date)}
                         minDate={today}
                         dateFormat="M/d/yyyy"
                         popperClassName="dark-datepicker"
                         calendarClassName="dark-calendar"
                         className="text-white font-bold border-none cursor-pointer h-12 outline-none rounded-md"
                       />
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-[15vw] rounded-md">
                    <div className="h-full">
                       <PodTime />
                    </div>
                  </div>
                </div>
                <div className="mt-8 h-28 text-2xl w-full">
                    <div className="flex gap-2">
                      <div className="">
                       <Desc />
                      </div>
                      <div className="w-full -mt-3 flex flex-col gap-2">
                        <span className='text-[3vw] sm:text-[2.1vw] md:text-[1.7vw] lg:text-[1.4vw] xl:text-[1.1vw] font-bold text-gray-500'>Description</span>
                        <textarea placeholder='Description' className='rounded-md h-20 text-[2.7vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.4vw] xl:text-[1.1vw] resize-none border-1 border-purple-500 outline-none bg-[#2a2a2a] px-3 py-2 w-full' id=""></textarea>
                      </div>
                    </div>
                </div>
                <div className="absolute left-0 bg-black z-30 bottom-0 h-12 xl:w-[43vw] w-full flex items-center justify-end gap-3">
                  <div
                  onClick={() => dispatch(toggle())} 
                  className="w-[17vw] sm:w-[15vw] md:w-[13vw] lg:w-[10vw] xl:w-[7vw] py-2 rounded-sm hover:cursor-pointer flex items-center justify-center bg-[#2a2a2a] font-bold">Cancel</div>
                  <button className="w-[30vw] sm:w-[20vw] md:w-[18vw] lg:w-[16vw] xl:w-[12vw] hover:cursor-pointer flex items-center transition-all ease-in-out duration-150 disabled:text-gray-500 disabled:bg-[#2a2a2a] py-2 rounded-sm justify-center font-bold bg-purple-700 text-white" 
                  disabled={name.trim() === ""}>Create Session</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default page