import {getOrderDB} from "../../../Redux/productActions";
import { useDispatch, useSelector } from "react-redux";
import "./Order.css";
import React from "react";

const Order =  () => {
    const userID = sessionStorage.getItem("userId");
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getOrderDB(userID))
    }, []);
    const orders = useSelector(state =>  state.products.orders);
    console.log(orders);
    
    return ( 
        <div>
            {orders.map(order => {
                return(
                    <div className="orderContainer">
                        <p>fecha del pedido:  {order.orderDate}</p>
                        <p>id: {order.id}</p>
                        <p>estado del envio: {order.deliveryStatus}</p>
                        <p>estado de la orden: {order.orderStatus}</p>
                        <p>monto: {order.total}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Order;