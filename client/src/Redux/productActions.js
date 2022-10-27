import axios from "axios";
<<<<<<< HEAD
import {
  getAllProducts,
  getProductById,
  getProductByBrand,
  getAllBrands,
  getAllColors,
  getByFilters,
  getAllTypes,
} from "./productSlice";

export const getAllPrds = () => (dispatch) => {
  axios("http://localhost:3001/rguitars")
    .then((res) => dispatch(getAllProducts(res.data)))
    .catch((error) => console.log(error));
};

export const getById = (id) => (dispatch) => {
  axios(`http://localhost:3001/rguitars/${id}`)
    .then((res) => dispatch(getProductById(res.data)))
    .catch((err) => console.log(err));
};

export const getBrands = () => (dispatch) => {
  axios(`http://localhost:3001/rfilters/brands`)
    .then((res) => dispatch(getAllBrands(res.data)))
    .catch((err) => console.log(err));
};

export const getColors = () => (dispatch) => {
  axios(`http://localhost:3001/rfilters/colors`)
    .then((res) => dispatch(getAllColors(res.data)))
    .catch((err) => console.log(err));
};

export const getTypes = () => (dispatch) =>{
    axios(`http://localhost:3001/rfilters/types`)
    .then((res) => dispatch(getAllTypes(res.data)))
    .catch((err) => console.log(err))
}

export const getByFilter = ({color, brand, type}) => (dispatch) => {
  axios(`http://localhost:3001/rguitars?color=${color}&brand=${brand}&type=${type}`)
    .then((res) => dispatch(getByFilters(res.data)))
    .catch((err) => console.log(err));
};
=======
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
>>>>>>> dev
