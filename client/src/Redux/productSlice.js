import { createSlice }  from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        detail: {}
    },
    reducers:{
        getAllProducts: (state, action) =>{
            state.products = action.payload
        },
        getProductById: (state, action) =>{
            state.detail = action.payload
        }, 
        /* Hay que continuar con las funciones */
    }
});

export const { getAllProducts, getProductById } = productSlice.actions;
export default productSlice.reducer;