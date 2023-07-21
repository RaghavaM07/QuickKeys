import React,{useEffect, useState} from 'react'
import { Leaderboard } from '../components/Leaderboard';
import axios from 'axios';

export const Board = () => {
  const [data,setData] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5001/api/leaderboard").then((response) => {
          setData(response.data);
        });
      },[]);
  return (
    <Leaderboard data={data} />
  )
}
