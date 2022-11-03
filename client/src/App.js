import { Route, Routes } from "react-router-dom"
import NavBar from "./routes/navbar"
import LandingPage from "./routes/components/LandingPage/LandingPage"
import Home from "./routes/home"
import GuitarDetail from "./routes/guitarDetail"

import Cart from './routes/components/cart';
import Signup from './routes/Signup/Signup';
import Login from './routes/Signup/Login';

import ProductForm from './routes/components/ProductForm/ProductForm'
import Footer from './routes/components/footer';


function App() {
  return (
   <>
   <NavBar/>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/:id' element={<GuitarDetail/>}/>
    <Route path='/cart' element={<Cart/>}/>

   </Routes>
   </>
  );
}

export default App
