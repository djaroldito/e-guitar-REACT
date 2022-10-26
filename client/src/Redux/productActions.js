import axios from "axios";
import { getAllProducts, 
        getProductById, 
        getProductByBrand } from "./productSlice";


export const getAllPrds = () => (dispatch) => { // ---------------------------------------------------------
    axios("http://localhost:3001/rguitars")
    .then(res => dispatch(getAllProducts(res.data)))
    .catch(error => console.log(error))
};

export const getPrdId = (idGuitar) => (dispatch) => { //-----------------------------------------------------
    axios(`http://localhost:3001/rguitars/${idGuitar}`)
    .then(res => dispatch(getProductById(res.data)))
    .catch(error => console.log(error))
};

export const getPrdBrand = (brand) => (dispatch) => { //-----------------------------------------------------
    axios(`http://localhost:3001/rguitars?brand=${brand}`)
    .then(res => dispatch(getProductByBrand(res.data)))
    .catch(error => console.log(error))
}