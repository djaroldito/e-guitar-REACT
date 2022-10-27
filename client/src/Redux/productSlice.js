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
        getProductToCart: (state, action) => {
            state.cart = state.cart.concat(action.payload)
        },
        getAllBrands: (state, action) =>{
            state.brands = action.payload
        },
        getAllColors: (state,action) =>{
            state.colors = action.payload
        },
        getByFilters: (state,action)  =>{
            state.products = action.payload
        },
        getAllTypes:  (state,action)  =>{
            state.types = action.payload
        }
    }
});

export const { getAllProducts, 
               getProductById, 
               getProductByBrand,
               getProductToCart,
               getAllBrands,
               getAllColors,
               getByFilters,
               getAllTypes } = productSlice.actions;

export default productSlice.reducer;