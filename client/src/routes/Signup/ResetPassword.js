import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from "../../Redux/SignupActions";
import "./Styles/ResetPassword.css"
import Swal from 'sweetalert2';


export default function ResetPassword () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: "",
        email: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput({
            ... input,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("RP componente FRONT, handleSubmit")
        dispatch(resetPassword(input));
        Swal.fire("Please, check your email to reset your password");
        setInput({
            fullname: "",
            email: ""
        });
        navigate("/home");
    }

  return (
    <div id="resetBox">
        <div className='resetContainer'>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
                placeholder="User"
                className='resetInput'
                required
                />
                <input type="email"
                name="email"
                value={input.email} 
                onChange={handleChange}
                placeholder="Email"
                className='resetInput'
                required
                />
                <button className='resetBtn'>Reset!</button>
            </form>
        </div>
    </div>
  )
}
