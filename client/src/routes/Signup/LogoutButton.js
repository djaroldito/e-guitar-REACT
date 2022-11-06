import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    sessionStorage.removeItem("UserData");
    sessionStorage.removeItem("emailGoogle");
    localStorage.removeItem('carrito');
    sessionStorage.removeItem('userId');
    console.log("Log out successFull!");
    navigate("/login", { state: { sessionStorage, localStorage } });
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId="1071381556347-p8k8tg37ss2e9ag86088tvdds19dot5o.apps.googleusercontent.com"
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};
