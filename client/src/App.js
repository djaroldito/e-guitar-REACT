import { Route, Routes } from 'react-router-dom';
import NavBar from './routes/navbar';
import LandingPage from './routes/components/LandingPage/LandingPage';
import Home from './routes/home';

function App() {
  return (
   <>
   <NavBar/>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/home' element={<Home/>}/>
   </Routes>
   </>
  );
}

export default App;
