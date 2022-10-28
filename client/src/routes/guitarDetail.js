import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../Redux/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";

const GuitarDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  const detail = useSelector((state) => state.products.detail);

  return (
    <section>
      <CountDiv>
        {detail.img?.split(',').length === 1?  <div className="imgcont"><img src={detail.img} alt=''/></div>: 
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {detail.img?.split(",").map((item, pos) => (
            <SwiperSlide key={pos}>
              <div className="imgcont">
                <img src={item} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>}
        <TextCont>
          <h2>{detail.brand}</h2>
          <h3>${detail.price}</h3>
          <h3>{detail.model}</h3>
          <p>{detail.description}</p>
        </TextCont>
      </CountDiv>
    </section>
  );
};

const CountDiv = styled.div`
  width: 70%;
  max-height: 600px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 75px;
  background-color: white;
  border: 1px solid rgb(40, 40, 40);
  border-radius: 10px;

  .imgcont {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  img {
    max-width: 100%;
    max-height: 400px;
  }

  .mySwiper {
    max-width: 300px;
  }
`;

const TextCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 25px;
`;

export default GuitarDetail;
