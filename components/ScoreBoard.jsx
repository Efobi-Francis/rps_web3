import React from 'react'
import { useScore } from './hooks/useScore'

export default function ScoreBoard() {

  // Use the useScore hook to access the score
  const { score } = useScore();

  return (
    <div className='flex flex-col items-center justify-center font-Barlow'>
      <span className='text-[hsl(229,64%,46%)]'>SCORE</span>
      <span className=' text-5xl text-[hsl(229,25%,31%)] font-bold'>{score}</span>
    </div>
  )
}
