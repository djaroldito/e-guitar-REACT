import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postSignupForm } from "../../Redux/SignupActions";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlineGoogle } from "react-icons/ai";
import Swal from "sweetalert2";
import "./Styles/Signup.css";
import axios from 'axios';
import GoogleLogin from 'react-google-login';

// Falta buscar si el usuario ya existe en la db
// Registrarte con goolge a partir de Auth0
// Averiguar cómo hacer para enviar también los datos del carrito del localStorage
// Enviar un mail de confirmación de usuario

export default function Signup() {
  const email = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPsw, setShowPsw] = useState(false);
  
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });
  
  const [errors, setErrors] = useState({});
  /* const [isSubmitting, setIsSubmitting] = useState(false); */

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
    setErrors(validate({
      ...user,
      [e.target.name]: e.target.value
    }));
  };

  async function handleSubmit(e){
    e.preventDefault();
    // Corroborar que no exista ese mail registrado ------------------------------------------
     const { data } = await axios.get("/ruser/email", {
      params: {
        email: email.current.value
      }})

    if (data) return Swal.fire("This email is already registered")
      else { 
    // Dispatch del post ---------------------------------------------------------------------
      console.log("llega al dispatch de postSignupForm")  
      await postSignupForm(user);} 
      console.log("Sale del dispatch del postSignupForm")
    // Sweet Alert ---------------------------------------------------------------------------
    Swal.fire("Successful Registration", "Please check your email to activate your account");
    
    // cleanDetail  -------------------------------------------------------------------------
    // Limpiar los estados ------------------------------------------------------------------
    setUser({
      fullname: "",
      email: "",
      password: "",
      password2: ""
    });

    // Retornar al home
    navigate('/home');
  }

  // Errors ----------------------------------------------------------------------------------

  function validate(user) {
    let errors = {};

    if (!user.fullname.trim()) {
      errors.fullname = 'Username is required';
    };
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'A valid email is required';
    };

    if (!user.password) {
      errors.password = 'Password is required';
    } else if (user.password.length < 8) {
      errors.password = 'Password must have at least 8 characters';
    } 
    if (!user.password2) {
      errors.password2 = 'Password is required';
    } else if (user.password2 !== user.password) {
      errors.password2 = 'Passwords dont match';
    }

    return errors;
  }

  return (
    <div className='signupBox'>
    <div id='signupContainer'>
      <h2>Sign up</h2>
        
      <form className='signupForm' onSubmit={handleSubmit}>
          <fieldset>
            <input type="text" 
              name="fullname" 
              value={user.fullname}
              onChange={handleChange} 
              placeholder='User' 
              required />
              <AiOutlineUser className='loginUsIc' />
              <div className='supEM'>
              {errors.fullname && <p>{errors.fullname}</p>}
              </div>
          </fieldset>

          <fieldset>
            <input type="email" 
              name="email" 
              value={user.email}
              onChange={handleChange} 
              placeholder='Email' 
              required 
              ref={email}
              />
              <AiOutlineMail className='loginUsIc' />
              <div className='supEM'>
                {errors.email && <p>{errors.email}</p>}
              </div>
          </fieldset>

          <fieldset>
            <input type={showPsw ? "text" : "password"} 
              id="password" 
              name="password" 
              value={user.password}
              onChange={handleChange} 
              placeholder='Password' 
              required />
            <div className='signUpEyeIcon' onClick={() => setShowPsw(!showPsw)}>
             {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
            </div>
            <div className='supEM'>
              {errors.password && <p>{errors.password}</p>} 
            </div>
          </fieldset>

          <fieldset>
            <input type={showPsw ? "text" : "password"} 
              id="password2" 
              name="password2"
              value={user.password2} 
              onChange={handleChange} 
              placeholder='Confirm Password' 
              required />
            <div className='signUpEyeIcon' onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
            </div>
            <div className='supEM'>
             {errors.password2 && <p>{errors.password2}</p>} 
            </div>
          </fieldset>
        
        <button className='signupBtn'>Sign up</button>

        <div className="signupGg">
            <p>Or sign up with: </p>
        </div>
            <GoogleLogin className='supGoogleBtn'/>
      </form>
    </div>
    </div>
  )
}
