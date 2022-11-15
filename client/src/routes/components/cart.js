import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  delOneFromCart,
  clearCart,
  getProductToCart,
} from "../../Redux/productSlice";
import { payment, addCartToDB } from "../../Redux/productActions";
import { AiOutlineDelete } from "react-icons/ai";
import EmptyCart from "./Cart/EmptyCart";
import { BsCart2 } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";

const Cart = () => {
  const carrito = useSelector((state) => state.products.cart);
  const userId = sessionStorage.getItem("userId");
  const mail = sessionStorage.getItem("emailData")
    ? sessionStorage.getItem("emailData")
    : sessionStorage.getItem("emailGoogle");
  console.log(mail);
  const dispatch = useDispatch();
  //console.log(carrito)

  const addCartItem = async (item) => {
    dispatch(getProductToCart(item));
    if (userId)
      await addCartToDB(JSON.parse(localStorage.getItem("carrito")), userId);
  };

  const delFromCart = async (item) => {
    dispatch(delOneFromCart(item));
    if (userId)
      await addCartToDB(JSON.parse(localStorage.getItem("carrito")), userId);
  };

  // const completePayment = async (cart, mail) => {
  //   const response = await payment(cart, mail);
  //   console.log(response);
  //   window.location.href = response;
  // };

  // constructorCart()
  //funciones carteles de alerta
  const preguntaTodo = () => {
    Swal.fire({
      title: "Are you sure to delete the entire cart?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire("Deleted!");
      }
    });
  };
  const preguntaUno = async (item) => {
    Swal.fire({
      title: "Are you sure to delete this item from the cart?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(delOneFromCart(item));
        if (userId)
          await addCartToDB(
            JSON.parse(localStorage.getItem("carrito")),
            userId
          );
        Swal.fire("Deleted!");
      }
    });
  };

  return (
    <Main>
      {carrito.length >= 1 ? (
        <ClearButton>
          <button onClick={preguntaTodo}><AiOutlineClear/> Clear Cart</button>
        </ClearButton>
      ) : (
        <EmptyCart />
      )}
      <div className="ProductCartContainer">
        <br />
        {carrito.map((el, index) => (
          <div key={index} className="ProductCard">
            <ImgDiv>
              <img src={el.img} alt={carrito.brand} />
              <div>
                <h2>{el.brand}</h2>
                {el.model ? (
                  <p>
                    {" "}
                    <b>Model: </b>
                    {el.model}.
                  </p>
                ) : null}
                {el.color ? (
                  <p>
                    {" "}
                    <b>Color: </b>
                    {el.color}.
                  </p>
                ) : null}
              </div>
            </ImgDiv>

            {el.discount ? (
              <p>
                {" "}
                <b>Discount: </b>
                {el.discount}.
              </p>
            ) : null}
            <div className="InputCartContainer">
              <button
                disabled={el.Cart.quantity !== 1 ? false : true}
                onClick={() => delFromCart(el)}
              >
                -
              </button>
              <input placeholder={el.Cart.quantity} disabled></input>
              <button
                disabled={el.Cart.quantity < el.stock ? false : true}
                onClick={() => addCartItem(el)}
              >
                +
              </button>
              {el.stock ? (
                <p>
                  {" "}
                  <b>Available products: {el.stock}</b>.
                </p>
              ) : null}
            </div>
            <p>${el.price.toFixed(2)}</p>
            <button onClick={() => preguntaUno(el.id, true)}>
              <AiOutlineDelete />
            </button>
          </div>
        ))}
        <Total>
          {carrito.length >= 1 ? <h3>Total:</h3> : null}
          <h3 className="price">U$D 
            {carrito.length >= 1
              ? carrito
                  .reduce(
                    (acc, prod) =>
                      acc +
                      (prod.discount > 0
                        ? (prod.price.toFixed(2) * (100 - prod.discount)) / 100
                        : prod.price.toFixed(2)) *
                        prod.Cart.quantity,
                    0
                  )
                  .toFixed(2)
              : null}
          </h3>
        </Total>
      </div>
      {carrito.length >= 1 ? (
        <CustomButtons>
        <button
          // onClick={() => completePayment(carrito, mail)}
          >
          <BsCart2 />
          Completar Compra
        </button>
          </CustomButtons>
      ) : null}
      <br />
      <CustomButtons>
        <Link to="/home">
          <button className="back-home">
            <IoArrowBackOutline /> Back Home
          </button>
        </Link>
      </CustomButtons>
    </Main>
  );
};

export const ImgDiv = styled.div`
  width: 80%;
  display: flex;
  margin-left: 5%;
  img {
    max-width: 5%;
    max-height: auto;
    object-fit: scale-down;
    vertical-align: top;
    border-radius: 5px;
  }
`;
const Total = styled.div`
  float: right;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-end;
  align-items: center;

  .price{
    color: green;
    margin-left: 5px;
  }
`;
const CustomButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  a {
    color: whitesmoke;
    text-decoration: none;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
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
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
  }
  .back-home {
    background-color: rgb(128, 60, 60);
    font-weight: 600;
  }
`;

const Main = styled.main`
  min-height: 720px;
  max-width: 1200px;
`;

const ClearButton = styled.div`
  text-align: end;
  margin-top: 20px;
  align-items: center;
  display: flex;
  justify-content: end;
  font-size: 25px;
  button {
    border: none;
    cursor: pointer;
    background-color: rgb(128, 60, 60);
    color: whitesmoke;
    padding: 10px 15px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 10px;
  }
`;

export default Cart;
