import { React } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import {delOneFromCart, clearCart, getProductToCart } from "../../Redux/productSlice"
import {payment} from '../../Redux/productActions';
import {AiOutlineDelete} from "react-icons/ai";
import EmptyCart from "./Cart/EmptyCart";
import {BsCart2} from 'react-icons/bs'
import "./Cart/Cart.css";
import Swal from 'sweetalert2'

const Cart = () =>{
   const carrito = useSelector(state => state.products.cart)

   const dispatch = useDispatch()

   const constructorCart = ()=>{
    if (!localStorage.getItem('carrito')){
        localStorage.setItem('carrito','[]')
    }
  }
   const addCartItem = (item)=> {
    dispatch(getProductToCart(item))

  }

  const delFromCart = (item)=> {
    dispatch(delOneFromCart(item))
  }

  const completePayment = async (cart) => {
    const response = await payment(cart);
    window.location.href = response;
  }
 
  constructorCart()
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
const preguntaUno = (item)=>{
  Swal.fire({
   title: 'Are you sure to delete this item from the cart?',
   text: "You won't be able to revert this!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then((result) => {
   if (result.isConfirmed) {
    dispatch(delOneFromCart(item))
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
            
            {el.discount?<p> <b>Discount: </b>{el.discount}.</p>: null}
            <div className="InputCartContainer">
              <button  disabled= { el.quantity !== 1 ? false : true} onClick={() => delFromCart(el)}>-</button>
              <input placeholder={el.quantity} disabled></input>
              <button disabled= { el.quantity < el.stock ? false : true} onClick={() => addCartItem(el)} >+</button>
              {el.stock?<p> <b>disponibles {el.stock}</b>.</p>: null}
            </div>
              <p>${el.price.toFixed(2)}</p>
              <button onClick={() => preguntaUno(el.id, true)}><AiOutlineDelete/></button>
              </div>
          ))}
            <Total>
              {carrito.length >= 1 ? <label >Total: </label> : null }
              <h1> {carrito.length >= 1 ?  carrito.reduce((acc,prod)=>acc + (prod.price.toFixed(2) * prod.quantity) , 0).toFixed(2):null}</h1>
            </Total>
          </div>
          {carrito.length >= 1 ? <button className="Purchasebutton" onClick={() => completePayment(carrito)}><BsCart2/>Completar Compra</button> : null}
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
export default Cart
