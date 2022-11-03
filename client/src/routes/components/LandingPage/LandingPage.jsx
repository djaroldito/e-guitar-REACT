import movie from "../../../vid/StockVideo.mp4"
import { NavLink } from "react-router-dom"
import { AiOutlineCreditCard } from "react-icons/ai"
import { MdOutlineLocalShipping } from "react-icons/md"
import { FaShieldAlt } from "react-icons/fa"
import styled from "styled-components"
import "./LandingPage.css"

import React from "react"




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
			<footer className='footerLandingPage'>
				<Container>
					<AiOutlineCreditCard />
				</Container>
				<Link href='#'>
					<p>Pagá con tarjeta en cuotas</p>
				</Link>
				<Container>
					<MdOutlineLocalShipping />
				</Container>
				<p>Envios Gratis a todo el país</p>
				<Container>
					<FaShieldAlt />
				</Container>
				<p>Compra Segura</p>
			</footer>
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
