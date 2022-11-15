import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LogoutButton } from "./Signup/LogoutButton.js";
import "../index.css";
//import guitarIco from './../pics/guitar.png'
import guitarIco from "./../pics/guitarcode_white.png";

const NavBar = () => {
  const handleLog = () => {
    sessionStorage.removeItem("emailData");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("passwordData");
    localStorage.removeItem("carrito");
    sessionStorage.removeItem("userId");
    window.location.reload();
  };
  const email = sessionStorage.getItem("emailData");
  const isAdmin = sessionStorage.getItem("isAdmin");
  const emailGoogle = sessionStorage.getItem("emailGoogle");
  const userImage = sessionStorage.getItem("imageURL");

  return (
    <header className={"header"}>
      <NavCont>
        <Logo>
          <Link to="/">
            <img src={guitarIco} alt="guitar code title" />
          </Link>
        </Logo>

        <div className="links">
          <NavLink className="link" to="/home">
            Home
          </NavLink>
          {isAdmin === "true" ? (
            <NavLink className="links" to="/dashboard">
              Dashboard
            </NavLink>
          ) : (
            ""
          )}

				<IconCont>
					{!email && !emailGoogle ? (
						<NavLink to='/login' title='Log In'>
							<BiLogIn />
						</NavLink>
					) : (
						<>
							<div className='Dropdown user-icon'>
								{userImage !== "null" && userImage ? (
									<img
										src={userImage}
										alt='user'
										referrerPolicy='no-referrer'
										width={30}
									></img>
								) : (
									<FaUserAlt />
                                    )}
                                    <div className="Dropdown-Content">
                                        {!isAdmin ?
                                            <p onClick = { ()=> {window.location.href = '/orders'}}>orders</p> : ''
                                        }
                                    </div>
							</div>
							{email ? (
								<NavLink to='/home' onClick={handleLog} title='Log Out'>
									<BiLogOut />
								</NavLink>
							) : (
								emailGoogle && (
									<div className="guser">
										<LogoutButton />
									</div>
								)
							)}
						</>
					)}

            <NavLink to="/cart">
              <AiOutlineShoppingCart />
            </NavLink>
          </IconCont>
        </div>
      </NavCont>
    </header>
  );
};

const NavCont = styled.div`
  max-width: 1200px;
  width: auto;
  height: 100%;
  color: whitesmoke;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  /* @media (max-width: 700px) {
    height: 100vh;
    background-color: black;
    position: absolute;
    width: 100%;
    z-index: 10;
  } */
  .links {
    margin-left: auto;
    display: flex;
    position: relative;
    /* margin-top: ; */
    /* @media (max-width: 700px) {
		display: block;
		margin-left: auto;
		margin-right: auto;
		background-color: #eb984e;
		margin-bottom: auto;
		margin-top: 100px;
    } */
  }
  .link {
    /* @media (max-width: 700px) {
      display: block;
      text-align: center;
      margin-left: auto;
	  top: 10px;
      margin-right: auto;
      background-color: blue;
	  
    } */
  }

  a,
  .user-icon,
  .guser {
    color: whitesmoke;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    padding: 15px;
    flex-direction: row;
    transition: 0.4s ease;

    /* @media (max-width: 700px) {
		width: 100px;
	} */
  }
  a:hover,
  .guser:hover {
    background-color: #eb984e;
  }
`;

const IconCont = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: space-evenly;
  align-items: center;

  /* @media (max-width: 700px) {
    flex-direction: column;
  } */
`;

const Logo = styled.div`
	margin-right: 15px;
	a:hover {
		padding: 40px 15px 15px 15px;
	}
	img {
		width: 135px;
	}
`

export default NavBar;
