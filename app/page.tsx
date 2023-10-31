"use client"

import useAuth from '@/components/hooks/useAuth'
import GameView from '@/components/GameView'
import Login from '@/components/Login'

export default function Home() {
  const {isAuthenticated} = useAuth()

  if (isAuthenticated) {
    return <GameView />;
  }else {
    return <Login />;
  }

}
