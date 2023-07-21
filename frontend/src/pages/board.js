import React,{useEffect, useState} from 'react'
import { Leaderboard } from '../components/Leaderboard';
import axios from 'axios';

export const Board = () => {
  const [data,setData] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5001/api/leaderboard").then((response) => {
          console.log(response.data)
          setData(response.data);
        });
      },[]);
  return (
    
    <div className="bg-white bg-opacity-50 p-10 px-40">
    <Leaderboard data={data} />
    </div>
  )
}
