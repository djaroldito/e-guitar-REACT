import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import "./Styles/Activate.css"

const Activate = () => {
  const { email } = useParams();
  
  useEffect(() => {
    axios.get(`/ruser/activate?email=${email}`)
  }, [email])

  return (
    <div id="box">
      <div className="actContainer">
       <h1>User Activated</h1>
        <h2>You have been succesfuly activated</h2>
         <h2>You can login now: <NavLink to="/login" className="actLogin">Log in!</NavLink></h2>
      </div>
    </div>
  )
}

export default Activate;