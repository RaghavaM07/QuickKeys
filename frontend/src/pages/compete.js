import React, { useState, useEffect, useContext,useRef } from 'react'
import { UserContext } from '../context/userProvider';
import { Typearea } from '../components/Typearea'
import { Game, Difficulty } from '../models/Game'
import { Result } from '../components/Result'
import { CompeteLeader } from '../components/CompeteLeader'
import axios from 'axios'
import {io }from "socket.io-client";
import CountdownTimer from '../components/Countdown';

const socket = io('http://localhost:5001');



export const Compete = () => {
  const { username, RoomDetails, setRoomDetails } = useContext(UserContext);

  const [difficulty, setDifficulty] = useState('EASY');
  const [gameActive, setGameActive] = useState(false);
  const [userDetails, setUserDetails] = useState(null)
  const [data, setData] = useState(null);
  const [ldata, setLData] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [st, setSt] = useState(null)
  console.log(socket)

  useEffect(() => {
    if(gameActive){
      socket.emit("updateScore", {
        roomId:RoomDetails.Roomid , 
        newScore:data, 
        username
      });
    }
    
  }, [socket,data,gameActive]);


  useEffect(() => {

    if(RoomDetails.Roomid){
      socket.emit("join", {
        roomId:RoomDetails.Roomid ,
        username
      });
    }
    socket.on("getRoom", (data) => {
        console.log("getRoom",data.para)
        if(!RoomDetails.creater){
          const userPlaying = new Game(data.para, (new Date(data.endBy)-new Date(data.startBy)/1000), "MP")
          setUserDetails(userPlaying);
          setGameActive(true);
          setSt(new Date(data.newRoom.startBy))
          setWaiting(true);
        }
    });

    socket.on("new_member", (data) => {
      console.log("new_member",data)
    });
  
    socket.on("someones_score_update", (data) => {
      console.log("someones_score_update",data)
    });
  }, [socket]);



  useEffect(() => {
    axios.get("http://localhost:5001/api/leaderboard").then((response) => {
      console.log(response.data)
      setLData(response.data);
    });
  }, []);

  const startTimer = async () => {
    try {
      await axios.post(`http://localhost:5001/api/newRoom`, {
        username,
        difficulty
      }).then((response) => {
        setRoomDetails({ ...RoomDetails, Roomid: response.data.newRoom.roomId });
        const userPlaying = new Game(response.data.newRoom.para, Difficulty[difficulty].duration, "MP")
        setUserDetails(userPlaying);
        socket.emit("join", {
          roomId:response.data.newRoom.roomId,
          username
        });
        setGameActive(true);
        setSt(new Date(response.data.newRoom.startBy))
        setWaiting(true);
      })
    }
    catch (error) {
      console.log(error);
    }



  }



  return (
    <>
      <div className="mx-auto grid  items-center gap-x-8 gap-y-16 px-4 py-5 sm:px-6 sm:py-7 lg:px-10 bg-white bg-opacity-80">
       
        {!gameActive && RoomDetails.creater && (

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
              onClick={startTimer}
              className="block  rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Game
            </button>
          </div>
        )}

        {userDetails && gameActive  && (
          <>
            <div className="grid grid-cols-5 p-0">
              <div className='col-span-4 p-0'>
                {waiting ? (
                  <>
                   {RoomDetails.Roomid && (
                     <div className="mt-2 flex items-center gap-x-3">
                    <label htmlFor="photo" className="block text-xl font-medium leading-6 text-gray-900">
                      RoomId
                    </label>
                    <p className="text-gray-500">{RoomDetails.Roomid}</p>
                  </div>
                  )}
                  
                  <CountdownTimer deadline={st} setFlag={setWaiting}/>
                  </>
                ) : (
                  <Typearea userDetails={userDetails} setGameActive={setGameActive} setGameEnded={setGameEnded} setData={setData} />

                )
                }
              </div>
              <div className='p-0'>

                <CompeteLeader data={ldata} />
              </div>

            </div>
          </>
        )}



        {data && gameEnded && (
          <>
          <Result data={data} />
          <CompeteLeader data={ldata} />
          </>
        )}
      </div>
    </>
  )
}
