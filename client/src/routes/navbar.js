import { NavLink } from "react-router-dom"
import styled from "styled-components"
import SearchBar from "./components/searchbar"
import { useState } from "react"
import { BiLogIn } from "react-icons/bi"
import { FaUserAlt } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import Cart from "./components/cart"

const NavBar = () => {
	const [isActive, setIsActive] = useState(false)

	const handleClick = () => {
		setIsActive((current) => !current)
	}

	return (
		<header>
			<NavCont>
				<NavLink to='/home'>Home</NavLink>
				<NavLink to='/'>discount</NavLink>
				<Search>
					<div style={isActive ? { display: "block" } : { display: "none" }}>
						<SearchBar />
					</div>
					<button onClick={handleClick}>
						<AiOutlineSearch />
					</button>
				</Search>
				<IconCont>
					<UserCont>
						<BiLogIn />
					</UserCont>
					<UserCont className={"logged"}>
						<FaUserAlt />
					</UserCont>
				</IconCont>
				<NavLink to='/cart'>Cart</NavLink>
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
const Search = styled.div`
	font-size: 20px;
	display: flex;
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
