"use client"
import React from 'react'
import { useRef } from 'react'
import VideoPlayer from '../Component/VideoPlayer'
import videojs from 'video.js'

function page() {
    const playerRef = useRef(null);
    const videoLink = "http://localhost:8000/uploads/videos/b96661c2-397f-4a73-818c-edd656038c41/index.m3u8"
  
    const videoPlayerOptions = {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: videoLink,
                type: "application/x-mpegURL"
            }
        ]
    }

    const handlePlayerReady = (player) => {
      playerRef.current = player;

      player.on("waiting", () => {
        videojs.log("player is waiting");
      });

      player.on("dispose", () => {
        videojs.log("player will dispose");
      });
    };

  return (
    <div className='h-full w-full bg-black flex flex-col gap-5 items-center justify-center text-white'>
      <h1>Video Player</h1>
      <div className="">
        <VideoPlayer 
        options={videoPlayerOptions}
        onReady={handlePlayerReady}
        />
      </div>
    </div>
  )
}

export default page
