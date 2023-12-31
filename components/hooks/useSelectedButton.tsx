"use client"

import { useState } from 'react';

export default function useSelectedButton() {
  const [choice, setChoice] = useState('');
    
  const handleUserChoice = (buttonSelected: string) => {
    setChoice(buttonSelected);
  };


  // Return both choice and handleUserChoice
  return { choice, handleUserChoice };
}
