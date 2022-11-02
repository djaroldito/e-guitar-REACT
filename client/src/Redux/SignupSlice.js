import { createSlice }  from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        user: {}
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { setError, addUser } = signupSlice.actions;
export default signupSlice.reducer;