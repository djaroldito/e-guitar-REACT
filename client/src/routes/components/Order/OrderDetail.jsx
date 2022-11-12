import {getOrderDB} from "../../../Redux/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./OrderDetail.css";
import React from "react";

const OrderDetail =  () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);
    React.useEffect(() => {
        dispatch(getOrderDB(id))
    }, []);
    const order = useSelector(state =>  state.products.order);
    console.log(order);
    return ( 
        <div className="OrderLayout">
            <PaymentOrderCont>
                <div className="OrderDetailContainer">
                    <div className="headerOrders">
                        <h3>Order Detail</h3>
                    </div>  
                            <div className="orderCard">
                                <ImgDiv>
                                    <div>
                                    <div className="inlineContent">
                                        <p>Shipment : </p> 
                                        <p className={order.deliveryStatus}>{order.deliveryStatus} </p>
                                    </div>   
                                        <p> Order Date : {order.orderDate} </p>
                                    <div className="inlineContent">
                                        <p>Payment Status : </p>
                                        <p className={order.orderStatus}>{order.orderStatus}</p>
                                    </div>
                                    </div>
                                </ImgDiv>
                            </div>
                </div>
                <div className="productsContainer">
                    <div className="headerOrders">
                        <h3>Product Detail</h3>
                    </div>
                    {order.products?.map(product => {
                        return(
                            
                            <div className="orderCard">
                                <ImgDiv>
                                    <img src={product.img}></img>
                                    <div>
                                    <p>{product.brand} {product.model}</p>
                                    <p>{product.color}</p>
                                    </div>
                                </ImgDiv>
                                    <p>x{product.OrderDetail.quantity}</p>
                                
                            </div>
                        )
                    })}
                </div>
            </PaymentOrderCont>
            
                <div className='PaymentDetailContainer'>
                    <div className="headerOrders">
                        <h3>Payment Detail</h3>
                    </div>
                            <div className="orderCard">
                               <div>
                                <h4>subtotal: {order.total}</h4>
                                <h4>Shipment: free</h4>
                                <h2>Total: {order.total}</h2>
                                </div>
                            </div>
                     
                </div>
           
        </div>
    )
}



export const ImgDiv = styled.div`
    margin-left: 5%;
    height: 100%;
    display: flex;
    img {
        max-width: 10%;
        max-height: auto;
        object-fit: scale-down;
    }
`;


export const PaymentCont = styled.div`
    width: 100%;
`

export const PaymentOrderCont = styled.div`
    width: 30%;
    margin-left:15%;
`

export default OrderDetail;