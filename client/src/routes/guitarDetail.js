import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../Redux/productActions";

const GuitarDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getById(id));
  },[dispatch, id]);

  const detail = useSelector(state => state.products.detail)
  

  console.log(detail)

  return (
     <section>
      <div>
       {detail.img?.split(',').map((item,pos) => <div key={pos}> <img src={item} alt=''/> </div>)} 
        <h2>{detail.brand}</h2>
        <h3>${detail.price}</h3>
        <h3>{detail.model}</h3>
        <p>{detail.description}</p>
      </div>
   </section>
  
  )
};

export default GuitarDetail;
