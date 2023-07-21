import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Compete } from './pages/compete';
import { Practice } from './pages/practice';
import { Board } from './pages/board';
import { Nav } from './components/Nav.jsx';

function App() {
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
