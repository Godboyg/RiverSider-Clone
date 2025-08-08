"use client"
import { Geist, Geist_Mono, Poetsen_One } from "next/font/google";
import "./globals.css";
import NavBar from "./Component/NavBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SharedStateProvider } from "@/Context/SharedStateContext";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import store from "./Redux/Store";

export default function RootLayout({ children }) {

  const [ open , setOpen ] = useState(true);

 useEffect(() => {
   const timer = setTimeout(() => {
    setOpen(false);
  },1500)

  return () => clearTimeout(timer);
 },[])

  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  
  const showNavbar = ["/dashboard", "/dashboard/projects", "/dashboard/schedule"].includes(pathname);
  return (
    <html lang="en">
      <body
        className=""
      >
        {
          open ? (
            <div className="h-screen absolute top-0 w-full bg-black text-gray-400 flex items-center justify-center">
            <h1 className='xl:text-5xl md:text-5xl sm:text-3xl text-xl font-bold'>Rolling out the Carpet..</h1></div>
          ) : (
           <Auth0Provider>
            <Provider store={store}>
             <SharedStateProvider>
              {showNavbar && <NavBar />}
              {children}
             </SharedStateProvider>
            </Provider>
          </Auth0Provider>
          )
        }
      </body>
    </html>
  );
}
