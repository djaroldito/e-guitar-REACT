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
<<<<<<< HEAD
            let newItem = state.products.find(el=> el.id === action.payload)
            let itemInCart = state.cart.find(el=> el.id === newItem.id)
=======
<<<<<<< HEAD
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
=======
            state.cart.find(el=>el.id === action.payload.id) ?
            state.cart = [...state.cart]:
            state.cart = [...state.cart, action.payload]
                  
        },
        delProductToCart: (state, action) => {
            state.cart = state.cart.filter(el=> el.id !== action.payload)
        },
>>>>>>> dev

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

<<<<<<< HEAD
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
=======
    },
>>>>>>> dev
>>>>>>> dev
});

/* getFilteredProducts, createNewProduct */

export const { getAllProducts, 
               getProductById, 
               getProductByBrand,
<<<<<<< HEAD
               getProductToCart,
               getAllBrands,
               getAllColors,
               getByFilters,
               getAllTypes } = productSlice.actions;
=======
               getProductFiltered,
               clearCart,
               getProductToCart,
               delOneFromCart,
               delAllFromCart,

               } = productSlice.actions;

>>>>>>> dev

export default productSlice.reducer;