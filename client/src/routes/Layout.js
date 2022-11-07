import { Outlet } from "react-router-dom";
import NavBar from "./navbar"
import Footer from "./components/footer"

export default function Layout () {
    return (
        <div>
            <NavBar />
            {/* All routes no protected */}
            <Outlet />
            <Footer />
        </div>
    )
}