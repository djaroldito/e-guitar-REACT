import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
import user from './userSlice';
/* import favourites from "./favouritesSlice"; */

const store = configureStore({
    reducer:{
        products: products,
        user
        /* favourites: favourites, */
    }
});

export default store;