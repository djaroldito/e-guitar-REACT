import { useEffect, React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { delProductToCart } from "../../Redux/productSlice"


const Cart = () =>{
  
    const carrito = useSelector(state => state.products.cart)
    const dispatch = useDispatch()

   
  return(
  <main>
     
  <div>

          {carrito.map((el=>(
          <div key={el.id}>
          <h2>{el.brand}</h2>

          <ImgDiv>            
          <img src={el.img} alt={carrito.brand}/>
          </ImgDiv>
          {el.model?<p> <b>Model: </b>{el.model}.</p>: null}
          {el.type?<p> <b>Type: </b>{el.type}.</p>: null}
          {el.color?<p> <b>Color: </b>{el.color}.</p>: null}
          <p><b>Price: </b>{el.price}</p>
         
         
          <p><b>Stock: </b>{el.stock}</p>
          <p><b>Discount: </b>{el.discount}</p>
        
        
          <button onClick={() => dispatch(delProductToCart(el.id))}>Remove product</button>
          </div>
          )))}
           

         
         
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