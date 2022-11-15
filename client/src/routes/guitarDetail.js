import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getById, addCartToDB } from "../Redux/productActions";
import { clearDetail, getProductToCart } from "../Redux/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Rating } from "@mui/material";
import Reviews from "./components/reviews";

const GuitarDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ReviewForm, setReviewForm] = useState(true);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    dispatch(getById(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const [input, setInput] = useState("");
  const detail = useSelector((state) => state.products.detail);
  const carrito = useSelector((state) => state.products.cart);

  const isInCart = () => carrito?.find((el) => el.id === detail.id);
  const addToCart = async (detail) => {
    Swal.fire({
      title: "Product added to cart!",
      icon: "success",
      confirmButtonText: "Ok",
    });

    dispatch(getProductToCart({ ...detail, color: input }));

    if (userId)
      await addCartToDB(JSON.parse(localStorage.getItem("carrito")), userId);
  };

  const change = (e) => {
    setInput(e.target.value);
  };

  let ReviewButton;
  if (!userId) {
     ReviewButton = false;
  } else {
     ReviewButton = true;
};

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/rguitars/${id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire(
                "Deleted!",
                "Your product has been deleted.",
                "success"
              ).then((r) => navigate("/home"));
            }
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  return (
    <section>
      <CountDiv>
        {detail.img?.split(",").length === 1 ? (
          <div className="imgcont">
            <img src={detail.img} alt="" />
          </div>
        ) : (
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Pagination]}
            className="mySwiper"
          >
            {detail.img?.split(",").map((item, pos) => (
              <SwiperSlide key={pos}>
                <div className="imgcont">
                  <img src={item} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {ReviewForm ? (
          <TextCont>
            <h2>{detail.brand}</h2>
            { detail.discount >= 1? <div className="priceDiv">
            <p className="price disc"><del>U$D{detail.price}</del> {detail.discount}%OFF</p>
            <h3 className="price">U$D { (detail.price * 1-detail.discount).toFixed(2)}</h3>
            </div>:
            <h3 className="price">U$D {(detail.price * 1-detail.discount).toFixed(2)}</h3>
          } 
            <h3>model: {detail.model}</h3>
            {detail.stars ? (
              <Rating value={detail.stars} precision={0.5} readOnly />
            ) : null}
            <button
              onClick={() => setReviewForm(!ReviewForm)}
            >
              Leave a review
            </button>
            <div>
              <p
                dangerouslySetInnerHTML={{ __html: `${detail.description}` }}
              ></p>
            </div>
            <p>
              <b>Type: </b>
              {detail.type}
            </p>
            {detail.leftHand ? <LeftHand>Left Hand Available</LeftHand> : null}

            <ColorDiv>
              Colors:
              {detail.color?.split(", ").map((item, pos) => (
                <div className="color-div" key={pos}>
                  <input
                    onChange={(e) => change(e)}
                    name="color"
                    type="radio"
                    value={item}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </ColorDiv>

            {sessionStorage.getItem("isAdmin") === "true" ? (
              <CustomButtons>
                <button
                  type="button"
                  title="Edit product"
                  onClick={() => navigate(`/editProduct/${detail.id}`)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete"
                  type="button"
                  title="Delete product"
                  onClick={() => handleDeleteProduct(detail.id)}
                >
                  <FaTrashAlt /> Delete
                </button>
              </CustomButtons>
            ) : (
              <CustomButtons>
                {carrito?.find((item) => detail.id === item.id) ? (
                  <Link to="/cart">
                    <button className="include">
                      <BsCart2 /> This product is in your cart
                    </button>
                  </Link>
                ) : (
                  <div>
                    <button
                      className="add-cart"
                      onClick={() => addToCart(detail)}
                      disabled={isInCart()}
                    >
                      <BsCart2 />
                      Add Cart
                    </button>
                  </div>
                )}
                <Link to="/home">
                  <button className="back-home">
                    <IoArrowBackOutline /> Back Home
                  </button>
                </Link>
              </CustomButtons>
            )}
          </TextCont>
        ) : (
          <Reviews />
        )}
      </CountDiv>
      <AdInfo>
        aditional Information:{" "}
        <span
          dangerouslySetInnerHTML={{ __html: `${detail.aditionalInformation}` }}
        ></span>
      </AdInfo>
    </section>
  );
};

const CountDiv = styled.div`
  width: 740px;
  max-width: 900px;
  min-height: 400px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 75px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  @media(max-width: 920px){
		flex-direction: column;
    max-height: auto;
    height: auto;
    max-width: 100%;
	}

  .priceDiv{
    p{
      margin-bottom: 3px;
    }
  }


  .price{
    color: green;
    font-weight: 600;
  }
  .imgcont {
    display: flex;
    justify-content: center;
    max-width: 300px;
    min-width: 250px;
    margin-left: 15px;
  }
  img {
    max-width: 100%;
    max-height: 400px;
  }
  .mySwiper {
    max-width: 300px;
    height: 100%;
  }
`;

const TextCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 40px;
  margin-top: 10px;
  height: 100%;
  margin-right: 15px;
  @media(max-width: 920px){
	width: 80%;
	}

  h2,
  h3 {
    font-weight: 400;
    margin: 3px;
  }
`;
const LeftHand = styled.div`
  padding: 5px;
  border: 1px black solid;
  height: 20px;
  background: green;
  color: white;
  margin-top: 15px;
  border-radius: 5px;
  width: 140px;
`;
const ColorDiv = styled.form`
  display: flex;
  flex-direction: row;
  padding: 15px;
  .color-div {
    margin-left: 5px;
  }
`;

const CustomButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  position: relative;
  margin-top: auto;
  margin: 15px;
  @media(max-width: 920px){
	width: 80%;
	}
  a {
    color: whitesmoke;
    text-decoration: none;
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
    
  }
  .back-home,
  .delete {
    background-color: rgb(128, 60, 60);
    font-weight: 600;
  }
  svg {
    padding: 0 8px;
  }
  .include {
    background-color: green;
  }
`;
const AdInfo = styled.p`
  font-size: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  
`;

export default GuitarDetail;
