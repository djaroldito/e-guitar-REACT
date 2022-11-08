import { createSlice }  from "@reduxjs/toolkit";

export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        user: {},
        activate: true,
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        }, 
        getUser: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { setError, addUser, getUser } = signupSlice.actions;
export default signupSlice.reducer;