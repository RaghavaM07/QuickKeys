import React, { useEffect, useState, useContext } from 'react'
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/userProvider';
import { MdLeaderboard } from 'react-icons/md';



export const Nav = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   Axios.get("").then((response) => {
  //     setUsername(response.data);
  //   });
  // });

  const leaderBoard = () =>{
    navigate('/leaderboard');
  }

  return (
    <div >
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <div class="mx-10 text-3xl font-bold leading-6 text-gray-900">username</div>
          <div onClick={ leaderBoard } class="cursor-pointer hover:opacity-40 text-3xl"><MdLeaderboard /></div>
        </div>
      </nav>
    </div>
  )
}
