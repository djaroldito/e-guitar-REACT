import {getAllOrderDB} from "../../../Redux/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import React from "react";


const Order =  () => {
    const userID = sessionStorage.getItem("userId");
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getAllOrderDB(userID))
    }, []);
    const orders = useSelector(state =>  state.products.orders);
    console.log(orders);
    const navigate = useNavigate();
    const Redirect = (id) => {
        navigate(`/orders/${id}`)
    }
    return ( 
        <div>
            <div className="column">
            {orders.map(order => {
                return(
                    <div className="orderContainer">
                        <div className="orderContent">
                            <h2>id</h2>
                            <h3>{order.id}</h3>
                        </div>
                        <div>
                            <h2>fecha del pedido</h2>
                            <h3>{order.orderDate}</h3>
                        </div>
                        <div>
                            <h2>monto</h2>
                            <h3>${order.total}</h3>
                        </div>
                        <div>
                            <h2>envio</h2>
                            <h3 className={order.deliveryStatus}> {order.deliveryStatus}</h3>
                        </div>
                        <div>
                            <h2>pago</h2>
                            <h3 className={order.orderStatus}>{order.orderStatus}</h3>
                        </div>
                        <button onClick={() => Redirect(order.id)}>detalle</button>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Order;