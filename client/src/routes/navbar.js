import { NavLink } from "react-router-dom"
import styled from "styled-components"
import SearchBar from "./components/searchbar"
import {BiLogIn} from 'react-icons/bi'
import {FaUserAlt} from 'react-icons/fa'

const NavBar = () =>{
    return(
        <header>
            <NavCont>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/'>discount</NavLink>
                <SearchBar/>
                <IconCont>
                <UserCont >
                    <BiLogIn/>
                </UserCont>
                <UserCont className={"logged"}>
                    <FaUserAlt/>
                </UserCont>
                </IconCont>
            </NavCont>
        </header>
    )
}

const NavCont = styled.div`
max-width: 1200px;
height: 70px;
color: whitesmoke;
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

a{
    color: whitesmoke;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    padding: 15px;
}
`
const UserCont = styled.div`
font-size: 20px;
border-radius: 50%;
padding: 4px 6px;
color: rgb(10,20,11);


`

const IconCont = styled.div`
margin-left: auto;
display: flex;
flex-direction: row;
width: 100px;
justify-content: space-between;

.logged{
    background-color: white;
}

`

export default NavBar