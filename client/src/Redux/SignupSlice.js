import { createSlice }  from "@reduxjs/toolkit";


export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        user: {},
        userId: {}
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
        getUserById: (state, action) => {
            state.userId = action.payload
        }
    }
});

export const { getUser, getUserById } = signupSlice.actions;
export default signupSlice.reducer;