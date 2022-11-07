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
                <div className="Linkcont">
                <Link to={`/home/${item.id}`}>
                  <FaGuitar /> Show Details
                </Link>
                </div>
               
              </div>
            </Card>
    )  
     
}
const Card = styled.div`
  min-width: 350px;
  min-height: 350px;
  max-height: 350px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
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
    color: whitesmoke;
    background-color: rgb(82, 54, 139);
    padding: 10px;
    border-radius: 7px;
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
  .Linkcont{
    margin-top: 50px;
  }
`;

export default ProductCard;