import React, { useContext } from 'react'
import { UserContext } from '../context/userProvider';



export const Home = () => {
  const { username } = useContext(UserContext);

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello World
      </h1>
    </>
  )
}



