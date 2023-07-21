import React, { useState, useEffect } from 'react'
import {Typearea} from '../components/Typearea'
import {Game, Difficulty} from '../models/Game'
import axios from 'axios'

export const Practice = () => {
  const [difficulty,setDifficulty]=useState('EASY');
  const [gameActive,setGameActive]=useState(false);
  const [userDetails,setUserDetails] = useState(null)
  const textToType = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam nemo nihil ipsam. Explicabo nam impedit, consectetur debitis deleniti consequuntur odio, repellendus provident laboriosam ut vero in odit suscipit illo."
  
  useEffect( ()=>{
    // try{
    //   await axios.post(`${process.env.DOMAIN}/api/getText`,{
    //     difficulty
    //   }).then((response)=>{
    //     const userPlaying = new Game(response.textToType,Difficulty[difficulty].duration,"SOLO",0)
    //     setUserDetails(userPlaying);
    //   })
    // }
    // catch(error){
      //   console.log(error);
      // }
          const userPlaying = new Game(textToType,Difficulty[difficulty].duration,"SOLO")
          setUserDetails(userPlaying);
  },[difficulty])

  console.log(userDetails)

  const startGame = () => {
    setUserDetails({ ...userDetails, duration:Difficulty[difficulty].duration})
    setGameActive(true);
  }

  return (
    <>
        { userDetails && !gameActive  && (
          <div className=" mx-auto grid max-w-2xl  items-center gap-x-8 gap-y-16 px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl  lg:px-10">
        
          <div className='p-2 flex justify-around items-center border-2 rounded-t-lg'>
          <select
            value={difficulty}
            onChange={(event)=> setDifficulty(event.target.value)}
            id="difficulty"
            name="difficulty"
            className="h-full rounded-md border-2  bg-transparent bg-none py-0 pl-4 pr-9 text-black-600 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm"
          >
            <option value={"EASY"} >Easy</option>
            <option value={"MEDIUM"}>Medium</option>
            <option value={"HARD"}>Hard</option>
          </select>
          <button
            type="submit"
            onClick={startGame}
            className="block  rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Start Game
          </button>
        </div>
        </div>
        )}

        { userDetails && gameActive && (
          <>
          <Typearea userDetails={userDetails}/>
          </>
        )}
    </>
  )
}
