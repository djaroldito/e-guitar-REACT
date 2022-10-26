import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
/* import favourites from "./favouritesSlice"; */

const store = configureStore({
    reducer:{
        products: products,
        /* favourites: favourites, */
    }
});

export default store;