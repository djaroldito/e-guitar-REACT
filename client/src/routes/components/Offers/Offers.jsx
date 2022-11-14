import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOffers } from "../../../Redux/productActions";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "./Offers.css";
import { NavLink } from "react-router-dom";
const Offers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
			dispatch(getAllOffers())
	}, []);
    const products = useSelector((state) => state.products.products);
    return (
        <div className="OffersContainer">
            <Swiper
                navigation
                pagination={{clickable: true}}
                scrollbar={{draggable: true}}
                slidesPerView={5}
                spaceBetween={20}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
            >
            {products.map(product => {
            return(
                        <SwiperSlide>
                            <div className="OffersCard">
                            <NavLink to={`/home/${product.id}`}>
                                <div className="OfferImgContainer">
                                    <img src={product.img} alt=''></img>    
                                </div>
                                <p style={{textDecoration: "line-through"}}>${product.price}</p>
                                <h3>${(product.price - ((product.price*product.discount)/100)).toFixed(2)}</h3>
                                <h4>{product.brand} {product.model}</h4>
                                <div className="DiscountBox">
                                    <p>{product.discount}% OFF</p>
                                </div>
                            </NavLink>
                            </div>
                        </SwiperSlide>     
            )

            })}

            </Swiper>
        </div>
    )
}

export default Offers;