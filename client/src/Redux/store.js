import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
import signup from "./SignupSlice";
/* import favourites from "./favouritesSlice"; */
import signup from "./SignupSlice";

const store = configureStore({
    reducer:{
        products: products,
        signup: signup,
        /* favourites: favourites, */
    }
});

export default store;