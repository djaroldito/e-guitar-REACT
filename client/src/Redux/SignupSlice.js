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
    },
});

export const { addUser, activateUser } = signupSlice.actions;
export default signupSlice.reducer;