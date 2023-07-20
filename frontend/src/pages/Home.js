import React,{ useContext } from 'react'
import { UserContext } from '../context/userProvider';

export const Home = () => {
    const {username} = useContext(UserContext);

  return (
    <div>Home</div>
  )
}
