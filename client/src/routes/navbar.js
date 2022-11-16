import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LogoutButton } from "./Signup/LogoutButton.js";
import "../index.css";
import guitarIco from "./../pics/guitarcode_white.png";
import { BurgerButton } from "./components/burgerButton.js";
import { useSelector } from "react-redux";
import { BsFillBagCheckFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const handleLog = () => {
    sessionStorage.removeItem("emailData");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("passwordData");
    localStorage.removeItem("carrito");
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const cartNumb = useSelector((state) => state.products.cart);
  const email = sessionStorage.getItem("emailData");
  const isAdmin = sessionStorage.getItem("isAdmin");
  const emailGoogle = sessionStorage.getItem("emailGoogle");
  const userImage = sessionStorage.getItem("imageURL");
  const userId = sessionStorage.getItem('userId')

  console.log(cartNumb.length);

  const handleActive = () => {
    setNav(!nav);
  };

  const logNav = () => {
    if (nav === true) {
      handleLog();
      handleActive();
    } else {
      handleLog();
    }
  };

  return (
    <header className={"header"}>
      <NavCont nav={nav}>
        <Logo>
          <Link onClick={nav ? handleActive : null} to="/">
            <img src={guitarIco} alt="guitar code title" />
          </Link>
          <button onClick={handleActive}>
            <BurgerButton nav={nav} />
          </button>
        </Logo>

        <div className="links">
          <NavLink
            onClick={nav ? handleActive : null}
            className="link"
            to="/home"
          >
            Home
          </NavLink>
          {isAdmin === "true" ? (
            <NavLink className="link" to="/dashboard">
              Dashboard
            </NavLink>
          ) : (
            ""
          )}

          <IconCont>
            <div className="NoResp">
              {!email && !emailGoogle ? (
                <NavLink
                  onClick={nav ? handleActive : null}
                  to="/login"
                  title="Log In"
                >
                  <BiLogIn /> <span>Log In</span>
                </NavLink>
              ) : (
                <>
                  <div className="Dropdown user-icon">
                    {userImage !== "null" && userImage ? (
                      <img
                        src={userImage}
                        alt="user"
                        referrerPolicy="no-referrer"
                        width={30}
                      />
                    ) : (
                      <FaUserAlt />
                      
                    )}
                    <div className="Dropdown-Content">
                      {!isAdmin ? (
                        <div>
                          <p
                            onClick={() => {
                              window.location.href = "/orders";
                            }}
                          >
                            orders
                          </p>
                          <p
                            onClick={() => {
                              window.location.href = "/home/Profile";
                            }}
                          >
                            Perfil
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {email ? (
                    <NavLink to="/home" onClick={logNav} title="Log Out">
                      <BiLogOut /> <span>Log Out</span>
                    </NavLink>
                  ) : (
                    emailGoogle && (
                      <div
                        onClick={nav ? handleActive : null}
                        className="guser"
                      >
                        <LogoutButton />
                      </div>
                    )
                  )}
                </>
              )}
            </div>
            <div className="resposive">
              {!email && !emailGoogle ? (
                <NavLink
                  onClick={nav ? handleActive : null}
                  to="/login"
                  title="Log In"
                >
                  <BiLogIn /> <span>Log In</span>
                </NavLink>
              ) : (
                <>
                  <div>
                    {userImage !== "null" && userImage ? (
                      <img
                        src={userImage}
                        alt="user"
                        referrerPolicy="no-referrer"
                        width={30}
                      />
                    ) : (
                      <FaUserAlt />
                    )}
                    <div>
                      {!isAdmin ? (
                        <div>
                          <NavLink
                            to="/orders"
                            onClick={nav ? handleActive : null}
                          >
                            <CgProfile />
                            <span>Profile</span>
                          </NavLink>
                          <NavLink
                            onClick={nav ? handleActive : null}
                            to="/orders"
                          >
                            <BsFillBagCheckFill />
                            <span>Orders</span>
                          </NavLink>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {email ? (
                    <NavLink to="/home" onClick={logNav} title="Log Out">
                      <BiLogOut /> <span>Log Out</span>
                    </NavLink>
                  ) : (
                    emailGoogle && (
                      <div
                        onClick={nav ? handleActive : null}
                        className="guser"
                      >
                        <LogoutButton />
                      </div>
                    )
                  )}
                </>
              )}
            </div>
            {userId?
              <NavLink onClick={nav ? handleActive : null} to="/cart">
              <AiOutlineShoppingCart />
              {cartNumb.length > 0 && (
                <span className="cartNumb">{cartNumb.length}</span>
              )}
              <span>Cart</span>
            </NavLink> : null
            }          
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

  @media (max-width: 900px) {
    background-color: black;
    position: relative;
    width: 100%;
    z-index: 10;
    display: block;
  }
  .links {
    margin-left: auto;
    display: flex;
    position: relative;
    @media (max-width: 900px) {
      height: 100%;
      height: 100vh;
      background-color: rgb(0,0,0,.9);
      top: ${(props) => (props.nav ? "0" : "-150vh")};
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: auto;
      transition: top 0.3s ease-in;
      align-items: center;
     
    }
  }
  .link {
    padding: 25px 5px;
    @media (max-width: 900px) {
      display: block;
      margin-left: auto;
      margin-right: auto;
      top: 10px;
      font-size: 30px;
      text-align: center;
    }
  }
  .Dropdown {
    display: inline-block;
    position: relative;
    @media (max-width: 900px) {
      display: flex;
      position: relative;
      flex-direction: column;
      background: none;
      color: whitesmoke;
      box-shadow: none;
      margin-bottom: 0;
    }
    img {
      border-radius: 50%;
    }
  }
  .Dropdown-Content {
    display: none;
    position: absolute;
    right: 0%;
    width: 300%;
    overflow: auto;
    background-color: whitesmoke;
    font-size: 15px;
    align-items: right;
    border-radius: 5px;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);
  }
  .Dropdown:hover .Dropdown-Content {
    display: block;
  }
  .Dropdown-Content p {
    display: block;
    color: #000000;
    padding: 5px;
    text-decoration: none;
    @media (max-width: 900px) {
      color: whitesmoke;
      font-size: 30px;
      display: flex;
      margin: 0;
    }
  }
  .Dropdown-Content p:hover {
    color: #00a4bd;
    cursor: pointer;
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: auto;
    span {
      margin: 10px;
      @media (min-width: 900px) {
        display: none;
      }
    }

    @media (max-width: 900px) {
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  a:hover,
  .guser:hover {
    color: #eb984e;
    @media (max-width: 900px) {
      background: none;
    }
  }
`;

const IconCont = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: center;
  align-items: center;

  a {
    font-size: 30px;
  }
  img {
    width: 40px;
  }
  .NoResp {
    display: flex;
    flex-direction: row;
    @media (max-width: 900px) {
      display: none;
    }
  }

  .cartNumb {
    display: flex;
    background-color: red;
    position: absolute;
    font-size: 15px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    align-items: center;
    justify-content: center;
    top: 0px;
    right: 8px;
    border: 1px solid grey;
    @media (max-width: 900px) {
      left: 26%;
      top: 15%;
    }
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
  }
  .resposive {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    @media (min-width: 900px) {
      display: none;
    }
    img {
      border-radius: 50%;
      width: 75px;
    }
  }
`;

const Logo = styled.div`
  margin-right: 15px;
  display: flex;
  @media (max-width: 900px) {
    width: 100%;
  }
  img {
    width: 135px;
  }
  button {
    background: none;
    position: relative;
    display: flex;
    margin-left: auto;
    margin-right: 15px;
    justify-content: center;
    align-items: center;
    @media (min-width: 900px) {
      display: none;
    }
  }
`;

export default NavBar;
