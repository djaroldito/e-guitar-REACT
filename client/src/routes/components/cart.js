import { React, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import {delOneFromCart, clearCart, getProductToCart} from "../../Redux/productSlice"
import {payment, addCartToDB} from '../../Redux/productActions';
import {AiOutlineDelete} from "react-icons/ai";
import EmptyCart from "./Cart/EmptyCart";
import {BsCart2} from 'react-icons/bs'
import "./Cart/Cart.css";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import {IoArrowBackOutline} from 'react-icons/io5'

const Cart = () =>{
   const carrito = useSelector(state => state.products.cart)

   const dispatch = useDispatch()

  

   const addCartItem = async (item)=> {
    dispatch(getProductToCart(item))
    await addCartToDB(JSON.parse(localStorage.getItem('carrito')), sessionStorage.getItem('userId'));
  }

  const delFromCart = async (item)=> {
     dispatch(delOneFromCart(item))
    await addCartToDB(JSON.parse(localStorage.getItem('carrito')), sessionStorage.getItem('userId'));
  }

  const completePayment = async (cart) => {
    const response = await payment(cart);
    window.location.href = response;
  }
 
  // constructorCart()
 //funciones carteles de alerta
  const preguntaTodo = ()=>{
   Swal.fire({
    title: 'Are you sure to delete the entire cart?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(clearCart())
      Swal.fire(
        'Deleted!',
        )
    }
     })

}
const preguntaUno = async (item)=>{
  Swal.fire({
   title: 'Are you sure to delete this item from the cart?',
   text: "You won't be able to revert this!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then(async (result) => {
   if (result.isConfirmed) {
    dispatch(delOneFromCart(item))
    await addCartToDB(JSON.parse(localStorage.getItem('carrito')), sessionStorage.getItem('userId'));
     Swal.fire(
       'Deleted!',      
       )
   }
 })

}

  return(
  <main>
    {carrito.length >= 1 ? <button onClick={preguntaTodo}>Clear Cart</button> : <EmptyCart/> }
  <div className="ProductCartContainer">
    <br/>
           {carrito.map((el, index)=>(
            <div key={index} className="ProductCard">
              <ImgDiv>            
                <img src={el.img} alt={carrito.brand}/>
                <div>
                  <h2>{el.brand}</h2>
                  {el.model?<p> <b>Model: </b>{el.model}.</p>: null}
                  {el.color?<p> <b>Color: </b>{el.color}.</p>: null}
                </div>
              </ImgDiv>
            
            {el.discount? <p> <b>Discount: </b>{el.discount}.</p>: null}
            <div className="InputCartContainer">
              <button  disabled= { el.Cart.quantity !== 1 ? false : true} onClick={() => delFromCart(el)}>-</button>
              <input placeholder={el.Cart.quantity} disabled></input>
              <button disabled= { el.Cart.quantity < el.stock ? false : true} onClick={() => addCartItem(el)} >+</button>
              {el.stock?<p> <b>disponibles {el.stock}</b>.</p>: null}
            </div>
              <p>${el.price.toFixed(2)}</p>
              <button onClick={() => preguntaUno(el.id, true)}><AiOutlineDelete/></button>
              </div>
          ))}
            <Total>
              {carrito.length >= 1 ? <label >Total: </label> : null }
              <h1> {carrito.length >= 1 ?  carrito.reduce((acc,prod)=>acc + (prod.price.toFixed(2) * prod.Cart.quantity) , 0).toFixed(2):null}</h1>
            </Total>
          </div>
          {carrito.length >= 1 ? <button onClick={() => completePayment(carrito)} className="Purchasebutton"><BsCart2/>Completar Compra</button> : null}
          < br/>
          <CustomButtons>
          <Link to="/home">
              <button className="back-home">
              <IoArrowBackOutline/> Back Home  
              </button>
					</Link>
          </CustomButtons>
  </main>
  )
}

export const ImgDiv = styled.div`
   width: 80%; 
  display:flex;
  margin-left:5%;
  img {
    max-width: 5%;
    max-height: auto;
    object-fit: scale-down;
    vertical-align: top;
    border-radius: 5px;
  }
`;
const Total = styled.div`
  float:right;
  display:flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-end;
  align-items: center;
`
const CustomButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  position: relative;
  margin-top: auto;
  margin: 15px;
  a {
    color: whitesmoke;
    text-decoration: none;
  }
  button {
    border-radius: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    margin: 5px;
    width: 100%;
    background-color: rgb(76, 49, 138);
    color: whitesmoke;
    font-weight: 600;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .back-home {
    background-color: rgb(128, 60, 60);
    font-weight: 600;
  }
`

export default Cart
