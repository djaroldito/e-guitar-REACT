import { React } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import {delOneFromCart,delAllFromCart, clearCart, getProductToCart } from "../../Redux/productSlice"
import {AiOutlineDelete} from "react-icons/ai";
import {BsCart2} from 'react-icons/bs'
import "./Cart/Cart.css";


const Cart = () =>{
   const carrito = useSelector(state => state.products.cart)
   const dispatch = useDispatch()

   const delFromCart = (id, all = false) =>{
     if (all){
      dispatch(delAllFromCart(id))
    }else{
      dispatch(delOneFromCart(id))
    }

   }
   
   return(
  <main>
    {carrito.length >= 1 ? <button onClick={() => dispatch(clearCart())}>Clear Cart</button> : null }
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
              <button onClick={() => delFromCart(el.id) }>-</button>
              <input placeholder={el.quantity} disabled></input>
              <button onClick={() => dispatch(getProductToCart(el.id))} >+</button>
              {el.stock?<p> <b>disponibles {el.stock}</b>.</p>: null}
            </div>
              {el.price?<p>$ {el.price}</p>: null}
              <button onClick={() => delFromCart(el.id, true)}><AiOutlineDelete/></button>

            
            </div>
          ))}
            <Total>
              {carrito.length >= 1 ? <label >Total: </label> : null }
              <h1> {carrito.length >= 1 ?  carrito.reduce((acc,prod)=>acc + (prod.price * prod.quantity) , 0):null}</h1>
            </Total>
          </div>
          {carrito.length >= 1 ? <button className="Purchasebutton"><BsCart2/>Completar Compra</button> : null}
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