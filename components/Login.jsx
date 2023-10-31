"use client"

import { useState } from "react";
import { getAuthentication } from "../auth/ImmutableAuth";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    await getAuthentication();
    
    setLoading(false)
  };

  const btnStyle = `font-medium bg-[hsl(230,89%,65%)] py-4 px-10 border-2 border-white rounded-lg 
  tracking-widest text-lg uppercase text-white`

  return(
    <>
      <div className=" w-full h-screen bg-gradient-to-b from-[hsl(214,47%,23%)] to-[hsl(237,49%,15%)] font-Barlow flex flex-col justify-center items-center">
        <p className=" uppercase mb-5 text-white text-3xl">login to play game</p>
        <button onClick={()=>handleLogin}
          disabled={loading}
          className={`${btnStyle} ${loading ? 'opacity-50' : ''}`}>{loading ? "Loading..." : "Login to play"}
        </button>
      </div>
    </>
  )
}
