import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
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
import { useAuth0 } from "@auth0/auth0-react"
import NoFound from "./components/nofound"

const Home = () => {
	const dispatch = useDispatch()
	const products = useSelector((state) => state.products.products)
	const {currentPage, pageCount} = useSelector((state) => state.products)
	
	const {isAuthenticated, user} = useAuth0()
	if (isAuthenticated) {
		localStorage.setItem("emailData", user.email);
		localStorage.setItem("userData", user.name)
	} 
	
	
	useEffect(() => {
		if (products.length === 0 && products !== 'ERROR') {
			dispatch(getAllPrds())
			dispatch(getTypes());
			dispatch(getColors());
			dispatch(getBrands());
		}
		
	}, [dispatch, products]);
	
	console.log(products)
	/// PAGINATION
	const handlePageChange = (pageNumber) => {
		dispatch(setCurrentPage(pageNumber))
	}


	return (
		<main>
			<SearchBar />
			<ContainerDiv>
				<Filter />
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
	)
}

const CardsCont = styled.div`
	width: 70%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin-right: 25px;
	margin-bottom: 25px;
	min-height: 775px;
`

const ContainerDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
`

export default Home
