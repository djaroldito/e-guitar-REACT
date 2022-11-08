import React from "react";
import {BiLogOut} from "react-icons/bi";
import styled from "styled-components";
import {useAuth0} from '@auth0/auth0-react';

export const LogoutButton = () => {
    const {logout} = useAuth0();
    const OnLogOut = () => {
        sessionStorage.removeItem('userData')
        localStorage.removeItem('carrito');
        logout({returnTo: window.location.origin})
    }
     return (
     <LogoutButtonContainer>
         <button onClick={() => OnLogOut()}><BiLogOut/></button>
     </LogoutButtonContainer>)
}

const LogoutButtonContainer = styled.div`

  `