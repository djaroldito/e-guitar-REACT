import React, { useRef } from 'react';
import { NavLink } from "react-router-dom"
import "./Styles/Login.css";



export default function Login() {
    


    // Navbar -> regitrarse / login
    // comprar algo !login -> registrarte
    //  login-signin facebook
<<<<<<< HEAD
=======
    // Reformatear el Login -> sólo usuario, contraseña y botón de Google + mje de Need an Account? Sign Up
    // Agregar loguito de Gmail en el botón
    // Averiguar por el reseteo de password
    // Rutas y localStorage
    // Modificar el código para que permita usar el botón de google

    
    const handleSignIn = (e) =>{
        e.preventDefault();
>>>>>>> dev

   /*  const email= useRef();
    const user= useRef();
    const password= useRef();

    const getEmail = localStorage.getItem("emailData");
    const getPassword = localStorage.getItem("passwordData")
 */

    const handleSubmit = () =>{
        /* if(email.current.value & password.current.value){
            localStorage.setItem("userDate",user.current.value)
            localStorage.setItem("emailData",email.current.value)
            localStorage.setItem("passwordData",password.current.value)
        } */
    }

  return (
<<<<<<< HEAD
    <div id="loginContainer">
        
        <div className="loginLeft">
            <h3>Create your account</h3>
            <button className="loginBtn Facebook">Log in with Facebook</button>
            <button className="loginBtn Twitter">Log in with Twitter</button>
            <button className="loginBtn google">Log in with Google+</button>
            <button className="loginBtn linkedin">Log in with LinkedIn+</button>
        </div>
       { 
        <div className="loginRight">
            <h2>Or use the classical way</h2>
            <form class="form" onSubmit={handleSubmit}>
=======
    <div >
        <div id="loginContainer">
            <h2 className='loginTitle'>Log In</h2>
            <form className="signInForm" onSubmit={(e) => handleSignIn(e)}>
>>>>>>> dev
                <fieldset>
                    <input type="text" placeholder='User' required />
                </fieldset>
                <fieldset>
<<<<<<< HEAD
                    <input type="email" placeholder='E-mail' /* ref={email} */ required />
                </fieldset>
                <fieldset>
                    <input type="password" placeholder='Password' /* ref={password}  */required />
=======
                    <input type="password" placeholder='Password' required />
>>>>>>> dev
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
        }
    </div>
  )
}