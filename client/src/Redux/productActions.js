import axios from "axios";
import { getAllProducts, getProductById } from "./productSlice";

export const getAllPrds = () => (dispatch) => {
    axios("url")
    .then(res => dispatch(getAllProducts(res.data)))
    .catch( error = console.log(error))
}