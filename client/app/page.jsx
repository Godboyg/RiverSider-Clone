import React from 'react'
import podcast from "../public/podcast.jpg"
import golive from "../public/golive.jpg"
import Image from 'next/image'
import { auth0 } from "@/lib/auth0";
import Header from './Component/Header';
import { redirect } from 'next/navigation';
import StartButton from './Component/StartButton';
import axios from "axios";

async function page() {

  axios.get("https://riversider-clone.onrender.com/").then(() => {
    console.log("server running!");
  })

  axios.get("https://riversider-clone-service.onrender.com/").then(() => {
    console.log("server running!");
  })

  const session = await auth0.getSession();
  // setUser(session.user.name);
  console.log("session user",session);

   if (!session) {
    console.log("user logged out");
   } 

  return (
    <>
    <div>
        <Header session={session}/>
        <div className="relative lg:min-h-screen md:min-h-screen h-[80dvh] w-full bg-gray-900">
          <div className="absolute mx-auto w-10 rounded-full opacity-75 rotate-12 blur-3xl inset-y-16 inset-x-3 bg-gradient-to-b from-pink-500 to-purple-400"></div>
          <div className="absolute h-[50vh] w-full top-35 py-5 px-10 text-white">
            <h1 className='lg:text-8xl md:text-6xl sm:text-6xl text-4xl font-bold'>Create your <br /> best content yet.</h1>
            <p className='lg:text-2xl md:text-xl font-light mt-5'>Your all-in-one studio to record in high quality, edit in a flash, and go live <br /> with a bang. All with AI that works with you.</p>
              <div className="mt-13 font-bold xl:w-[15vw] xl:h-[5vw] lg:w-[20vw] hover:cursor-pointer lg:h-[8vh] md:w-[30vw] md:h-[10vw] sm:w-[35vw] sm:h-[10vw] w-[50vw] h-[15vw] rounded-md flex items-center justify-center bg-gradient-to-b from-black to-blue-900">
               {session ? 
                <StartButton /> : 
               <a href="/auth/login?screen_hint=signup">
                <button>Start for Free</button>
               </a>
               }
              </div>
          </div>
        </div>
        <div className="min-h-screen w-full relative bg-[#F8F8F8]">
          <div className="flex flex-col items-center justify-center absolute top-10 lg:top-20 w-full">
            <h1 className='font-bold text-4xl lg:text-6xl text-black'>Record it.</h1>
            <p className='text-center mt-4 w-72 lg:w-[38vw] text-xl font-light'>Studio-quality, separate audio and video tracks for each participant, thanks to our local recording technology.</p>
            <div className="mt-7 px-10 py-4 rounded-sm font-bold bg-blue-400 hover:cursor-pointer text-white flex items-center justify-center">
              {session ? 
                <StartButton /> : 
               <a href="/auth/login?screen_hint=signup">
                <button>Start for Free</button>
               </a>
               }
           </div>
          </div>
          <div className="absolute h-[50vh] w-[75vw] top-90 md:h-[70vw] md:top-80 md:left-50 lg:top-25 lg:left-20 lg:h-[60vh] lg:w-[20vw] xl:h-[70vh] overflow-hidden">
             <Image className='h-full w-full object-cover' src={podcast} alt=''/> 
          </div>
        </div>
        <div className="lg:min-h-screen w-full bg-[#F8F8F8]">
          <div className="flex flex-col items-center justify-center">
            <h1 className='font-bold text-4xl lg:text-6xl text-black mt-3'>Go live..</h1>
            <p className='font-light text-xl w-72 lg:w-[36vw] mt-4 text-center'>Stream your events and webinars in full HD from your fully branded studio. Simulcasting, omnichat, and lots more included.</p>
            <div className="mt-7 px-10 py-4 rounded-sm font-bold bg-blue-400 hover:cursor-pointer text-white flex items-center justify-center">
              {session ? 
                <StartButton /> : 
               <a href="/auth/login?screen_hint=signup">
                <button>Start for Free</button>
               </a>
               }
           </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="mt-15 md:h-[40vh] md:w-[40vw] lg:h-[40vh] lg:w-[40vw]">
            <Image className='h-full w-full object-cover' src={golive} alt=''/>
          </div>
          </div>
        </div>
        <div className="h-[70vh] flex flex-col gap-5 items-center justify-center text-white w-full bg-gradient-to-b from-black to-blue-950 rounded-bl-3xl rounded-br-3xl">
          <h2 className='text-4xl hidden lg:block'>Take it from here.</h2>
          <h1 className='text-5xl font-bold text-center'>Start creating with Podforge</h1>
        </div>
        <div className="bg-[#F8F8F8]">
          <div className="flex items-center justify-start">
          <h1 className='text-black font-bold text-3xl ml-15 mt-10'>Podforge.</h1>
        </div>
        <div className="h-[20vh] w-full p-7">
          <div className="border-t-1 border-gray-300 py-2 px-10">
            <p className='text mt-3 text-gray-500'>© 2025 RiversideFM, Inc.</p>
          </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default page
