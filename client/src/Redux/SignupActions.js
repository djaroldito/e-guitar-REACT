import axios from "axios";
import { getUser } from "./SignupSlice";

export const postSignupForm = (supData) => {
    try {
        axios.post("/ruser/register", supData)
        .then( res => console.log(res))

    } catch (error) {
        console.log("Esto tira userCreated:", error.message)
    }
}
export const getUserDB = (email) => (dispatch) => {

    axios(`/ruser/email?email=${email}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(error => console.log(error));

}

