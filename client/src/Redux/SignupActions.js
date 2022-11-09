import axios from "axios";
import { getUser } from "./SignupSlice";

export const postSignupForm = async (supData) => {
    try {
        const response = await axios.post("/ruser/register", supData)
        console.log("Registrado: ", response.data)
        return response.data;
    } catch (error) {
        console.log("Esto tira userCreated:", error.message)
    }
}
export const getUserDB = (email) => (dispatch) => {
    
    axios(`/ruser/email?email=${email}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(error => console.log(error));

}

