import movie from "../../../vid/StockVideo.mp4"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import "./LandingPage.css"

const LandingPage = () => {
	return (
		<div>
			<video autoPlay loop muted className='LandingBg'>
				<source src={movie} type='video/mp4' />
			</video>
			<NavLink to='/home'>
				<div className='Arrow'>
					<h2 className='ArrowContent'>Ver Catalogo</h2>
				</div>
			</NavLink>
			<div className='title'>
				<h1>
					Guitar <br /> Shop
				</h1>
			</div>
		</div>
	)
}

const Container = styled.div`
	font-size: 35px;
	border-radius: 50%;
	margin-left: 2%;
	color: white;
`
const Link = styled.a`
	text-decoration: none;
`

export default LandingPage
