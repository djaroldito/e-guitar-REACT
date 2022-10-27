import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { RiAdminFill } from "react-icons/ri"
// redux
import { useDispatch, useSelector } from "react-redux"
import { clearAdminUser } from "../../../Redux/dashboardSlice"

const NavBar = () => {
    const dispatch = useDispatch()
    const { adminUser } = useSelector((state) => state.dashboard)

	return (
		<header style={ {backgroundColor: 'blue'}}>
			<NavCont>
                <NavLink to='/dashboard'>Dashboard</NavLink>
                <RiAdminFill /> {adminUser.username}
				<NavLink to='/home' onClick={() => dispatch(clearAdminUser())}> Logout</NavLink>
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

