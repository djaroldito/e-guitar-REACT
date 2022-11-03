import React from "react";

import { GoogleLogout } from "react-google-login";

export const LogoutButton = () => {
  const onSuccess = () => {
    localStorage.removeItem("UserData");
    console.log("Log out successFull!");
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
