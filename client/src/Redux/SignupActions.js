import axios from "axios";
import { getUser, getUserById } from "./SignupSlice";

export const postSignupForm =  async (supData) => {
    try {
        await axios.post("/ruser/register", supData)
        .then(res => console.log("postUser Action response: ", res)) 
    } catch (error) {
        console.log("Esto tira userCreated:", error.message)
    }
};

export const getUserDB = (email) => (dispatch) => {
    axios(`/ruser/email?email=${email}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(error => console.log(error));
};


export const getUserId = (id) => (dispatch) => {
    axios(`/ruser?id=${id}`)
    .then(res => dispatch(getUserById(res.data)))
    .catch(error => console.log(error))
};

