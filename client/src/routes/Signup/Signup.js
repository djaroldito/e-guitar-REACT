import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    password2: ""
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
    const { data } = await axios.get("http://localhost:3001/ruser/email", {
      params: {
        email: email.current.value
      }})

    if (data) return Swal.fire("El Email pertenece a un usuario registrado")
      else{
    // Dispatch del post ---------------------------------------------------------------------
        dispatch(postSignupForm(user));};
        
    /* setIsSubmitting(true); */
    
    // Sweet Alert ---------------------------------------------------------------------------
    console.log(Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario registrado exitosamente',
      showConfirmButton: false,
      timer: 1500
    }));
    
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
  };

  // Errors ----------------------------------------------------------------------------------

  function validate(user) {
    let errors = {};

    if (!user.fullname.trim()) {
      errors.fullname = 'Es requerido un nombre de Usuario';
    };
    if (!user.email) {
      errors.email = 'Es requerido un Email';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Es requerido un Email válido';
    };

    if (!user.password) {
      errors.password = 'Es requerida una contraseña';
    } else if (user.password.length < 8) {
      errors.password = 'Debe tener un mínimo de 8 caracteres';
    } 
    if (!user.password2) {
      errors.password2 = 'Es requerida una contraseña';
    } else if (user.password2 !== user.password) {
      errors.password2 = 'No coinciden las contraseñas';
    }

    return errors;
  }

  return (
    <div id='signupContainer'>
      <h2>Regítrate</h2>
        
      <form className='signupForm' onSubmit={handleSubmit}>
          <fieldset>
            <input type="text" 
              name="fullname" 
              value={user.fullname}
              onChange={handleChange} 
              placeholder='Usuario' 
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
            <div className='loginEyeIcon' onClick={() => setShowPsw(!showPsw)}>
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
              placeholder='Confirma Contraseña' 
              required />
            <div className='loginEyeIcon' onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <AiOutlineEye/> : <AiOutlineEyeInvisible className='loginInIc'/>}
            </div>
            <div className='supEM'>
             {errors.password2 && <p>{errors.password2}</p>} 
            </div>
          </fieldset>
        
        <button className='signupBtn'>Enviar</button>

        <div className="signupGg">
              <p>O ingresa con</p>
            </div>
            <div>
                <AiOutlineGoogle size={30} className='loginGgIc'/> 
            </div>
            <GoogleLogin/>
      </form>
    </div>
  )
}
