import axios from "axios";
import { getAllProducts, 
        getProductById, 
        getProductByBrand,
        getProductFiltered } from "./productSlice";

export const getAllPrds = () => (dispatch) => { //-----------------------------------------------------------
    axios("http://localhost:3001/rguitars")
    .then(res => dispatch(getAllProducts(res.data)))
    .catch( error => console.log(error))
}

export const getById = (id) => (dispatch) => { //------------------------------------------------------------
    axios(`http://localhost:3001/rguitars/${id}`)
    .then(res => dispatch(getProductById(res.data)))
    .catch(error => console.log(error))
};

export const getPrdBrand = (brand) => (dispatch) => { //-----------------------------------------------------
    axios(`http://localhost:3001/rguitars?brand=${brand}`)
    .then(res => dispatch(getProductByBrand(res.data)))
    .catch(error => console.log(error))
};

export const getPrdFiltered = (filter) => (dispatch) => { //-------------------------------------------------
    let { brand, type, color } = filter;

    if (type === undefined && color === undefined) {
        axios(`http://localhost:3001/rguitars?brand=${brand}`)
        .then(res => dispatch(getProductFiltered(res.data)))
        .catch(error => console.log(error))

    } else if (color === undefined) {
        axios(`http://localhost:3001/rguitars?brand=${brand}&type=${type}`)
        .then(res => dispatch(getProductFiltered(res.data)))
        .catch(error => console.log(error))

    } else {
        axios(`http://localhost:3001/rguitars?brand=${brand}&type=${type}&color=${color}`)
        .then(res =>dispatch(getProductFiltered(res.data)))
        .catch(error => console.log(error))
    }
}