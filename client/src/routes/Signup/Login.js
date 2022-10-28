import React, { useRef } from 'react';
import "./Styles/Login.css";

export default function Login() {
    const registerEmail = useRef();
    const registerPsw = useRef();

    //back <-> front <- formulario
    // Administrador -> 
    // Login

    // Navbar -> regitrarse / login
    // comprar algo !login -> registrarte
    
    //  login-signin facebook
    // Reformatear el Login -> sólo usuario, contraseña y botón de Google + mje de Need an Account? Sign Up

    const handleSignIn = (e) =>{
        e.preventDefault();

        try{

        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div id="loginContainer">
        <div className="loginLeft">
            <h3>Create your account</h3>
            <button className="loginBtn google">Log in with Google+</button>
        </div>

        <div className="loginRight">
            <h2>Or use the classical way</h2>
            <form class="form" onSubmit={(e) => handleSignIn(e)}>
                <fieldset>
                    <input type="text" placeholder='User' required />
                </fieldset>
                <fieldset>
                    <input type="email" placeholder='E-mail' required />
                </fieldset>
                <fieldset>
                    <input type="password" placeholder='Password' required />
                </fieldset>
                <button type='submit' className="submitBtn">Sign Up</button>
            </form>
        </div>
    </div>
  )
}