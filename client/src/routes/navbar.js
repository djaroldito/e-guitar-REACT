import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { LogoutButton } from "./Signup/LogoutButton.js";
import "../index.css";
//import guitarIco from './../pics/guitar.png'
import guitarIco from './../pics/guitarcode_white.png'
import {useSelector} from 'react-redux'

const NavBar = () => {

  const handleLog = () => {
    sessionStorage.removeItem("emailData");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("passwordData");
    localStorage.removeItem('carrito');
    sessionStorage.removeItem('userId');
    window.location.reload();
  };
  const email = sessionStorage.getItem("emailData");
  const isAdmin = sessionStorage.getItem("isAdmin");
    const emailGoogle = sessionStorage.getItem("emailGoogle");
    const userImage = sessionStorage.getItem("imageURL");

  return (
    <header className={"header"}>
      <NavCont>
        <Title>
          <img src={guitarIco} alt='guitar code title'/>
        </Title>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">discount</NavLink>

        {isAdmin ? <NavLink to="/dashboard">Dashboard</NavLink> : ''}

        {emailGoogle ? (<div><LogoutButton/></div>) : (<div style={{display: "none"}}><LogoutButton/></div>)}
        <IconCont className={""}>
          {!email && !emailGoogle ? (
            <UserCont>
              <NavLink to="/login">
                <BiLogIn />
              </NavLink>
            </UserCont>
          ) : (
            <UserCont>
              {email &&
              (
                <button onClick={handleLog}>
                  <BiLogOut />
                </button>
              )
              }
            </UserCont>
          )}

          <UserCont>
              {userImage ? (<img src={userImage} alt='user'></img>) : (<FaUserAlt style={{color: "whitesmoke"}}/>)}
          </UserCont>
          <div className="cart">
        <NavLink to="/cart">
          <AiOutlineShoppingCart />
        </NavLink>
          </div>
        </IconCont>
      </NavCont>
    </header>
  );
};

const NavCont = styled.div`
  max-width: 1200px;
  height: 100%;
  color: whitesmoke;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  a {
    color: whitesmoke;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    padding: 15px;
    transition: 0.4s ease;
  }
  a:hover {
    background-color: #eb984e;
    border-radius: 25%;
  }
`;

const UserCont = styled.div`
  font-size: 20px;
  color: rgb(10, 20, 11);
  img{
    border-radius: 50%;
    width: 40px;
    height:40px;
  }
`;

const IconCont = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-between;


`;

const Title = styled.div`
img{width: 135px;
}
margin-right: 15px;
  `

export default NavBar;
