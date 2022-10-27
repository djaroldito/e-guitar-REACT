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
            let newItem = state.products.find(el=> el.id === action.payload)
            let itemInCart = state.cart.find(el=> el.id === newItem.id)

            return itemInCart 
            ?{
                ...state,
                cart:state.cart.map(el=> el.id === newItem.id ? {...el, quantity: el.quantity + 1}:el)
            } 
            :{ 
                ...state, 
                cart:[...state.cart, {...newItem, quantity:1}],
            
            }
                     
        },
        clearCart: (state, action) => {
            state.cart = []
        },

        delOneFromCart: (state, action) => {
           let elToDel = state.cart.find(el=> el.id === action.payload)
           return elToDel.quantity > 1 ? {
            ...state,
            cart:state.cart.map(el=> el.id === action.payload ? {...el, quantity: el.quantity - 1}: el)

           }
           :{
            ...state,
            cart: state.cart.filter(el=> el.id !== action.payload)
           }
        },

        delAllFromCart: (state, action) => {
           return{
            ...state,
            cart: state.cart.filter(el=> el.id !== action.payload)
           }
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

               } = productSlice.actions;


export default productSlice.reducer;