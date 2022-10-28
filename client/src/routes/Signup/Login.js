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

    // Nav -> (*) Usuario -> contraña, alias, imagen
                // Admin  -> modificaciones pertinentes
    
    // MIEDO : cómo se guardan los datos al registrarse, dónde, cómo se conecta con el back
    // Firebase: configuración front / + seguridad va en el back
    
    //  login-signin facebook
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
            <button className="loginBtn Facebook">Log in with Facebook</button>
            <button className="loginBtn Twitter">Log in with Twitter</button>
            <button className="loginBtn google">Log in with Google+</button>
            <button className="loginBtn linkedin">Log in with LinkedIn+</button>
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