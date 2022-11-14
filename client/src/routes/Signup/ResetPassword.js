import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  
import { AiOutlineUser, AiOutlineMail } from  "react-icons/ai";
import "./Styles/ResetPassword.css"
import Swal from 'sweetalert2';
import axios from 'axios';


export default function ResetPassword () {
    const navigate = useNavigate();
    const email = useRef();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
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
    // Corroborar que no exista ese mail registrado ------------------------------------------
/*         const { data } = await axios.get("/ruser/email", {
            params: {
              email: email.current.value
            }})
      
          if (data) return Swal.fire("This email is already registered") */

        axios.post("/ruser/reset-password", input)
        Swal.fire("Please, check your email to reset your password");
        setInput({
            fullname: "",
            email: ""
        });
        navigate("/home");
    }

  return (
    <div className="resetBox">

        <div className='resetContainer'>
            <div className='resetLeft'>
                <h2>Reset Password</h2>
                <form className='resetForm'  onSubmit={handleSubmit}>
                    <fieldset>
                        <input type="text"
                        name="fullname"
                        value={input.fullname}
                        onChange={handleChange}
                        placeholder="User"
                        className='resetInput'
                        required
                        />
                        <AiOutlineUser className='loginUsIc' />
                    </fieldset>
                    <fieldset>
                        <input type="email"
                        name="email"
                        value={input.email} 
                        onChange={handleChange}
                        placeholder="Email"
                        className='resetInput'
                        required
                        />
                        <AiOutlineMail className='loginUsIc' />
                    </fieldset>
                    <button className='resetBtn'>Reset!</button>
                </form>
            </div>

            <div className='resetRight'></div>
        </div>
    </div>
  )
}
