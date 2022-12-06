
import axios from "axios";
import { useSelector } from "react-redux";
import { payment } from "../../Redux/productActions";
import { clearCart } from '../../Redux/productSlice';
import { useDispatch } from "react-redux";
import { BsCart2 } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";
import Profile from "../Signup/Profile";
import Swal from "sweetalert2";
import "./PrePayment/PrePayment.css";

const PrePayment = () => {
  //prueba
  const carrito = useSelector((state) => state.products.cart);
  const mail = sessionStorage.getItem("emailData")
    ? sessionStorage.getItem("emailData")
    : sessionStorage.getItem("emailGoogle");
  console.log(mail);
  const dispatch = useDispatch();
  const completePayment = async (cart, mail, code, discount) => {
    const { data } = await axios.get("/ruser/email", {
      params: {
        email: mail,
      },
    });
    if (
      data.fullname &&
      data.address &&
      data.province &&
      data.city &&
      data.zipcode &&
      data.phone
    ) {
      const response = await payment(cart, mail, code, discount);
      dispatch(clearCart())
      console.log(response);
      window.location.href = response;
    } else {
      Swal.fire("You must fill in your personal details");
    }
  };

  const [input, setinput] = useState({
    code: "",
  });

  const [codeDisc, setCodeDisc] = useState({});
  const [totalConDescuento, setTotalConDescuento] = useState();

  const handleChange = (e) => {
    e.preventDefault(e);
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
      Swal.fire("10% discount applied!!")
      setinput({
        code: "",
      });
      console.log(discountCode);
      if (discountCode.data.length === 0) return Swal.fire("invalid code");
      codeValidate = discountCode.data;
      setCodeDisc(codeValidate);
      setTotalConDescuento(getTotalConDescuento(carrito, codeValidate));
    } else {
      Swal.fire("invalid code");
    }
  };

  const getTotalConDescuento = (carrito, codeValidate) => {
    if (!codeValidate) return;
    let totalDescuento =
      carrito
        ?.reduce(
          (acc, prod) => acc + prod.price.toFixed(2) * prod.cart.quantity - (((prod.price * prod.cart.quantity) * prod.discount)/100),
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
        (acc, prod) => acc + prod.price.toFixed(2) * prod.cart.quantity - (((prod.price * prod.cart.quantity) * prod.discount)/100),
        0
      )
      .toFixed(2);
  };

  return (
    <div className='prePayBox'>
      <div className='preCarAndPay'>
        <Profile className="prePayProfile"/>
        <div className='preCarrito'>
          <h2>Product list: </h2>
          {carrito.map((el, index) => (
            <div className='preProduct' key={index}>
                <h3>Brand: {el.brand}</h3>
                <h3>Quantity: {el.cart.quantity}</h3>
                <div className='preDivImg'>
                  <img src={el.img} alt={carrito.brand} />
                </div>
            </div>
          ))}
        </div>

      <div className='prePayCart'>
        <label>Enter Discount Code: </label>
        <input
          value={input.code}
          name="code"
          type="text"
          placeholder="Discount Code..."
          onChange={(e) => handleChange(e)}
          style={{ padding: "14px 16px", width: "40%" }}/>
          <button className="prePayCartBtn" type="button" onClick={() => validateCode(codeValidate)}>
            SendCode
          </button>
      </div>
      </div>

      <div className='preTotal'>
        {carrito.length >= 1 ? <label>Total: </label> : null}
        <h1>
          {carrito.length >= 1
            ? codeDisc?.length > 0
              ? codeDisc[0].isUsed === false
                ? totalConDescuento
                : Swal.fire("This Code was Used") &&
                  total(carrito) &&
                  setCodeDisc({})
              : total(carrito)
            : ""}
        </h1>

        {carrito.length >= 1 ? (
          <button
          className='prePayBtn'
          onClick={() =>
            completePayment(
              carrito,
              mail,
              codeDisc.length > 0 ? codeDisc[0].code : null,
              codeDisc.length > 0 ? codeDisc[0].discount : 0
              )}>
            <BsCart2 /> To Pay
          </button>
        ) : null}
        </div>
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