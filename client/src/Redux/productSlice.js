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
            state.cart = [...state.cart, action.payload]
           // let itemInCart = state.cart.find(item=>item.id === action.payload.id) 
           //console.log(itemInCart)
           
        },
        delProductToCart: (state, action) => {
            state.cart = state.cart.filter(el=> el.id !== action.payload)
        },

        delAllProductToCart: (state, action) => {
            state.cart = []
        },


    },
});

/* getFilteredProducts, createNewProduct */

export const { getAllProducts, 
               getProductById, 
               getProductByBrand,
               getProductFiltered,
               delProductToCart,
               getProductToCart,
               delAllProductToCart } = productSlice.actions;


export default productSlice.reducer;