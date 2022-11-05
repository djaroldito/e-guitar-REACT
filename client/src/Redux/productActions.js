import axios from "axios"
import {
	getAllProducts,
	getProductById,
	getAllBrands,
	getAllColors,
	getByFilters,
	getAllTypes,
	setCurrentPage,
	setPageCount,
	fiterError
} from "./productSlice"

export const getAllPrds = () => (dispatch) => {
	axios("/rguitars")
		.then((res) => {
			dispatch(getAllProducts(res.data.products))
			dispatch(setCurrentPage(1))
			dispatch(setPageCount(res.data.pageCount))
		})
		.catch((error) => console.log(error))
}


export const getById = (id) => (dispatch) => {
	axios(`/rguitars/${id}`)
		.then((res) => dispatch(getProductById(res.data)))
		.catch((err) => console.log(err))
}

// export const getByName = (Name, currentPage) => (dispatch) => {
// 	axios(`http://localhost:3001/rguitars?fullName=${Name}&page=${currentPage}`)
// 		.then((res) => {
// 			dispatch(getProductByName(res.data.products))
// 			dispatch(setCurrentPage(res.data.currentPage))
// 			dispatch(setPageCount(res.data.pageCount))
// 		})
// 		.catch((err) => console.log(err))
// }
export const getBrands = () => (dispatch) => {
	axios(`/rfilters/brands`)
		.then((res) => dispatch(getAllBrands(res.data)))
		.catch((err) => console.log(err))
}
export const getColors = () => (dispatch) => {
	axios(`/rfilters/colors`)
		.then((res) => dispatch(getAllColors(res.data)))
		.catch((err) => console.log("colors", err))
}
export const getTypes = () => (dispatch) => {
	axios(`/rfilters/types`)
		.then((res) => dispatch(getAllTypes(res.data)))
		.catch((err) => console.log(err))
}

export const getByFilter = (filter, currentPage) => (dispatch) => {
    const { color, brand, type, fullName, minPrice, maxPrice } = filter

	axios(
		`/rguitars?color=${color}&brand=${brand}&type=${type}&fullName=${fullName}&page=${currentPage}&minPrice${minPrice}&maxPrice${maxPrice}`
	)
		.then((res) => {
            dispatch(getByFilters(res.data.products))
            dispatch(setCurrentPage(res.data.currentPage))
			dispatch(setPageCount(res.data.pageCount))
		})
		.catch((err) => console.log(err))
}

export const postProductForm = async (formData) => {
	try {
		const { data: productCreated } = await axios.post(
			"/rguitars/",
			formData
		)
		return productCreated
	} catch (error) {
		console.error("postProductForm:", error.message)
		return { error: error.response ? error.response.data : error.message }
	}
}
export const editProductForm = async (formData) => {
	try {
		const { data: productUpdated } = await axios.put(
			`/rguitars/${formData.id}`,
			formData
		)
		return productUpdated
	} catch (error) {
		console.error("editProductForm:", error.message)
		return { error: error.response ? error.response.data : error.message }
	}
}
export const payment = async (cart) => {
	try{
		const {data: link} = await axios.post(`/payments/create-order`, cart)
		return link;
	} catch (error) {
		return { error: error.response ? error.response.data : error.message }
	}
}
