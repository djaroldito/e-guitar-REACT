import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
/* import favourites from "./favouritesSlice"; */
import dashboard from './dashboardSlice'

const store = configureStore({
    reducer:{
        products: products,
        /* favourites: favourites, */
        dashboard
    }
});

export default store;