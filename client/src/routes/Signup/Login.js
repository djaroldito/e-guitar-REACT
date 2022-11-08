import React, { useEffect, useRef, useState  } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Styles/Login.css";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser} from "react-icons/ai"
import axios from "axios";
import Swal from "sweetalert2";
import Home from "../home";
import {LoginButton} from "./LoginButton";
import {gapi} from 'gapi-script'


// !psw => mail con un link hacia un nuevo formulario para resetear contraseña => se borra la psw anterior, se crea una nueva y se guarda en la
// !psw =>
let client = "1071381556347-p8k8tg37ss2e9ag86088tvdds19dot5o.apps.googleusercontent.com"

export default function Login() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:client,
        scope:"email"
      })
    }
    gapi.load('client:auth2', start)
  })



  const navigate = useNavigate()
  const email = useRef();
  const password = useRef();

  const getEmail = sessionStorage.getItem("emailGoogle");


  const [showPsw, setShowPsw] = useState(false);


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("/ruser/login", {
        params: {
          email: email.current.value ? email.current.value : getEmail,
          password: password.current.value,
        },
      });

      if (data) {
        sessionStorage.setItem("emailData", email.current.value);
        sessionStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("carrito", JSON.stringify(data.products));
        sessionStorage.setItem("userId", data.id);
        navigate("/home", { state: { sessionStorage, localStorage } });
      }
    } catch (error) {
      console.log(error.message, Swal.fire({
        title: "Usuario no encontrado",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }));
    }
  };



  return (
    <div>
      <div id="loginContainer">
      <h2>Log In</h2>
        {getEmail ? (
          <Home />
        ) : (
          <form className="signInForm" onSubmit={handleSignIn}>
            <fieldset>
              <input type="text" placeholder="Email" ref={email} required />
              <AiOutlineUser className='loginUsIc' />
            </fieldset>
            <fieldset>
              <input type={showPsw ? "text" : "password"} placeholder='Password' id="password" ref={password}  required />
                <div className='loginEyeIcon' onClick={() => setShowPsw(!showPsw)}>
                    {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
                </div>

            </fieldset>
            <div className="loginPsw">
              <p>Olvidaste tu contraseña?</p>
            </div>
            <button type="submit" className="submitBtn">
              Log In
            </button>

            <div className="loginGg">
              <p>O ingresa con</p>
              <LoginButton/>
            </div>
            <div className="loginAcc">
              <p>No tienes una cuenta?</p>
            </div>

            <div className="loginSup">
              <NavLink to="/signup">
                <p>Regístrate</p>
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

