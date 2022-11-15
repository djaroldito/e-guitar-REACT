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
import { IoMapOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const PrePayment = () => {
  const carrito = useSelector((state) => state.products.cart);
  const mail = sessionStorage.getItem("emailData")
    ? sessionStorage.getItem("emailData")
    : sessionStorage.getItem("emailGoogle");
  console.log(mail);

  const completePayment = async (cart, mail, code) => {
    const response = await payment(cart, mail, code);
    console.log(response);
    window.location.href = response;
  };

  const [input, setinput] = useState({
    code: "",
  });

  const [codeDisc, setCodeDisc] = useState({});
  const [totalConDescuento, setTotalConDescuento] = useState()

  const handleChange = (e) => {
    e.preventDefault(e)
    // setinput(e.target.value)
    if (e.target.value !== "") {
      setinput({ [e.target.name]: e.target.value });
    }
  };
  let codeValidate;
  const validateCode = async (codeValidate) => {
    if (input.code !== "") {
      let discountCode = await axios.get(
        `/ruser/discountCode?code=${input.code}`
      );
      setinput({
        code:"",
      })
      console.log(discountCode)
      if (discountCode.data.length === 0) return Swal.fire("Codigo no valido");
      codeValidate = discountCode.data;
      setCodeDisc(codeValidate);
      setTotalConDescuento(getTotalConDescuento(carrito,codeValidate))
      console.log("total con des:",totalConDescuento)
    } else {
      Swal.fire("Codigo no valido");
    }
  };

  const getTotalConDescuento = (carrito, codeValidate) => {
  /*   setinput({
      code:"",
    }) */
    console.log("entro", codeValidate)
    if(!codeValidate) return 
    let totalDescuento =
      carrito
        ?.reduce(
          (acc, prod) => acc + prod.price.toFixed(2) * prod.cart.quantity,
          0
        )
        .toFixed(2) -
      (codeValidate[0]?.discount *
        carrito
          ?.reduce(
            (acc, prod) => acc + prod.price.toFixed(2) * prod.cart.quantity,
            0
          )
          .toFixed(2)) /
        100;
        
    return totalDescuento.toFixed(2);
  };

  const total = (carrito) => {
    return carrito
      ?.reduce(
        (acc, prod) => acc + prod.price.toFixed(2) * prod.cart.quantity,
        0
      )
      .toFixed(2);
  };
  console.log(codeDisc)
  return (
    <div>
      <Profile />
      {carrito.map((el, index) => (
        <div key={index}>
          <ImgDiv>
            <h2>{el.brand}</h2>
            <h3>{el.cart.quantity}</h3>
            <img src={el.img} alt={carrito.brand} />
          </ImgDiv>
        </div>
      ))}
     <Total>
        {carrito.length >= 1 ? <label>Total: </label> : null}
        <h1>
          {carrito.length >= 1
            ? codeDisc?.length > 0 
              ? codeDisc[0].isUsed === false
                ? totalConDescuento
                : Swal.fire("This Code was Used") && total(carrito) && setCodeDisc({})
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
      <button type="button" onClick={() => validateCode(codeValidate)}>SendCode</button>
      {carrito.length >= 1 ? (
        <button
        onClick={() => completePayment(carrito, mail, codeDisc[0].isUsed === false ? codeDisc[0].code : null )}
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
