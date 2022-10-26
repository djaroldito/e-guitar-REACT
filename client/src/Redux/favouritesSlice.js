/* 
ESQUELETO DE CÓDIGO PARA CUANDO ARMEMOS LOS FAVS, 
PARA AJUSTAR

import { createSlice }  from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        getFavourites: (state, action) =>{
            state.favourites = action.payload
        }
    }
});

export const { getFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer; */