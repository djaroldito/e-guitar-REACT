import styled from "styled-components";
import {FaGuitar} from 'react-icons/fa';
import { Link } from "react-router-dom";

const ProductCard = ({item}) => {
    return(
        <Card key={item.id}>
              <img src={item.img} alt="" />
              <div className="text-cont">
                <h2>{item.brand}</h2>
                <h3>{item.model}</h3>
                <p>$ {item.price.toFixed(2)}</p>
                {item.quantity ? (
                  <p>
                    {" "}
                    <b>Quantity: </b>
                    {item.quantity}.
                  </p>
                ) : null}
                <Link to={`/home/${item.id}`}>
                  {" "}
                  <FaGuitar /> Show Details
                </Link>
               
              </div>
            </Card>
    )  
     
}
const Card = styled.div`
  width: 350px;
  height: 350px;
  border: 1px solid gray;
  background-color: white;
  margin-right: 10px;
  margin-top: 30px;
  text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: blue;
  }
  h2,
  h3 {
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    text-align: left;
  }
  p {
    margin-left: 15px;
    text-align: left;
  }
  img {
    min-width: 100px;
    width: 200px;
    height: auto;
    max-height: 300px;
    object-fit: contain;
  }
  button {
    background: none;
    border: 1px solid black;
    padding: 10px 7px;
    margin-top: 7px;
    border-radius: 10px;
    width: 85%;
    cursor: pointer;
  }
  .cartbtn {
    background-color: rgb(41, 73, 143);
    color: whitesmoke;
    font-weight: 600;
    transition: .3s ease-out;
  }
  .cartbtn:hover{
    background-color: whitesmoke;
    color: rgb(41, 73, 143);
  }
`;

export default ProductCard;