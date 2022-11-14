import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Styles/Activate.css";
import axios from "axios";

const Activate = () => {
  const { email } = useParams();
  //generamos codigo
  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var discount = "";
  for (let i = 0; i < 10; i++)
    discount += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
//despachamos el codigo al estado del redux
  useEffect(() => {
    //enviamos email y codigo de descuento al back para enviar mails y descuentos
    axios.get(`/ruser/activate?email=${email}&discount=${discount}`);
  }, [email, discount]);

  return (
    <div id="box">
      <div className="actContainer">
        <h1>User Activated</h1>
        <h2>You have been succesfuly activated</h2>
        <h2>
          You can login now:{" "}
          <NavLink to="/login" className="actLogin">
            Log in!
          </NavLink>
        </h2>
      </div>
    </div>
  );
};

export default Activate;
