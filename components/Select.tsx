"use client"

import Image from "next/image";
import {useEffect, useState} from 'react'

import { useRouter } from 'next/navigation';

import useSelectedButton from '../components/hooks/useSelectedButton'
import { useScore } from "./hooks/useScore";

import { BUTTON_TYPES } from "./data/button";
import Button from "./buttons/index";

const choices = [BUTTON_TYPES.SCISSORS, BUTTON_TYPES.PAPER, BUTTON_TYPES.ROCK, BUTTON_TYPES.LIZARD, BUTTON_TYPES.SPOCK]

export default function SelectContent() {

  const {handleUserChoice, choice} = useSelectedButton()

  const scissorsStyle = ` w-24 h-24 lg:w-32 lg:h-32 `;
  const paperStyle = ` w-24 h-24 lg:w-32 lg:h-32 `;
  const rockStyle = `w-24 h-24 lg:w-32 lg:h-32`;
  const lizardStyle = ` w-24 h-24 lg:w-32 lg:h-32`;
  const spokStyle = ` w-24 h-24 lg:w-32 lg:h-32 `;

  const imgBgSize = `lg:!w-[90px] lg:!h-[90px]`;
  const imgHeight = `lg:!h-12`;
  //end select logic


  //begin game logic

  // Use the useScore hook to access score and updateScore
  const { score, updateScore } = useScore();

  // Use the useSelect hook to access userchoice from SelectContent component
  console.log(choice)

  const [computerChoice, setComputerChoice] = useState<String | null>()
  const [result, setResult] = useState<String | null>();

  // const router = useRouter()

  //Set and Get the computer's choice
  useEffect( function () {
    if (choice !== '') {
      const delayedRandomChoice = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        const randomChoices = choices[randomIndex];
        setComputerChoice(randomChoices) // Get the computer's choice
  
        clearTimeout(delayedRandomChoice);
      }, 1000);
    }
  }, [choice]);

  const determineWinner = (userChoice: string, computerChoice: string | String) => {
    if (userChoice === computerChoice) return 'A DRAW!';
    if (
      (userChoice === BUTTON_TYPES.ROCK && (computerChoice === BUTTON_TYPES.SCISSORS || computerChoice === BUTTON_TYPES.LIZARD)) ||
      (userChoice === BUTTON_TYPES.PAPER && (computerChoice === BUTTON_TYPES.ROCK || computerChoice === BUTTON_TYPES.SPOCK)) ||
      (userChoice === BUTTON_TYPES.SCISSORS && (computerChoice === BUTTON_TYPES.PAPER || computerChoice === BUTTON_TYPES.LIZARD)) ||
      (userChoice === BUTTON_TYPES.LIZARD && (computerChoice === BUTTON_TYPES.SPOCK || computerChoice === BUTTON_TYPES.PAPER)) ||
      (userChoice === BUTTON_TYPES.SPOCK && (computerChoice === BUTTON_TYPES.SCISSORS || computerChoice === BUTTON_TYPES.ROCK))
    ) {
      return 'YOU WIN';
    } else {
      return 'YOU LOSE';
    }
  };

  useEffect(() => {
    // Calculate the winner once both choices are available
    if (choice && computerChoice) {
      const delayedResult = setTimeout(() => {
        const result = determineWinner(choice, computerChoice);
        setResult(result);

        // Use the updateScore function from the context to update the score
        if (result === 'YOU WIN') {
          updateScore('win');
          localStorage.setItem('score', (score + 1).toString()); // Persist the score in localStorage
        } else if (result === 'YOU LOSE' && score > 0) {
          updateScore('lose');
          localStorage.setItem('score', (score - 1).toString()); // Persist the score in localStorage
        }
        
      }, 1000);

      return () => clearTimeout(delayedResult);
    }
  }, [choice, computerChoice]);

  

  const playAgain = () => {
    window.location.reload()
  }
  
  const btnPosition = `m-auto w-20 h-20 z-10 lg:w-44 lg:h-44`
  const imgBgSizeGame = `!w-[70px] !h-[70px] lg:!w-32 lg:!h-32`
  const imgHeightGame = `!h-10 lg:!h-16 lg:!w-16`

  return (
    <>
      <div className="lg:absolute lg:top-[30%]">
        <div className="relative flex justify-center items-center z-30">
          
          <Button
            type={BUTTON_TYPES.SCISSORS}
            btnIcon={BUTTON_TYPES.SCISSORS}
            btnPosition_Size={`${scissorsStyle}`}
            btnClick={()=> handleUserChoice(BUTTON_TYPES.SCISSORS)} // Pass the choice to the handler
            imgbg_size={`${imgBgSize}`}
            imgSize={`${imgHeight}`}
          />
            <div className=" w-10 h-3 bg-black"></div>
          <Button
            type={BUTTON_TYPES.PAPER}
            btnIcon={BUTTON_TYPES.PAPER}
            btnPosition_Size={`${paperStyle}`}
            btnClick={()=> handleUserChoice(BUTTON_TYPES.PAPER)} // Pass the choice to the handler
            imgbg_size={`${imgBgSize}`}
            imgSize={`${imgHeight}`}
          />
            <div className=" w-10 h-3 bg-black"></div>
          <Button
            type={BUTTON_TYPES.ROCK}
            btnIcon={BUTTON_TYPES.ROCK}
            btnPosition_Size={`${rockStyle}`}
            btnClick={()=> handleUserChoice(BUTTON_TYPES.ROCK)} // Pass the choice to the handler
            imgbg_size={`${imgBgSize}`}
            imgSize={`${imgHeight}`}
          />
            <div className=" w-10 h-3 bg-black"></div>
          <Button
            type={BUTTON_TYPES.LIZARD}
            btnIcon={BUTTON_TYPES.LIZARD}
            btnPosition_Size={`${lizardStyle}`}
            btnClick={()=> handleUserChoice(BUTTON_TYPES.LIZARD)} // Pass the choice to the handler
            imgbg_size={`${imgBgSize}`}
            imgSize={`${imgHeight}`}
          />
            <div className=" w-10 h-3 bg-black"></div>
          <Button
            type={BUTTON_TYPES.SPOCK}
            btnIcon={BUTTON_TYPES.SPOCK}
            btnPosition_Size={`${spokStyle}`}
            btnClick={()=> handleUserChoice(BUTTON_TYPES.SPOCK)} // Pass the choice to the handler
            imgbg_size={`${imgBgSize}`}
            imgSize={`${imgHeight}`}
          />
        </div>
      </div>

      {/* play view */}
      <div className='flex flex-col justify-between h-[50vh] font-Barlow lg:absolute lg:top-[55%] lg:flex-row lg:items-center'>
        <div className='flex gap-16 tracking-widest'>
          <div className='flex flex-col items-center justify-center'>
            <div className='w-32 h-32 rounded-full bg-[hsl(237,49%,15%)]/70 mb-8 relative flex lg:w-44 lg:h-44'>

              {/* show overlay when user wins */}
              {result === 'YOU WIN' && (
                <div className=" group absolute inset-y-0 left-auto -right-[64px] m-auto w-64 h-64 bg-white/5 rounded-full flex justify-center items-center lg:w-[30rem] lg:h-[30rem] lg:-right-[150px]">
                  <div className=" w-56 h-56 bg-white/5 rounded-full flex justify-center items-center lg:w-[20rem] lg:h-[20rem]">
                    <div className=" w-44 h-44 bg-white/5 rounded-full lg:w-[10rem] lg:h-[10rem]"></div>
                  </div>
                </div>
              )}
              
              {/* dynamic content gets button chosen from select component using useParams*/}
              <Button type={choice}
                btnIcon={choice}
                btnPosition_Size={`${btnPosition}`}
                imgbg_size={`${imgBgSizeGame}`}
                imgSize={`${imgHeightGame}`}
              />
            </div>
            <span className='lg:mb-16 lg:text-xl'>YOU PICKED</span>
          </div>

          <div className='hidden lg:flex flex-col justify-center items-center text-center tracking-normal mt-10 z-10'>
            {result ? (
              <div>
                <h1 className='text-6xl mb-5 font-bold lg:text-5xl'>{result}</h1>
                <button onClick={playAgain} className='bg-white text-[hsl(229,25%,31%)] text-lg tracking-widest rounded-lg py-4 px-14 hover:text-red-500'>PLAY AGAIN</button>
              </div>) : (<div>Waiting...</div>)}
          </div>

          <div className='flex flex-col items-center'>
            <div className='w-32 h-32 rounded-full bg-[hsl(237,49%,15%)]/70 mb-8 relative flex lg:w-44 lg:h-44'>

              {/* show overlay when user loses */}
              {result === 'YOU LOSE' && (
                <div className=" group absolute inset-y-0 left-auto -right-[64px] m-auto w-64 h-64 bg-white/5 rounded-full flex justify-center items-center lg:w-[30rem] lg:h-[30rem] lg:-right-[150px]">
                  <div className=" w-56 h-56 bg-white/5 rounded-full flex justify-center items-center lg:w-[20rem] lg:h-[20rem]">
                    <div className=" w-44 h-44 bg-white/5 rounded-full lg:w-[10rem] lg:h-[10rem]"></div>
                  </div>
                </div>
              )}

              <Button type={computerChoice}
                btnIcon={computerChoice}
                btnPosition_Size={`${btnPosition}`}
                imgbg_size={`${imgBgSizeGame}`}
                imgSize={`${imgHeightGame}`}
              />
            </div>
            <span className='whitespace-nowrap lg:mb-16 lg:text-xl'>THE HOUSE PICKED</span>
          </div>
        </div>

        <div className='lg:hidden flex flex-col justify-center items-center text-center'>
          {result ? (
            <div>
              <h1 className='text-6xl mb-5 font-bold'>{result}</h1>
              <button onClick={playAgain} className='bg-white text-[hsl(229,25%,31%)] text-lg tracking-widest rounded-lg py-4 px-20'>PLAY AGAIN</button>
            </div>) : (<div></div>)}
        </div>
      </div>
    </>
  );
}
