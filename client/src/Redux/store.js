import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";

const store = configureStore({
    reducer:{
        products: products,
    }
});

export default store;