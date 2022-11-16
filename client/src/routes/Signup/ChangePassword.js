import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Styles/ChangePassword.css"
import axios from "axios";
import Swal from 'sweetalert2';


export default function ChangePassword () {
  const navigate = useNavigate();
  const [showPsw, setShowPsw] = useState(false);
  const [errors, setErrors] = useState({});
  const [change, setChange] = useState({
    code: "",
    password: "",
    password2: ""
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setChange({
      ...change,
      [name] : value
    });
    setErrors(validate({
      ...change,
      [e.target.name]: e.target.value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    axios.put("/ruser/new-password", change)
    Swal.fire("You can log in now with your New Password!");
    setChange({
      code: "",
      password: "",
      password2: ""
    })
    navigate("/login")
  }

    // Errors ----------------------------------------------------------------------------------
  function validate(change){
    let errors = {};
    if (!change.password) {
      errors.password = 'Password is required';
    } else if (change.password.length < 8) {
      errors.password = 'Password must have at least 8 characters';
    }
    if (!change.password2) {
      errors.password2 = 'Password is required';
    } else if (change.password2 !== change.password) {
      errors.password2 = 'Passwords dont match';
    }
    return errors;
  }

  return (
    <div className="changeBox">
    <div className='changeContainer'>
      <div className='changeLeft'></div>
      <div className='changeRight'>
        <h2>Change your Password</h2>
        <form className='changeForm' onSubmit={handleSubmit} >
          <fieldset>
            <input type="text"
            name="code"
            value={change.code}
            onChange={handleChange} 
            placeholder="Verification Code"
            className=''
            required
            />
          </fieldset>

          <fieldset>
            <input type={showPsw ? "text" : "password"}
            name="password"
            value={change.password}
            onChange={handleChange} 
            placeholder="New Password"
            className='resetInput'
            required
            />
            <div className='signUpEyeIcon' onClick={() => setShowPsw(!showPsw)}>
             {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
            </div>
            <div className='changeEM'>
              {errors.password && <p>{errors.password}</p>}
            </div>
          </fieldset>

          <fieldset>
            <input type={showPsw ? "text" : "password"}
            name="password2"
            value={change.password2} 
            onChange={handleChange} 
            placeholder="Confirm New Password"
            className='resetInput'
            required
            />
            <div className='signUpEyeIcon' onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
            </div>
            <div className='changeEM'>
             {errors.password2 && <p>{errors.password2}</p>}
            </div>
          </fieldset>

            <button className='changeBtn'>Submit New Password</button>
        </form>
      </div>
    </div>
</div>
    
  )
}
