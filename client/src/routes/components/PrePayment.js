// los nombres de los producto

// los datos del usuuario.. si estan cargados sigue.. si no lo manda al perfil a completarlos datos

// ingresa cupon de descuento

//boton completa compra paypal

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../../Redux/productActions";
import { BsCart2 } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";
import Profile from "../Signup/Profile";

const PrePayment = () => {
  const carrito = useSelector((state) => state.products.cart);
  const mail = sessionStorage.getItem("emailData")
    ? sessionStorage.getItem("emailData")
    : sessionStorage.getItem("emailGoogle");
  console.log(mail);

  const completePayment = async (cart, mail) => {
    const response = await payment(cart, mail);
    console.log(response);
    window.location.href = response;
  };

  const [input, setinput] = useState({
    code: "",
  });
  console.log("code : ", input.code);

  const handleChange = (e) => {
    // setinput(e.target.value)
    setinput({ [e.target.name]: e.target.value });
  };
  let codeValidate;
  const validateCode = async (codeValidate) => {
    let discountCode = await axios.get(
      `/ruser/discountCode?code=${input.code}`
    );
    codeValidate = discountCode.data;
    console.log("codevalidatee",codeValidate)
    return codeValidate;
  }; 

  const TotalConDescuento = (carrito, codeValidate) => {
    console.log("code validatre",codeValidate)
    let totalDescuento =
      carrito
        ?.reduce(
          (acc, prod) => acc + prod.price.toFixed(2) * prod.Cart.quantity,
          0
        )
        .toFixed(2) -
      (codeValidate?.discount *
        carrito
          ?.reduce(
            (acc, prod) => acc + prod.price.toFixed(2) * prod.Cart.quantity,
            0
          )
          .toFixed(2)) /
        100;
    console.log("total descuento: ", totalDescuento);
    return totalDescuento;
  };

  const total = (carrito) => {
    console.log("carrito total",carrito)
    return carrito
      ?.reduce(
        (acc, prod) => acc + prod.price.toFixed(2) * prod.Cart.quantity,
        0
      )
      .toFixed(2);
  };

  return (
    <div>
      <Profile />
      {carrito.map((el, index) => (
        <div key={index}>
          <ImgDiv>
            <h2>{el.brand}</h2>
            <h3>{el.Cart.quantity}</h3>
            <img src={el.img} alt={carrito.brand} />
          </ImgDiv>
        </div>
      ))}
      <Total>
        {carrito.length >= 1 ? <label>Total: </label> : null}
        <h1>
          {carrito.length >= 1
            ? codeValidate?.hasOwnProperty("isUsed")
              ? TotalConDescuento(carrito, codeValidate)
              : total(carrito)
            : "No carrito"}
        </h1>
      </Total>

      <label>Enter Discount Code</label>
      <input
        value={input.code}
        name="code"
        type="text"
        placeholder="Discount Code..."
        onChange={(e) => handleChange(e)}
        style={{ padding: "14px 16px", width: "40%" }}
      />
      <button onClick={() => validateCode(codeValidate)}>SendCode</button>
      {carrito.length >= 1 ? (
        <button
          onClick={() => completePayment(carrito, mail)}
          className="Purchasebutton"
        >
          <BsCart2 /> To Pay
        </button>
      ) : null}
    </div>
  );
};

export default PrePayment;

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
`;
