import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
	user: {},
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		clearUser(state) {
			state.user = {}
		}
	},
})

export const loginUser = ({ email, password }) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("http://localhost:3001/ruser/login", {
				params: {
					email,
					password,
				},
            })
            dispatch(setUser(data))
        } catch (error) {
            console.error("loginUser:", error.message)
			return { error : error.response ? error.response.data : error.message}
		}
	}
}

export const {
	setUser,
	clearUser,
} = userSlice.actions

export default userSlice.reducer