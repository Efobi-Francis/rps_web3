"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useSelectedButton() {
  const router = useRouter();

  const [choice, setChoice] = useState(localStorage.getItem('userChoice') || null);

  const handleUserChoice = (buttonSelected) => {
    setChoice(buttonSelected);
    localStorage.setItem('userChoice', buttonSelected);
   
    router.push('/play');
  };

  // Return both choice and handleUserChoice
  return { choice, handleUserChoice };
}
