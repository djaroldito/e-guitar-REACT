import React from "react"
import { NavLink, Link } from "react-router-dom"
import styled from "styled-components"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { FaUserAlt } from "react-icons/fa"

import { AiOutlineShoppingCart } from "react-icons/ai"
import { LogoutButton } from "./Signup/LogoutButton.js"

import guitarIco from "./../pics/guitarcode_white.png"

const NavBar = () => {
	const handleLog = () => {
		sessionStorage.removeItem("emailData")
		sessionStorage.removeItem("isAdmin")
		sessionStorage.removeItem("passwordData")
		localStorage.removeItem("carrito")
		sessionStorage.removeItem("userId")
		window.location.reload()
	}
	const email = sessionStorage.getItem("emailData")
	const isAdmin = sessionStorage.getItem("isAdmin")
	const emailGoogle = sessionStorage.getItem("emailGoogle")
	const userImage = sessionStorage.getItem("imageURL")

	return (
		<header className={"header"}>
			<NavCont>
				<Logo>
					<Link to='/'>
						<img src={guitarIco} alt='guitar code title' />
					</Link>
				</Logo>
				<NavLink to='/home'>Home</NavLink>
				{/* <NavLink to="/">discount</NavLink> */}

				{isAdmin === "true" ? <NavLink to='/dashboard'>Dashboard</NavLink> : ""}

				<IconCont>
					{!email && !emailGoogle ? (
						<NavLink to='/login' title='Log In'>
							<BiLogIn />
						</NavLink>
					) : (
						<>
							{email ? (
								<>
									<div className='user-icon'>
										{userImage ? (
											<img src={userImage} alt='user' width={20}></img>
										) : (
											<FaUserAlt />
										)}
									</div>
									<NavLink to='/home' onClick={handleLog} title='Log Out'>
										<BiLogOut />
									</NavLink>
								</>
							) : (
								emailGoogle && (
									<div className='user-icon'>
										<LogoutButton />
									</div>
								)
							)}
						</>
					)}

					<NavLink to='/cart'>
						<AiOutlineShoppingCart />
					</NavLink>
				</IconCont>
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

	a,
	.user-icon {
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

const IconCont = styled.div`
	margin-left: auto;
	display: flex;
	flex-direction: row;
	width: 120px;
	justify-content: space-between;
`

const Logo = styled.div`
	margin-right: 15px;
	a:hover {
		padding: 40px 15px 15px 15px;
	}
	img {
		width: 135px;
	}
`

export default NavBar
