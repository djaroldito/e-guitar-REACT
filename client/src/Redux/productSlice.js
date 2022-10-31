import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    detail: {},
    cart: [],
    brands: [],
    types: [],
    colors: [],
    filters: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    getProductById: (state, action) => {
      state.detail = action.payload;
    },
    // getProductByBrand: (state, action) =>{
    //     state.products = action.payload
    // },
    // getProductFiltered: (state, action) =>{
    //     state.products = action.payload
    // },
    getProductToCart: (state, action) => {
      let newItem = state.products.find((el) => el.id === action.payload);
      let itemInCart = state.cart.find((el) => el.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((el) =>
              el.id === newItem.id ? { ...el, quantity: el.quantity + 1 } : el
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    getAllColors: (state, action) => {
      state.colors = action.payload;
    },
    getAllBrands: (state, action) => {
      state.brands = action.payload;
    },
    getAllTypes: (state, action) => {
      state.types = action.payload;
    },
    getByFilters: (state, action) => {
      state.products = action.payload;
    },
    clearDetail: (state, action) => {
      state.detail = {};
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },

    delOneFromCart: (state, action) => {
      let elToDel = state.cart.find((el) => el.id === action.payload);
      return elToDel.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((el) =>
              el.id === action.payload
                ? { ...el, quantity: el.quantity - 1 }
                : el
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((el) => el.id !== action.payload),
          };
    },

    delAllFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload),
      };
    },
  },
});

export const {
  getAllProducts,
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
  setFilters,
  clearDetail,
  delAllProductToCart,
} = productSlice.actions;

export default productSlice.reducer;
