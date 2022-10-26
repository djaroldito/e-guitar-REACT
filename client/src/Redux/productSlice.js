import { createSlice }  from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        detail: {},
        cart: []
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
        },
        getProductToCart: (state, action) => {
            state.cart = state.cart.concat(action.payload)
        }
    }
});

/* getFilteredProducts, createNewProduct */

export const { getAllProducts, 
               getProductById, 
               getProductByBrand,
               getProductFiltered,
               getProductToCart } = productSlice.actions;


export default productSlice.reducer;