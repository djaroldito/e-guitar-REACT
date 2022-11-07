import styled from "styled-components";
import {HiOutlineEmojiSad} from "react-icons/hi"
import "./Cart.css";
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return(
            <Empty>
                <p>El carrito esta vacío  <HiOutlineEmojiSad/></p>
                <p>haga click en el siguiente botón para ver el catálogo</p>
                {/* <Link to='/home'><button className="Purchasebutton">Volver</button></Link> */}
            </Empty>
        )
    }
const Empty = styled.div`
    text-align: center;
    color: gray;
    font-size:30px;
   
`

export default EmptyCart;