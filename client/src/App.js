import { Route, Routes } from 'react-router-dom';
import NavBar from './routes/navbar';
import Home from './routes/home';
import GuitarDetail from './routes/guitarDetail';

function App() {
  return (
   <>
   <NavBar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/:id' element={<GuitarDetail/>}/>
   </Routes>
   </>
  );
}

export default App;
