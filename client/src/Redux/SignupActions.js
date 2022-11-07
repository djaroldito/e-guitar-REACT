import axios from "axios";
import { addUser, getUser } from "./SignupSlice";

export const postSignupForm = (supData) => (dispatch) => {
    try {
        const response = axios.post("/ruser/register", supData)
        console.log("Registrado: ", supData)
        .then((res) => dispatch(addUser(res.data)))
        return response;
    } catch (error) {
        console.log("Esto tira userCreated:", error.message)
    }
}
export const getUserDB = (email) => (dispatch) => {
    
    axios(`/ruser/email?email=${email}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(error => console.log(error));

}

/* export const postRegisterGoogle = (supData) => (dispatch) => {
    try {
        const response = axios.post("http://localhost:3001/ruser/registerGoogle", supData)
        console.log("Registrado: ", supData)
        .then((res) => dispatch(addUser(res.data)))
        return response;        
    } catch (error) {
        console.log("Esto tira userCreated:", error.message)
    }
}; */
