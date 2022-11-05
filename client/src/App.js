import { Route, Routes } from "react-router-dom"
import NavBar from "./routes/navbar"
import LandingPage from "./routes/components/LandingPage/LandingPage"
import Home from "./routes/home"
import GuitarDetail from "./routes/guitarDetail"
import Payment from "./routes/components/Payment/Payment";
import Error from "./routes/components/Payment/Error";
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
    <Route path='/home/:id' element={<GuitarDetail/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/newProduct" element={<ProductForm />} />
    <Route path="/editProduct/:id" element={<ProductForm />} />
    <Route path="/payment/validation" element={<Payment/>}/>
    <Route path="/payment/error" element={<Error/>}/>
   </Routes>
   <Footer/>
   </>
  );
}

export default App
