import Order from './Order.jsx';
import { NavLink } from 'react-router-dom';
import {TbError404 } from 'react-icons/tb';
const OrderEmpty = () => {
    const userID = sessionStorage.getItem("userId");
    
    return(
    <div>
        {
        userID ? <Order userID={userID}></Order> 
        : 
        <div style={{textAlign: "center", paddingTop: "64px", paddingBottom: "64px"}}>
            <h1><TbError404 /></h1>
            <h1>No orders found</h1>
            <NavLink to='/login'>Please Log In</NavLink>
        </div>
        }
        

        
    </div>
   )
}

export default OrderEmpty