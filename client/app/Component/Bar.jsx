"use client"
import React, { useState } from 'react'

function bar({ onToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        console.log("clicked");
        setIsOpen(!isOpen);
        onToggle(!isOpen);
        console.log("clieckedddd");
    }
  return (
    <>
    <div className={`flex flex-col ${isOpen ? "gap-1.5" : "gap-2"}`} onClick={handleClick}>
      <span 
        className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ease-in-out ${
            isOpen ? `rotate-45 rounded-md translate-y-1` : ""}`}>
        </span>
      <span 
        className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ease-in-out ${
            isOpen ? `-rotate-45 rounded-md -translate-y-1` : ""}`}>
        </span>
    </div>
    </>
  )
}

export default bar
