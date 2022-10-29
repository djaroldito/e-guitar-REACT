import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Styles/Login.css";
import axios from "axios";
import Swal from "sweetalert2";
import Home from "../home";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const getEmail = localStorage.getItem("emailData");
  const getPassword = localStorage.getItem("passwordData");

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
        <h2 className="loginTitle">Log In</h2>
        {getEmail & getPassword ? (
          <Home />
        ) : (
          <form className="signInForm" onSubmit={handleSignIn}>
            <fieldset>
              <input type="text" placeholder="Email" ref={email} required />
            </fieldset>
            <fieldset>
              <input
                type="password"
                placeholder="Password"
                ref={password}
                required
              />
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
