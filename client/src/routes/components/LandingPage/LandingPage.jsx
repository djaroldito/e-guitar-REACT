import movie from "../../../vid/StockVideo.mp4"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import "./LandingPage.css"
import React from "react"
import Offers from "../Offers/Offers"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner2 from '../../../vid/banner2.png';
import banner3 from '../../../vid/banner3.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const LandingPage = () => {
	return (
		<div>
			<video autoPlay loop muted className='LandingBg'>
				<source src={movie} type='video/mp4' />
			</video>
			<a href='#offers'>
				<div className='Arrow'>
					<h2 className='ArrowContent'>View our offers!</h2>
				</div>
			</a>
			<div className='title'>
				<h1>
					{ '{ GUITAR CODE }' }
				</h1>
			</div>
			<div className='ImageSwiper'>
				<div>
					<Swiper
						className="swiper-slide"
						modules={[Navigation, Scrollbar, A11y]}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: true }}
					>
						<SwiperSlide>
							<img src='https://media.rainpos.com/6645/fenderbanner3.jpg' style={{width: "100%"}}></img>
						</SwiperSlide>
						<SwiperSlide>
							<img src={banner2} style={{width: "100%"}}></img>
						</SwiperSlide>
						<SwiperSlide>
							<img src={banner3} style={{width: "100%"}}></img>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
			<div className='offers' id='offers'>
				<h1 style={{marginLeft: "5%"}}>Offers</h1>
				<Offers></Offers>
			</div>
			<div className="NavLinkContainer">
				<NavLink to='/home' className="PaymentLink">see all products</NavLink>
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
