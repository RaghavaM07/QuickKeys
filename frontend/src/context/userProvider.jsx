import React, { createContext, useState } from 'react'


export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [username, setUsername] = useState('');
  const [RoomDetails, setRoomDetails] = useState({});


  return (
    <UserContext.Provider value={{username,setUsername,RoomDetails,setRoomDetails}}>
    {props.children}
  </UserContext.Provider>
  );
};
