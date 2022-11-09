import styled from "styled-components";
import {HiOutlineEmojiSad} from "react-icons/hi"
import "./Cart.css";
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return(
            <Empty>
                <div>
				<h1>Empty Cart! </h1>
				<img
					src='https://www.seamwork.com/assets/cart-empty-0642206d80ee53cff984a7bcd293d372e084e371597f8cae290b57283e0f3d8c.png'
					alt='carrito'
				></img>
			</div>
            </Empty>
        )
    }
const Empty = styled.div`
    text-align: center;
    color: black;
    img{
        margin-top: 5px;
    }
   
`

export default EmptyCart;