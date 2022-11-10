import axios from "axios";
import { getUser } from "./SignupSlice";

<<<<<<< HEAD
export const postSignupForm = /* async */ (supData) => {
    try {
        console.log("Estamos en axios")
        axios.post("/ruser/register", supData)
        .then(res => console.log("postUser Action response: ", res)) 
        console.log("Salimos del axios")
        return true
=======
export const postSignupForm = (supData) => {
    try {
        axios.post("/ruser/register", supData)
        .then( res => console.log(res))

>>>>>>> dev
    } catch (error) {
        console.log("Esto tira userCreated:", error.message)
    }
};

export const getUserDB = (email) => (dispatch) => {
<<<<<<< HEAD
=======

>>>>>>> dev
    axios(`/ruser/email?email=${email}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(error => console.log(error));
};

export const resetPassword = async (data) => {
    try {
        const response = await axios.post("/ruser/reset-password", data)
        console.log("SignupActions resetPassword Data: ", response);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

