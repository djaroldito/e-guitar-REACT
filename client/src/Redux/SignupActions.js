import axios from "axios";
import { addUser } from "./SignupSlice";

export const postSignupForm = (supData) => (dispatch) => {
    try {
        const response = axios.post("/ruser/register", supData)
        console.log("Registrado: ", supData)
        .then((res) => dispatch(addUser(res.data)))
        return response;
    } catch (error) {
        console.log("Esto tira userCreated:", error.message)
    }
};
