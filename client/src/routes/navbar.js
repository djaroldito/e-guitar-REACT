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
    localStorage.removeItem("emailData");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("passwordData");
    window.location.reload();
  };
  const email = localStorage.getItem("emailData");
  const isAdmin = localStorage.getItem("isAdmin");
  const userData = localStorage.getItem("userData")

  return (
    <header className={path === "/" ? "headerLanding" : "header"}>
      <NavCont>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">discount</NavLink>
        {isAdmin === "true" ? (
          <NavLink to="/newProduct">Add Product</NavLink>
        ) : null}
        <LogoutButton />
        <IconCont className={""}>
          {!userData ||!email ? (
            <UserCont>
              <NavLink to="/login">
                <BiLogIn />
              </NavLink>
            </UserCont>
          ) : (
            <UserCont>
              
              <button onClick={handleLog}>
                <BiLogOut />
              </button>
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
