import { Route, Routes } from 'react-router-dom';
import NavBar from './routes/navbar';
import LandingPage from './routes/components/LandingPage/LandingPage';
import Home from './routes/home';
import GuitarDetail from './routes/guitarDetail';
import Cart from './routes/components/cart';
import Register from './routes/Signup/register';
import Login from './routes/Signup/Login';


function App() {
  return (
   <>
   <NavBar/>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/home/:id' element={<GuitarDetail/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path="/register" element={<Register />} />   
    <Route path="/login" element={<Login />} /> 
   </Routes>
   </>
  );
}

export default App;
