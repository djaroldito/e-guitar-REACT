import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
import signup from "./SignupSlice";
/* import favourites from "./favouritesSlice"; */


const store = configureStore({
    reducer:{
        products: products,
        signup: signup,
        /* favourites: favourites, */
    }
});

export default store;