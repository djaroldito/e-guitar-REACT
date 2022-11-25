import {getAllOrderDB} from "../../../Redux/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Order.css";
import React from "react";


const Order =  ({userID}) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getAllOrderDB(userID))
    }, []);
    const orders = useSelector(state =>  state.products.orders);

    const navigate = useNavigate();
    const Redirect = (id) => {
        navigate(`/orders/${id}`)
    }
    return (
        <div>
            <div className="column">
            <h1 style={{marginLeft: "5%"}}>Order History</h1>
            {orders.map(order => {
                return(
                    <div className="orderContainer">
                        <div className="orderContent">
                            <h2>ID</h2>
                            <h3>{order.id}</h3>
                        </div>
                        <div>
                            <h2>Date</h2>
                            <h3>{order.orderDate}</h3>
                        </div>
                        <div>
                            <h2>Amount</h2>
                            <h3>${order.total}</h3>
                        </div>
                        <div>
                            <h2>Shipment</h2>
                            <h3 className={order.deliveryStatus}> {order.deliveryStatus}</h3>
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <h3 className={order.orderStatus}>{order.orderStatus}</h3>
                        </div>
                        <button onClick={() => Redirect(order.id)}>Detail</button>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Order;