import React, { useEffect, useState, useContext } from 'react'
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/userProvider';
import { MdLeaderboard } from 'react-icons/md';



export const Nav = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const home = () =>{
    navigate('/');
  }

  const leaderBoard = () =>{
    navigate('/leaderboard');
  }

  return (
    <div >
      <nav className="bg-yellow-400 mx-auto flex max-w-7xl items-center justify-between p-7 lg:px-5">
        <div className="hidden lg:flex lg:flex-1 max-w-xl">
            <div onClick={ home } className="cursor-pointer hover:text-yellow-100 mx-5 bg-opacity-75 text-6xl font-bold leading-6 text-white">QuickKeys</div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="mx-10 text-3xl font-bold leading-6 text-gray-900">{username}</div>
          <div onClick={ leaderBoard } className="cursor-pointer hover:opacity-40 text-3xl"><MdLeaderboard /></div>
        </div>
      </nav>
    </div>
  )
}
