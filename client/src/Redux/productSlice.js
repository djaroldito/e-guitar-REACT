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
         
            let cartIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id,
              )
              if (cartIndex >= 0  ) {
                state.cart[cartIndex].quantity += 1
              } else {
                let tempProduct = { ...action.payload, quantity: 1 }
                state.cart.push(tempProduct)
              }
              localStorage.setItem('carrito',JSON.stringify(state.cart))
       
           },

        delOneFromCart: (state, action) => {
       
            let elToDel = state.cart.findIndex(
                (item) => item.id === action.payload.id,
              )
              if (elToDel >= 0  ) {
                state.cart[elToDel].quantity -= 1
              } else {
                state.cart = state.cart.filter(el=> el.id !== action.payload) 
              }
              localStorage.setItem('carrito',JSON.stringify(state.cart))
            
            },
            
         delAllFromCart: (state, action) => {
            return{
             ...state,
             cart: state.cart.filter(el=> el.id !== action.payload)
            }
         },
       
        clearCart: (state, action) => {
            state.cart = []
            localStorage.setItem('carrito',JSON.stringify(state.cart))
        },
        getAllColors: (state, action) =>{
            state.colors = action.payload
        },
        getAllBrands: (state, action) =>{
            state.brands = action.payload
        },
        getAllTypes: (state, action) =>{
            state.types = action.payload
        },
        getByFilters: (state, action)=>{
            state.products = action.payload
        },

       

    },
});

/* getFilteredProducts, createNewProduct */

export const { getAllProducts,
               getProductById,
               getProductByBrand,
               getProductFiltered,
               clearCart,
               getProductToCart,
               delOneFromCart,
               delAllFromCart,
               getAllColors,
               getAllBrands,
               getAllTypes,
               getByFilters,
               delAllProductToCart,
               getCart,
               clearDetail } = productSlice.actions;

export default productSlice.reducer;
