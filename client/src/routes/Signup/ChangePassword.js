import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';


export default function ChangePassword () {
  const navigate = useNavigate();
  const [change, setChange] = useState({
    code: "",
    password: "",
    password2: ""
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setChange({
      ...change,
      [name] : value
    })
  };

  async function handleSubmit(e) {
    e.preventDefault();
    axios.put("/ruser/new-password", change)
    Swal.fire("You can log in now with your New Password!");
    setChange({
      code: "",
      password: "",
      password2: ""
    })
    navigate("/login")
  }

  // Que te derive directamente al Login
  return (
    <div id="resetBox">
    <div className='resetContainer'>
        <h2>Change your Password</h2>
        <form onSubmit={handleSubmit} >
            <input type="text"
            name="code"
            value={change.code}
            onChange={handleChange} 
            placeholder="Verification Code"
            className=''
            required
            />
            <input type="text"
            name="password"
            value={change.password}
            onChange={handleChange} 
            placeholder="New Password"
            className='resetInput'
            required
            />
            <input type="text"
            name="password2"
            value={change.password2} 
            onChange={handleChange} 
            placeholder="Confirm New Password"
            className='resetInput'
            required
            />
            <button className='resetBtn'>Reset!</button>
        </form>
    </div>
</div>
    
  )
}
