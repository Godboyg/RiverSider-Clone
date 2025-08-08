"use client"
import React, { useEffect, useState } from 'react'
import Bar from './Bar'
import StartButton from './StartButton';
import { useDispatch } from 'react-redux';
import { currentUser } from '../Redux/Slice';

function Header({ session }) {

    const dispatch = useDispatch();

    useEffect(() => {
      if(session){
        dispatch(currentUser(session.user.name));
      }
    },[session])

   console.log("Session",session);

    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const handleToggle = (val) => {
        setIsOpen(val);
        console.log("from child", val);
    }
    useEffect(()=>{
        const handleScroll = () => {
            setVisible(window.scrollY > 90);
        }
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll" , handleScroll);
    },[])
  return (
    <div className="relative">
        <div className={`flex top-0 fixed z-5 bg-white outline-none transform transition-all duration-100 ease-in-out ${isVisible ? "bg-white text-black" : "lg:bg-transparent lg:text-white"} items-center justify-between w-full py-3 px-5`}>
         <h2 className='text-xl font-bold space-x-3 tracking-widest leading-tighter text-bold'>PODFORGE</h2>
         <div className="flex items-center justify-center">
          <div className="flex items-center justify-between lg:w-58">
            <div className="text-md font-medium text-gray-500 transform transition-transform duration-100 hover:text-gray-400 hover:cursor-pointer hidden lg:block">
            {!session && 
            <a href="/auth/login">Login</a>
            }
          </div>
          <div className={`${isVisible ? "bg-black px-5.5 py-4 text-white hover:bg-gray-800" : "hover:bg-white hover:text-black"} px-5.5 py-4 hidden lg:block border-1 border-white rounded-sm font-bold hover:cursor-pointer
            transition-all duration-100 ease-in `}>
             {session ? 
                <StartButton /> : 
                <a href="/auth/login?screen_hint=signup">
                   <button>Start for Free</button> 
                </a>
            }
           </div>
          </div>
          <div className="lg:hidden">
            <Bar onToggle={handleToggle} />
          </div>
        </div>
        </div>
        <div className={`absolute w-full lg:hidden z-2 text-black h-[50dvh] px-5.5 py-4 transform transition-transform duration-500 left-0 top-13 ${
          isOpen ? `translate-y-0 rounded-bl-md rounded-br-md bg-white fixed opacity-100` : `-translate-y-full opacity-0`}`}>
            <div className="flex flex-col gap-5">
                <p className='text-md font-semibold border-b h-10 border-gray-300'>Product</p>
                <p className='text-md font-medium border-b h-10 border-gray-300'>Solution</p>
                <p className='text-md font-medium border-b h-10 border-gray-300'>Pricing</p>
            </div>
            {!session && 
             <div className="mt-5 px-5.5 py-4 rounded-sm font-bold w-full text-black border border-black flex items-center justify-center">
            <a href="/auth/login">Login</a>
             </div>
                }
            <div className="mt-3 px-5.5 py-4 rounded-sm font-bold w-full bg-black text-white flex items-center justify-center">
              {session ? 
                <StartButton /> : 
                <a href="/auth/login?screen_hint=signup">
                   <button>Start for Free</button> 
                </a>
            }
           </div>
        </div>
    </div>
  )
}

export default Header
