import React, { useEffect,useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './context/userProvider';
import { Home } from './pages/Home';
import { Compete } from './pages/compete';
import { Practice } from './pages/practice';
import { Board } from './pages/board';
import { Nav } from './components/Nav.jsx';
import Axios from 'axios';

function App() {
  
  const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem('dataKey')){
      setUsername(localStorage.getItem('dataKey'))
    }
    else{
      Axios.get("http://localhost:5001/api/newUsername").then((response) => {
        localStorage.setItem('dataKey', response.data.username);
        setUsername(response.data.username);
      });
    }
  },[]);

  return (
    <>
        <div className="App">
          <Nav />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/compete' element={<Compete />}></Route>
            <Route path='/practice' element={<Practice />}></Route>
            <Route path='/leaderboard' element={<Board />}></Route>
          </Routes>
        </div>
    </>
  );
}

export default App;
