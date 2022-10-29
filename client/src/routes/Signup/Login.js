import React, { useRef, useState  } from "react";
import { NavLink } from "react-router-dom";
import "./Styles/Login.css";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineGoogle } from "react-icons/ai"


import axios from "axios";
import Swal from "sweetalert2";
import Home from "../home";
import { useAuth0 } from "@auth0/auth0-react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export default function Login() {
  const email = useRef();
  const password = useRef();

  const getEmail = localStorage.getItem("emailData");
  const getPassword = localStorage.getItem("passwordData");

  const [showPsw, setShowPsw] = useState(false);
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    localStorage.setItem("userData", user);
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:3001/ruser/login", {
        params: {
          email: email.current.value,
          password: password.current.value,
        },
      });

      if (data) {
        localStorage.setItem("emailData", email.current.value);
        localStorage.setItem("passwordData", password.current.value);
        localStorage.setItem("isAdmin", data.isAdmin);
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
        {getEmail & getPassword ? (
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
              <p>Forgot Password?</p>
            </div>
            <button type="submit" className="submitBtn">
              Log In
            </button>

            <div className="loginGg">
              <p>Or sign In whith</p>
            </div>
            <div>
                    <AiOutlineGoogle size={30} className='signinGgIc'/> 
                </div>
            <button
              className="loginBtn google"
              onClick={() => loginWithRedirect()}
            >
              Log in with Google
            </button>
            <div className="loginAcc">
              <p>Don't you have an Account?</p>
            </div>

            <div className="loginSup">
              <NavLink to="/signup">
                <p>SIGN UP</p>
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

