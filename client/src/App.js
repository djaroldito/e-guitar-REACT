import { Route, Routes } from 'react-router-dom';
import NavBar from './routes/navbar';
import LandingPage from './routes/components/LandingPage/LandingPage';
import Home from './routes/home';
import GuitarDetail from './routes/guitarDetail'

function App() {
  return (
   <>
   <NavBar/>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/:id' element={<GuitarDetail/>}/>
   </Routes>
   </>
  );
}

export default App;
