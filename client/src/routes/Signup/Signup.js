import React, {useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postSignupForm } from "../../Redux/SignupActios.js"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import Swal from "sweetalert2";
import "./Styles/Signup.css";
import axios from 'axios';

// Falta buscar si el usuario ya existe en la db
// Sweet alert si se registró correctamente
// Registrarte con goolge a partir de Auth0
// Averiguar cómo hacer para enviar también los datos del carrito del localStorage

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const mail = useRef();
  const [showPsw, setShowPsw] = useState(false);
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: ""
  });
  
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  async function handleSubmit(e){
    e.preventDefault();
    // Corroborar que no exista ese mail registrado ------------------------------------------
   
       const { data } = await axios.get("http://localhost:3001/ruser/email", {
        params: {
          email: mail.current.value
        }})
        
      if (data) return Swal.fire("El Email pertenece a un usuario registrado")
        else{
    // Dispatch del post ---------------------------------------------------------------------
      dispatch(postSignupForm(user));
    }
    // Sweet Alert ---------------------------------------------------------------------------
    console.log(Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario registrado exitosamente',
      showConfirmButton: false,
      timer: 1500
    }));
    
    // cleanDetail  -------------------------------------------------------------------------
    // Limpiar el estado --------------------------------------------------------------------
    setUser({
      fullname: "",
      email: "",
      password: "",
      password2: "",
    })
    // Retornar al home
    navigate('/login');
  };

  // Errors ----------------------------------------------------------------------------------

  if (!user.fullname.trim()) {
    errors.fullname = 'Username required';
  };
  if (!user.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!user.password) {
    errors.password = 'Password is required';
  } else if (user.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }
  if (!user.password2) {
    errors.password2 = 'Password is required';
  } else if (user.password2 !== user.password) {
    errors.password2 = 'Passwords do not match';
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
          </fieldset>
          {/* {errors.fullname && <p>{errors.fullname}</p>} */}

          <fieldset>
            <input type="email" 
              name="email" 
              value={user.email}
              onChange={handleChange} 
              placeholder='Email' 
              required
              ref={mail} />
              <AiOutlineMail className='loginUsIc' />
          </fieldset>
          {/* {errors.email && <p>{errors.email}</p>} */}

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
          </fieldset>
          {/* {errors.password && <p>{errors.password}</p>} */}

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
          </fieldset>
          {/* {errors.password2 && <p>{errors.password2}</p>} */}
        
        <button className='signupBtn'>Enviar</button>
      </form>
    </div>
  )
}
