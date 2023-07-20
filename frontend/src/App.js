import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Compete } from './pages/compete';
import { Practice } from './pages/practice';

function App() {
  return (
    <>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/compete' element={<Compete />}></Route>
            <Route path='/practice' element={<Practice />}></Route>
          </Routes>
        </div>
    </>
  );
}

export default App;
