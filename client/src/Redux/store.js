import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
import signup from "./SignupSlice";
/* import favourites from "./favouritesSlice"; */
import dashboard from './dashboardSlice'

const store = configureStore({
    reducer:{
        products: products,
        signup: signup,
        /* favourites: favourites, */
        dashboard
    }
});

export default store;