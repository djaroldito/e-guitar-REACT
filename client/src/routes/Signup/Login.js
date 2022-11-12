import React, { useEffect, useRef, useState  } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Styles/Login.css";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser} from "react-icons/ai"
import axios from "axios";
import Swal from "sweetalert2";
import Home from "../home";
import {LoginButton} from "./LoginButton";
import {gapi} from 'gapi-script'

export default function Login() {


  const cli = "1071381556347-p8k8tg37ss2e9ag86088tvdds19dot5o.apps.googleusercontent.com"

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:"1071381556347-p8k8tg37ss2e9ag86088tvdds19dot5o.apps.googleusercontent.com",
        scope:"email"
      })
    }
    gapi.load('client:auth2', start)
  })

  const navigate = useNavigate()
  const email = useRef();
  const password = useRef();
  const [showPsw, setShowPsw] = useState(false);

  const getEmail = sessionStorage.getItem("emailGoogle");

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
          sessionStorage.setItem("imageURL", data.avatar);
        localStorage.setItem("carrito", JSON.stringify(data.products));
        sessionStorage.setItem("userId", data.id);
        navigate("/home", { state: { sessionStorage, localStorage } });
      }
    } catch (error) {
      console.log(error.message, Swal.fire({
        title: "User not found, please try again",
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
    <div className="loginBox">
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
              <NavLink to="/reset-password">
                <p>Forgot your password?</p>
              </NavLink>
            </div>
            <button type="submit" className="submitBtn">
              Log In
            </button>

            <div className="loginGg">
              <p>Or log in with: </p>
              <LoginButton/>
            </div>
            <div className="loginAcc">
              <p>You don't have an account?</p>
            </div>

            <div className="loginSup">
              <NavLink to="/signup">
                <p>Sign up</p>
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

