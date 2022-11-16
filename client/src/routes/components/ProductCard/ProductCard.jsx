import styled from "styled-components";
import { FaGuitar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const ProductCard = ({ item }) => {
  return (
    <Card key={item.id}>
      {item.img?.split(",").length === 1 ? (
        <div className="imgcont">
          <img src={item.img} alt="" />
        </div>
      ) : (
        <div className="slide-div">
          <Swiper
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {item.img?.split(",").map((el, pos) => (
              <SwiperSlide key={pos}>
                
                  <img src={el} alt="" />
              
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="text-cont">
        <h2>{item.brand}</h2>
        <h3>{item.model}</h3>
        { item.discount >= 1? <div className="priceDiv">
            <p className="price disc"><del>U$D{item.price}</del> {item.discount}%OFF</p>
            <h3 className="price">U$D { (item.price * (100 - item.discount)/100).toFixed(2)}</h3>
            </div>:
            <h3 className="price">U$D {item.price.toFixed(2)}</h3>
          } 
        <div className="Linkcont">
          <Link to={`/home/${item.id}`}>
            <FaGuitar /> Show Details
          </Link>
        </div>
      </div>
    </Card>
  );
};
const Card = styled.div`
  min-width: 340px;
  width: 45%;
  min-height: 350px;
  max-height: 350px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  margin-right: 15px;
  margin-top: 15px;
  text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media(max-width: 925px){
    display: flex;
		flex-direction: column;
    min-height: 400px;
    width: 200px;
	}
  a {
    text-decoration: none;
    color: whitesmoke;
    background-color: rgb(82, 54, 139);
    padding: 10px;
    border-radius: 7px;
    margin-left: auto;
    margin-right: auto;
  }
  h2,
  h3 {
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    text-align: left;
    @media(max-width: 920px){
	  margin-top: 3px;
    margin-bottom: 0;
	}
  }
  p {
    margin-left: 15px;
    text-align: left;
  }
  
  img {
    max-width: 90%;
    height: auto;
    max-height: 300px;
    margin-left: 10%;
    object-fit: contain;
    @media(max-width: 920px){
      position: relative;
      max-height: 150px;
      width: auto;
      margin-top: 10px;
    }

    
  }

  .imgcont{
      max-width: 50%;
      min-height: 165px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  .cartbtn {
    background-color: rgb(41, 73, 143);
    color: whitesmoke;
    font-weight: 600;
    transition: 0.3s ease-out;
  }
  .cartbtn:hover {
    background-color: whitesmoke;
    color: rgb(41, 73, 143);
  }
  .Linkcont {
    margin-top: auto;
  }
  .text-cont {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 20px;
    height: 80%;
    @media(max-width: 920px){
	  height: 200px;
    position: relative;
    margin-bottom: 10px;
	}
  }

  .slide-div {
    width: 45%;
    min-width:45% ;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    @media(max-width: 920px){
      width: 100%;
      height: auto;
      position: relative;
	}
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
`;

export default ProductCard;
