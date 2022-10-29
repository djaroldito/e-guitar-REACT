import React, { useRef } from 'react';
import { NavLink } from "react-router-dom"
import "./Styles/Login.css";

export default function Login() {
    const registerEmail = useRef();
    const registerPsw = useRef();

    // Navbar -> regitrarse / login
    // comprar algo !login -> registrarte
    //  login-signin facebook
    // Reformatear el Login -> sólo usuario, contraseña y botón de Google + mje de Need an Account? Sign Up
    // Agregar loguito de Gmail en el botón
    // Averiguar por el reseteo de password
    // Rutas y localStorage
    // Modificar el código para que permita usar el botón de google

    
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
                </fieldset>
                <fieldset>
                    <input type="password" placeholder='Password' required />
                </fieldset>

                <div className='loginPsw'>
                    <p>Forgot Password?</p>
                </div>
                <button type='submit' className="submitBtn">Log In</button>
                
                <div className='loginGg'>
                    <p>Or sign In whith</p>
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