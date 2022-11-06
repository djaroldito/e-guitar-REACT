import movie from "../../../vid/StockVideo.mp4"
import { NavLink } from "react-router-dom"
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
			<div className='offers'>
				{/* {offers.map(product => {
						return (<div>
							<img src={product.img}></img>
							<p>{product.brand}</p>
							<p>{product.model}</p>
						</div>)
					}
				)} */}
			</div>
			{/* <div className="about">
				<h2>Acerca de nosotros</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum sit amet velit quis blandit. Curabitur libero nibh, varius ac pellentesque non, tristique maximus ipsum. In sollicitudin, tellus quis hendrerit porttitor, risus libero semper turpis, nec pharetra tellus purus fermentum lectus. Duis fringilla ultrices nunc. Proin ultrices mi non libero placerat fringilla. Integer eros nibh, accumsan a imperdiet vitae, convallis nec sapien. Aenean at rhoncus urna.
				Morbi porta risus at congue feugiat. Fusce tempus pulvinar porta. Donec vulputate porta mi. Vivamus at velit arcu. Nam auctor mauris nisl, eu dictum elit vestibulum quis. Fusce in nisl nec ligula iaculis tristique. Fusce orci mauris, bibendum id massa in, interdum porttitor turpis. Morbi semper eleifend erat, sit amet aliquam ex mollis non. Sed placerat aliquet ex eget venenatis. Nulla varius vulputate blandit. Fusce molestie cursus risus at euismod. Sed sit amet turpis at arcu congue porta a in ante. Integer facilisis est felis, a consectetur risus rutrum sit amet.</p>
			</div> */}
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
