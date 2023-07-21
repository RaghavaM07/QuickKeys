import React, { createContext, useState } from 'react'


export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [username, setUsername] = useState('');


  return (
    <UserContext.Provider value={{username,setUsername}}>
    {props.children}
  </UserContext.Provider>
  );
};
