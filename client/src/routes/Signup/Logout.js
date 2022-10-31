import React from "react";
import {BiLogOut} from "react-icons/bi";
import styled from "styled-components";
import {useAuth0} from '@auth0/auth0-react';

export const LogoutButton = () => {
    const {logout} = useAuth0();
    localStorage.removeItem('userData')
     return (
     <LogoutButtonContainer>
         <button onClick={() => logout({returnTo: window.location.origin})}><BiLogOut/></button>
     </LogoutButtonContainer>)
}

const LogoutButtonContainer = styled.div`

  `