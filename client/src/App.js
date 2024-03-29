import { Route, Routes } from "react-router-dom";
import LandingPage from "./routes/components/LandingPage/LandingPage";
import Home from "./routes/home";
import Profile from "./routes/Signup/Profile";
import GuitarDetail from "./routes/guitarDetail";
import Payment from "./routes/components/Payment/Payment";
import Error from "./routes/components/Payment/Error";
import Cart from './routes/components/cart';
import Signup from './routes/Signup/Signup';
import Login from './routes/Signup/Login';
import ProductForm from './routes/components/ProductForm/ProductForm'
import OrderEmpty from "./routes/components/Order/OrderEmpty";
import Activate from "./routes/Signup/activate.js"
import Layout from "./routes/Layout"
import DashboardRoute from "./routes/components/Dashboard/DashboardRoute"
import Dashboard from './routes/components/Dashboard/Dashboard'
import OrderDetail from './routes/components/Order/OrderDetail'
import ResetPassword from "./routes/Signup/ResetPassword";
import ChangePassword from "./routes/Signup/ChangePassword"
import PrePayment from "./routes/components/PrePayment";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<GuitarDetail />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/home/Profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderEmpty/>} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/activate/:email" element={<Activate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />}/>
          <Route path="/newProduct" element={<ProductForm />} />
          <Route path="/editProduct/:id" element={<ProductForm />} />
          <Route path="/payment/validation" element={<Payment />} />
          <Route path="/payment/error" element={<Error />} />
          <Route path="/prePayment" element={<PrePayment />} />

        </Route>

        {/* PROTECTED ROUTES FOR ADMIN DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <DashboardRoute>
              <Dashboard />
            </DashboardRoute>
          }
        />
        {/* Redirect to landing if don´t match */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
