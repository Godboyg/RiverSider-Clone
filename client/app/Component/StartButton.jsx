"use client"
import React from 'react'
import { useRouter , redirect } from 'next/navigation'

function StartButton() {

    const router = useRouter();

    const handleRedirect = (e) => {
        e.preventDefault();
        console.log("button cliefj");
        // router.push("/dashboard");
        sessionStorage.setItem("reload-once", "true");
        redirect("/dashboard");
    }

  return (
    <div onClick={handleRedirect} className='h-full flex items-center justify-center w-full cursor-pointer'>
      Get Started
    </div>
  )
}

export default StartButton
