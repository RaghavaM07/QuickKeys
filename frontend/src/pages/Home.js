import React,{ useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/userProvider';
import Axios from "axios";

export const Home = () => {

  const {username} = useContext(UserContext);
  const {RoomDetails,setRoomDetails} = useContext(UserContext);

  const [RoomId,setRoomId] = useState("");

  const navigate = useNavigate();

  const TypingPractice = () =>{
    navigate('/practice');
  }

  const CreateRoom = () =>{
    Axios.get("").then((response) =>{
      const Room = {
        Roomid : response.data,
        creater : true
      };
      setRoomDetails(Room);
    });
    navigate('/compete');
    console.log(RoomDetails.Roomid);
  }

  const JoinRoom = () =>{
    const Room = {
      Roomid : RoomId,
      creater : false
    };
    setRoomDetails(Room);
    navigate('/compete');
  }


  return (
    <>
    <section className='px-3 w-full flex justify-center items-center flex-col'>
      <div className="bg-white py-24 sm:py-32 w-full">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Practice Typing! </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                  <button onClick={ TypingPractice }
                    className="my-20 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Practice
                  </button>
                </div>
              <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center'>
              Boost your typing speed and accuracy with this interactive typing practice and level up your skills!
              </p>
            </div>
          </div>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Multi Player!</h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                <button onClick={ CreateRoom }
                    className="my-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create a Room
                  </button>
                </div>
                <div>
                  <label htmlFor="email" className="my-5 block text-lg text-left font-medium leading-6 text-gray-900">
                    Room Link
                  </label>
                  <div className="mt-2">
                    <input
                      id="Roomid"
                      type="text"
                      onChange={(event) => { setRoomId(event.target.value);}}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button onClick={ JoinRoom }
                    className="my-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Join Room
                  </button>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}
