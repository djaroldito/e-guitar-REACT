import { React } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import {delOneFromCart,delAllFromCart, clearCart, getProductToCart } from "../../Redux/productSlice"

const Cart = () =>{
   const carrito = useSelector(state => state.products.cart)

   const dispatch = useDispatch()

  //  const delFromCart = (id, all = false) =>{
  //    if (all){
  //     dispatch(delAllFromCart(id))
  //   }else{
  //     dispatch(delOneFromCart(id))
  //   }

  //  }

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
 
  constructorCart()
  //console.log(getCart)
   
   return(
  <main>
  <div>
    {carrito.length >= 1 ? <button onClick={() => dispatch(clearCart())}>Clear Cart</button> : null }
    <br/>
         {carrito.length >= 1 ? <label >Total:</label> : null }
         {carrito.length >= 1 ?  carrito.reduce((acc,prod)=>acc + (prod.price * prod.quantity) , 0):null}

          {carrito.map((el, index)=>(
          <div key={index}>
          <h2>{el.brand}</h2>

          <ImgDiv>            
          <img src={el.img} alt={carrito.brand}/>
          </ImgDiv>
          {el.model?<p> <b>Model: </b>{el.model}.</p>: null}
          {el.type?<p> <b>Type: </b>{el.type}.</p>: null}
          {el.color?<p> <b>Color: </b>{el.color}.</p>: null}
          {el.price?<p> <b>Price: </b>{el.price} x {el.quantity} = ${el.price * el.quantity}.</p>: null}
          {el.stock?<p> <b>Stock: </b>{el.stock}.</p>: null}
          {el.discount?<p> <b>Discount: </b>{el.discount}.</p>: null}
          {el.quantity?<p> <b>Quantity: </b>{el.quantity}.</p>: null}
          <button disabled= { el.quantity < el.stock ? false : true  } onClick={() => addCartItem(el)}>Add Cart local</button>
          <button onClick={() => delFromCart(el) }>Remove one Item</button>
          <button onClick={() => delFromCart(el.id, true)}>Remove All Item</button>
          </div>
          ))}
          </div>
  </main>
  )
}

export const ImgDiv = styled.div`
  /* width: 50%; */
  img {
    display:flex;
    width: 5%;
    height: auto;
    flex-direction: column;
    object-fit: cover;
    vertical-align: top;
    border-radius: 5px;
  }
`;

export default Cart

