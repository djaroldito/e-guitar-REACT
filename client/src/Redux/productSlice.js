import { createSlice } from "@reduxjs/toolkit"
//borrar

export const productSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		detail: {},
		cart: localStorage.getItem('carrito') ?  JSON.parse(localStorage.getItem("carrito")): [],
		brands: [],
		colors: [],
		orders: [],
        types: [],
        filter: [],
        Filters: {
            color: '',
            type: '',
            brand: '',
            fullName: '',
			minPrice: 0,
			maxPrice: 5000,
			sortPrice: ' '
          },
        currentPage: 1,
        pageCount: 0,
	},
	reducers: {
		getAllProducts: (state, action) => {
            state.products = action.payload
		},
		getProductById: (state, action) => {
			state.detail = action.payload
		},
		getProductFiltered: (state, action) => {
			state.products = action.payload
		},
		getProductToCart: (state, action) => {
			// let cartIndex = state.cart.findIndex(
			// 	(item) => item.id === action.payload.id
			// )
			// if (cartIndex >= 0) {
			// 	state.cart[cartIndex].Cart.quantity += 1
			// } else {
			// 	let tempProduct = { ...action.payload, Cart: {quantity: 1, productId:action.payload.id, userId: parseInt(localStorage.getItem('userId'))}}
			// 	state.cart.push(tempProduct)
			// }
			// localStorage.setItem("carrito", JSON.stringify(state.cart))
			let productFind = state.cart.find(item => item.id === action.payload.id)
			if(productFind){
				productFind.quantity += 1
			} else {
				let tempProduct = {...action.payload, userId: parseInt(localStorage.getItem('userId')) }
				state.cart.push(tempProduct)
			}
			localStorage.setItem("carrito", JSON.stringify(state.cart))
		},

		delOneFromCart: (state, action) => {
			let elToDel = state.cart.findIndex(
				(item) => item.id === action.payload.id
			)
			if (elToDel >= 0) {
				state.cart[elToDel].quantity -= 1
			} else {
				state.cart = state.cart.filter((el) => el.id !== action.payload)
			}
			localStorage.setItem("carrito", JSON.stringify(state.cart))
		},
		getOrder: (state, action) => {
			state.orders = action.payload
		},
		delAllFromCart: (state, action) => {
			return {
				...state,
				cart: state.cart.filter((el) => el.id !== action.payload),
			}
		},
		clearDetail: (state) => {
			state.detail = {}
		},
		
		clearCart: (state, action) => {
			state.cart = []
			localStorage.setItem("carrito", JSON.stringify(state.cart))
		},
		getCart: (state, action) =>{
			state.cart = action.payload
		},
		getAllColors: (state, action) => {
			state.colors = action.payload
		},
		getAllBrands: (state, action) => {
			state.brands = action.payload
		},
		getAllTypes: (state, action) => {
			state.types = action.payload
		},
		getByFilters: (state, action) => {
			state.products = action.payload.length > 0? action.payload: 'ERROR'
        },
        setFilters: (state, action)=>{
            state.Filters = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
		},
        setPageCount(state, action) {
            state.pageCount = action.payload
		},
	
	},
})


export const {
	getAllProducts,
	getProductById,
	//getProductByName,
	getProductFiltered,
	clearCart,
	getProductToCart,
	delOneFromCart,
	delAllFromCart,
	getAllColors,
	getAllBrands,
	getAllTypes,
	getByFilters,
	delAllProductToCart,
    getCart,
    setFilters,
    clearDetail,
    setCurrentPage,
    setPageCount,
	getOrder

} = productSlice.actions

export default productSlice.reducer
