import React, { useState } from 'react';


// Create a provider component to wrap your app
export function useScore() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  // Define a function to update the score
  const updateScore = (result) => {
    if (result === 'win') {
      setScore(score + 1);
    } else if (result === 'lose' && score > 0) {
      setScore(score - 1);
    }
  };

  return {score, updateScore}
}

