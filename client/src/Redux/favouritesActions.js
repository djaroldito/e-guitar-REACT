/* 
ESQUELETO DE CÓDIGO PARA CUANDO ARMEMOS LOS FAVS, 
PARA AJUSTAR

import axios from "axios";
import { getFavourites } from "./favouritesSlice";

export const getAllFavs = () => (dispatch) => {
    axios("http://localhost:3001/favs")
    .then(res => dispatch(getFavourites(data)))
    .catch(error => console.log(error))
} */

