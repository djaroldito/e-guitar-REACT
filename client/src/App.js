import { Route, Routes } from "react-router-dom"
import NavbarLayout from "./routes/NavbarLayout"
import LandingPage from "./routes/components/LandingPage/LandingPage"
import Home from "./routes/home"
import GuitarDetail from "./routes/guitarDetail"
import Cart from "./routes/components/cart"
// Dashboard
import PrivateRoutes from "./routes/components/Dashboard/PrivateRoutes"
import Dashboard from "./routes/components/Dashboard/Dashboard"

function App() {
	return (
		<>
			<Routes>
				<Route element={<NavbarLayout />}>
					<Route path='/' element={<LandingPage />} />
					<Route path='/home' element={<Home />} />
					<Route path='/:id' element={<GuitarDetail />} />
					<Route path='/cart' element={<Cart />} />
                </Route>

				{/* Dashboard Routes */}
				<Route element={<PrivateRoutes />}>
					<Route path='/dashboard' element={<Dashboard />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
