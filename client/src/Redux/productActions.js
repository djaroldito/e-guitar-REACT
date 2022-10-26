import axios from "axios";
import { getAllProducts, getProductById } from "./productSlice";

export const getAllPrds = () => (dispatch) => {
    axios("http://localhost:3001/rguitars")
    .then(res => dispatch(getAllProducts(res.data)))
    .catch( error => console.log(error))
}

export const getById = (id) => (dispatch) => {
    axios(`http://localhost:3001/rguitars/${id}`)
    .then(res => dispatch(getProductById(res.data)))
    .catch(err => console.log(err))
}