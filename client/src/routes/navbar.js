import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { LogoutButton } from "./Signup/LogoutButton.js";
import "../index.css";

const NavBar = () => {
  const path = window.location.pathname;

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

  return (
    <header className={path === "/" ? "headerLanding" : "header"}>
      <NavCont>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">discount</NavLink>
        {isAdmin === "true" ? (
          <NavLink to="/newProduct">Add Product</NavLink>
        ) : null}
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
          
          <UserCont className={"logged"}>
            <NavLink to="/home/Profile">
              <FaUserAlt />
            </NavLink>
          </UserCont>
        </IconCont>

        <NavLink to="/cart">
          <AiOutlineShoppingCart />
        </NavLink>
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
  }
`;

const UserCont = styled.div`
  font-size: 20px;
  border-radius: 50%;
  padding: 4px 6px;
  color: rgb(10, 20, 11);
`;

const IconCont = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-between;

  .logged {
    background-color: white;
  }
`;

export default NavBar;
