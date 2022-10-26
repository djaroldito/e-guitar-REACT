import { createSlice }  from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        detail: {},
    },
    reducers:{
        getAllProducts: (state, action) =>{
            state.products = action.payload
        },
        getProductById: (state, action) =>{
            state.detail = action.payload
        }, 
        getProductByBrand: (state, action) =>{
            state.products = action.payload
        },
        getProductFiltered: (state, action) =>{
            state.products = action.payload
        }
    }
});

/* getFilteredProducts, createNewProduct */

export const { getAllProducts, 
               getProductById, 
               getProductByBrand,
               getProductFiltered } = productSlice.actions;

export default productSlice.reducer;