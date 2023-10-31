"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useScore } from '@/components/hooks/useScore';

import Image from 'next/image'

import logobonus from '../public/assets/images/logo-bonus.svg'
import imagerulesbonus from '../public/assets/images/image-rules-bonus.svg'
import iconclose from '../public/assets/images/icon-close.svg'

import { passportInstance } from '../auth/ImmutableAuth'
import useAuth from './hooks/useAuth'

import Login from '../components/Login'
import Select from '../components/Select'


interface UserDetails {
  nickname?: string;
  email?: string;
  sub?: string;
  accessToken?: string;
  idToken?: string;
}

export default function GameView() {

  const [isClicked, setIsClicked] = useState(false);

  const [user, setUser] = useState<UserDetails | undefined>()

  const router = useRouter();

  const {score} = useScore()

  const {isAuthenticated} = useAuth()


  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  const getUser = async () => {
    try {
      const userInfo = await passportInstance.getUserInfo();
      const accessToken = await passportInstance.getAccessToken();
      const idToken = await passportInstance.getIdToken();

      const UserDetail = {
        nickname: userInfo?.nickname,
        email: userInfo?.email,
        sub: userInfo?.sub,
        accessToken: accessToken,
        idToken: idToken,
      };

      console.log(user?.nickname)

      setUser(UserDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( ()=> {
      getUser()
  },[])

  const handleClickOpen = () => {
    setIsClicked(true);
  };

  const handleClickClose = () => {
    setIsClicked(false);
  };

  return (
    <html lang="en">
      <body>
        <div className=" sm:flex sm:flex-col h-screen bg-gradient-to-b from-[hsl(214,47%,23%)] to-[hsl(237,49%,15%)] lg:relative overflow-hidden">
          <div className=" container mx-auto flex flex-col h-screen justify-between lg:max-w-3xl">
            <header className="flex justify-between items-center outline outline-4 outline-[hsl(217,16%,45%)] rounded-lg mt-3  p-2 lg:p-5 lg:mt-7 lg:outline-2 lg:mx-10">
              <Image
                src={logobonus}
                alt="logo"
                className="h-16 ml-5 lg:h-auto"
              />

              <section className=" flex flex-col text-white w-72 whitespace-nowrap">
                <p>Nickname: {user?.nickname}</p>
                <p>Email: {user?.email}</p>
                <p className=' truncate w-full'>Sub: {user?.sub}</p>
              </section>

              <div className="bg-white flex justify-center w-24 h-24 rounded-lg lg:w-32 lg:h-[115px]">
                {/* displays score */}
                <div className='flex flex-col items-center justify-center font-Barlow'>
                  <span className='text-[hsl(229,64%,46%)]'>SCORE</span>
                  <span className=' text-5xl text-[hsl(229,25%,31%)] font-bold'>{score}</span>
                </div>
              </div>
            </header>

            
            <main className=" text-white flex justify-center flex-col items-center">
              {/* if auth is true display gameModal else login */}
              <Select/>
            </main>

            <footer className=" flex justify-center text-white pb-20 font-Barlow ">
              <button
                onClick={()=> passportInstance.logout()}
                className="relative bottom-10 border-2 border-white py-2 px-10 rounded-lg tracking-widest text-lg lg:absolute lg:bottom-0 lg:left-0 lg:mb-10 lg:ml-10"
              >
                LOGOUT
              </button>
              <button
                onClick={handleClickOpen}
                className="relative bottom-10 border-2 border-white py-2 px-10 rounded-lg tracking-widest text-lg lg:absolute lg:bottom-0 lg:right-0 lg:mb-10 lg:mr-10"
              >
                RULES
              </button>
              {isClicked && (
                <>
                  <div className="lg:hidden flex flex-col items-center justify-between h-screen w-full absolute top-0 bg-white pb-24 z-30">
                    <h1 className="text-[hsl(229,25%,31%)] text-4xl mt-20 font-bold">
                      RULES
                    </h1>
                    <Image src={imagerulesbonus} alt="image-rules-bonus" />
                    <button onClick={handleClickClose}>
                      <Image src={iconclose} alt="icon-close" />
                    </button>
                  </div>

                  {/* overlay */}
                  <div className="hidden lg:block w-full h-screen bg-black/50 absolute inset-0 z-30"></div>

                  <div className="hidden lg:flex flex-col absolute top-36 bottom-40 bg-white px-6 py-5 rounded-lg z-30">
                    <div className=" flex justify-between">
                      <span className="text-[hsl(229,25%,31%)] text-3xl font-bold">
                        RULES
                      </span>
                      <button onClick={handleClickClose}>
                        <Image src={iconclose} alt="icon-close" />
                      </button>
                    </div>
                    <Image
                      src={imagerulesbonus}
                      alt="image-rules"
                      className="mt-7"
                    />
                  </div>
                </>
              )}
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
