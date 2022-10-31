import React, { useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import "./Styles/Signup.css";


export default function Signup() {

  // Acá iría una doble validación de password
  // Sweet alert si se registró correctamente
  const [showPsw, setShowPsw] = useState(false);


  return (
    <div id='signupContainer'>
      <h2>Sign Up</h2>
        
      <form className='signupForm'>
          <fieldset>
            <input type="text" placeholder='User' required />
              <AiOutlineUser className='loginUsIc' />
            </fieldset>
        <fieldset>
          <input type="email" placeholder='Email' required />
            <AiOutlineMail className='loginUsIc' />
        </fieldset>
        <fieldset>
          <input type={showPsw ? "text" : "password"} placeholder='Password' id="password" required />
          <div className='loginEyeIcon' onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
          </div>
        </fieldset>
        <fieldset>
          <input type={showPsw ? "text" : "password"} placeholder='Confirm Password' id="password" required />
          <div className='loginEyeIcon' onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
          </div>
        </fieldset>
        
        <button className='signupBtn'>Sign Up</button>
      </form>
    </div>
  )
}

