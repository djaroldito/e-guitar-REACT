import { createSlice }  from "@reduxjs/toolkit";


export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        user: {}
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { getUser } = signupSlice.actions;
export default signupSlice.reducer;