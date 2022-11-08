import { createSlice }  from "@reduxjs/toolkit";
<<<<<<< HEAD
=======

>>>>>>> dev

export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        user: {},
        activate: true,
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
<<<<<<< HEAD
        },
    },
});

export const { addUser, activateUser } = signupSlice.actions;
=======
        }, 
        getUser: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { setError, addUser, getUser } = signupSlice.actions;
>>>>>>> dev
export default signupSlice.reducer;