import { Outlet } from "react-router-dom";
import NavBar from "./navbar"

export default function NavbarLayout () {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}