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
        getProductToCart: (state, action) => {
            state.cart = state.cart.concat(action.payload)
        }
    }
});

export const { getAllProducts, 
               getProductById, 
               getProductByBrand,
               getProductToCart } = productSlice.actions;

export default productSlice.reducer;