import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { FaUserAlt } from "react-icons/fa"
import Cart from "./components/cart"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineSearch } from "react-icons/ai"
import "../index.css"
import { useAuth0 } from "@auth0/auth0-react"
import { LogoutButton } from "./Signup/Logout"

const NavBar = () => {
	const path = window.location.pathname
	const { isAuthenticated } = useAuth0()
	const handleLog = () => {
		localStorage.clear()
		window.location.reload()
	}
	const email = localStorage.getItem("emailData")
	const isAdmin = localStorage.getItem("isAdmin")

	return (
		<header className={path === "/" ? "headerLanding" : "header"}>
			<NavCont>
				<NavLink to='/home'>Home</NavLink>
				<NavLink to='/'>discount</NavLink>
				{isAdmin && <NavLink to='/newProduct'>Add Product</NavLink>}

				<IconCont className={""}>
					{!isAuthenticated && !email ? (
						<UserCont>
							<NavLink to='/login'>
								<BiLogIn />
							</NavLink>
						</UserCont>
					) : (
						<UserCont>
							{isAuthenticated ? (
								<LogoutButton />
							) : (
								<button onClick={handleLog}>
									<BiLogOut />
								</button>
							)}
						</UserCont>
					)}

					<UserCont className={"logged"}>
						<FaUserAlt />
					</UserCont>
				</IconCont>

				<NavLink to='/cart'>
					<AiOutlineShoppingCart />
				</NavLink>
			</NavCont>
		</header>
	)
}

const NavCont = styled.div`
	max-width: 1200px;
	height: 100%;
	color: whitesmoke;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	a {
		color: whitesmoke;
		text-decoration: none;
		font-weight: 500;
		font-size: 20px;
		padding: 15px;
		transition: 0.4s ease;
	}
	a:hover {
		background-color: #eb984e;
	}
`

const UserCont = styled.div`
	font-size: 20px;
	border-radius: 50%;
	padding: 4px 6px;
	color: rgb(10, 20, 11);
`

const IconCont = styled.div`
	margin-left: auto;
	display: flex;
	flex-direction: row;
	width: 100px;
	justify-content: space-between;

	.logged {
		background-color: white;
	}
`

export default NavBar
