import { createSlice }  from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        detail: {},
        cart: [],
        brands: [],
        colors: [],
        types: [],
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
            state.cart.find(el=>el.id === action.payload.id) ?
            state.cart = [...state.cart]:
            state.cart = [...state.cart, action.payload]
                  
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
               getProductToCart,
               getAllBrands,
               getAllColors,
               getByFilters,
               delAllProductToCart,
               delProductToCart,
               getAllTypes } = productSlice.actions;

export default productSlice.reducer;