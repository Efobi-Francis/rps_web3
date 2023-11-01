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
        <h1 className=" text-6xl text-white uppercase w-[35%] flex justify-between mb-10">
          <span className="text-[hsl(349,71%,52%)]">rock</span>
          <span className="text-[hsl(230,89%,62%)]">paper</span>
          <span className="text-[hsl(39,89%,49%)]">scissors</span>  
        </h1>
        <p className=" uppercase mb-5 text-white text-3xl">login to play game</p>
        <button onClick={handleLogin}
          disabled={loading}
          className={`${btnStyle} ${loading ? 'opacity-50' : ''}`}>{loading ? "Loading..." : "Login to play"}
        </button>
        {loading && (
          <div className=" mt-2">please manually reload after login ...</div>
        )}
      </div>
    </>
  )
}
