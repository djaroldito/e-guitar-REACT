import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Pagination from "./components/Pagination/Pagination"
import ProductCard from "./components/ProductCard/ProductCard"
import {
  getAllPrds,
  getTypes,
  getColors,
  getBrands,
} from "./../Redux/productActions";
import SearchBar from "./components/searchbar";
import Filter from "./components/filters";
import { setCurrentPage } from './../Redux/productSlice'
import NoFound from "./components/nofound"
import Slideshow, { Slide } from "./components/slide"
import Pic1 from './../pics/Home/0e76b10d1a66b36227b63ade286d5063--trippy-wallpaper-wallpapers-android_edited.jpg'
import Pic2 from './../pics/Home/Electric-Guitar-Wallpapers-HD-Free-Download.jpg'
import Pic3 from './../pics/Home/slash_wallpaper_by_spritanium_d2szct4-fullview_edited.jpg'
import {IoMdOptions} from 'react-icons/io'


const Home = () => {
	const dispatch = useDispatch()
	const products = useSelector((state) => state.products.products)
	const {currentPage, pageCount} = useSelector((state) => state.products)
	const ImgSlide = [Pic1, Pic2, Pic3]
	const [filtersShow, setfiltersShow] = useState(false)


	useEffect(() => {
		if (products.length === 0 && products !== 'ERROR') {
			dispatch(getAllPrds())
			dispatch(getTypes());
			dispatch(getColors());
			dispatch(getBrands());
		}
		
	}, [dispatch, products]);

	/// PAGINATION
	const handlePageChange = (pageNumber) => {
		dispatch(setCurrentPage(pageNumber))
	}


	return (
		<>
			{/* <SlideCont>
				<Slideshow controles={false}>
					{ImgSlide.map((item, pos)=>
						<Slide key={pos}>
							<img src={item} alt='guitar code best guitar seller'/>
						</Slide>
					)}
				</Slideshow>
			</SlideCont> */}
		<main>
			<SearchBar />
				<Button className="filterButton" onClick={()=> setfiltersShow(!filtersShow)}>Filter<IoMdOptions/></Button>
			<ContainerDiv>
				<Filter filtersShow={filtersShow} setfiltersShow={setfiltersShow} />
				
				{ products !== 'ERROR'?
				 <CardsCont>
					{products?.map((item) => (
						<ProductCard key={item.id} item={item} />
						))}
				</CardsCont> :
				<NoFound/>}
			</ContainerDiv>
			<Pagination
				handleChange={handlePageChange}
				pagesCount={pageCount}
				currentPage={currentPage}
				/>
		</main>
		</>
	)
}

const CardsCont = styled.div`
	width: 80%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin-right: 25px;
	margin-bottom: 25px;
	min-height: 775px;
	margin-left: auto;
	margin-right: auto;
	@media(max-width: 920px){
		width: 100%;
	}
`


const ContainerDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-left: auto;
	margin-right: auto;
`
const SlideCont = styled.header`
height: 300px;
width: 100%;
margin-right: auto;
overflow: hidden;

`

const Button = styled.button`
display: none;

@media(max-width: 920px){
		display: flex;
		margin-left: auto;
		margin-right: 20px;
	}
`

export default Home
