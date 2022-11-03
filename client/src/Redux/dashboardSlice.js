import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
	adminUser: {},
	productList: [],
	productDetail: {}
}

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setStatus(state, action) {
			state.status = action.payload
		},
		setAdminUser(state, action) {
			state.adminUser = action.payload
		},
		clearAdminUser(state) {
			state.adminUser = {}
		},
		setAllProducts(state, action) {
			state.productList = action.payload
		},
		setProductDetail(state, action) {
			state.productDetail = action.payload
		},
		clearDetail(state) {
			state.productDetail = {}
		},
	},
})

export const fetchAllProducts = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("http://localhost:3001/rguitars")
			dispatch(setAllProducts(data.product))
		} catch (error) {
			console.error("fetchAllProducts:", error.message)
		}
	}
}
export const loginAdminUser = ({ email, password }) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("http://localhost:3001/ruser/login", {
				params: {
					email,
					password,
				},
            })

			dispatch(setAdminUser(data))
        } catch (error) {
            console.error("loginAdminUser:", error.message)
			return { error : error.response ? error.response.data : error.message}
		}
	}
}

export const {
	setStatus,
	setAdminUser,
	clearAdminUser,
	setAllProducts,
	setProductDetail,
	clearDetail,
} = dashboardSlice.actions

export default dashboardSlice.reducer
