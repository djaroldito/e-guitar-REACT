import React, { useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineGoogle } from "react-icons/ai"
import "./Styles/Login.css";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//  login-signin Google
// Agregar loguito de Gmail en el botón
// Averiguar por el reseteo de password
// Modificar el código para que permita usar el botón de google
// Acá sólo iría un campo con el pwrd, si no coincide tira error -> chequear la data de la db


export default function Login() {
    const registerEmail = useRef();
    const registerPsw = useRef();

    const [showPsw, setShowPsw] = useState(false);

    
    const handleSignIn = (e) =>{
        e.preventDefault();

        try{

        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div >
        <div id="loginContainer">
            <h2 className='loginTitle'>Log In</h2>
            <form className="signInForm" onSubmit={(e) => handleSignIn(e)}>
                <fieldset>
                    <input type="text" placeholder='User' required />
                    <AiOutlineUser className='loginUsIc' />
               </fieldset>
                <fieldset>
                    <input type={showPsw ? "text" : "password"} placeholder='Password' id="password" required />
                    <div className='loginEyeIcon' onClick={() => setShowPsw(!showPsw)}>
                        {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
                    </div>
                </fieldset>

                <div className='loginPsw'>
                    <p>Forgot Password?</p>
                </div>
                <button type='submit' className="submitBtn">Log In</button>
                
                <div className='loginGg'>
                    <p>Or sign In whith</p>
                </div>
                <div>
                    <AiOutlineGoogle size={30} className='signinGgIc'/> 
                </div>
                <button className="loginBtn google">Log in with Google+</button>
                
                <div className='loginAcc'>
                    <p>Don't you have an Account?</p>
                </div>

                <div className='loginSup'>
                    <NavLink to="/signup">
                        <p>SIGN UP</p>
                    </NavLink>
                </div>
            </form>
        </div>
    </div>
  )
}