import React, { useState, useEffect } from 'react'
import { Typearea } from '../components/Typearea'
import { Game, Difficulty } from '../models/Game'
import { Result } from '../components/Result'
import { CompeteLeader } from '../components/CompeteLeader'
import axios from 'axios'




export const Compete = () => {
  const [difficulty, setDifficulty] = useState('EASY');
  const [gameActive, setGameActive] = useState(false);
  const [userDetails, setUserDetails] = useState(null)
  const [data, setData] = useState(null);
  const [ldata, setLData] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5001/api/leaderboard").then((response) => {
      console.log(response.data)
      setLData(response.data);
    });
  }, []);

  useEffect(() => {
    try {
      axios.post(`http://localhost:5001/api/getText`, {
        difficulty
      }).then((response) => {
        const userPlaying = new Game(response.data.paragraph, Difficulty[difficulty].duration, "SOLO")
        setUserDetails(userPlaying);
      })
    }
    catch (error) {
      console.log(error);
    }
  }, [difficulty])

  const startGame = () => {
    setUserDetails({ ...userDetails, duration: Difficulty[difficulty].duration })
    setGameActive(true);
    setGameEnded(false)
  }


  return (
    <>
      <div className="mx-auto grid  items-center gap-x-8 gap-y-16 px-4 py-5 sm:px-6 sm:py-7 lg:px-10 bg-white bg-opacity-80">
        {userDetails && !gameActive && (

          <div className='p-5 flex justify-around items-center border-2 rounded-t-lg bg-white'>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
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
        )}

        {userDetails && gameActive && (
          <>
            <div className="grid grid-cols-5 p-0">
              <div className='col-span-4 p-0'>
                <Typearea userDetails={userDetails} setGameActive={setGameActive} setGameEnded={setGameEnded} setData={setData} />
              </div>
              <div className='p-0'>

                <CompeteLeader data={ldata} />
              </div>

            </div>
          </>
        )}


        {data && gameEnded && (
          <Result data={data} />
        )}
      </div>
    </>
  )
}
