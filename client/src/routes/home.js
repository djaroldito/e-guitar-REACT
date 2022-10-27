import styled from "styled-components";
import {BsCart2} from 'react-icons/bs';
import {FaGuitar} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { getProductToCart } from "../Redux/productSlice";
import {useState} from "react";
import Pagination from "./components/Pagination/Pagination";
import {getAllPrds} from './../Redux/productActions';
import {Link} from 'react-router-dom';

const Home = () => {
const dispatch = useDispatch()
const products = useSelector(state => state.products.products)

useEffect(() => {if(products.length === 0) {dispatch(getAllPrds())}},[products.length,dispatch])

 //paginados
 
 const [currentPage, setCurrentPage] = useState(1)
  const guitarsPerPage = 4
	const firstIdx = (currentPage - 1) * guitarsPerPage
	const lastIdx = firstIdx + guitarsPerPage

  let currentGuitars = products.slice(firstIdx, lastIdx);

 const handlePageChange = (pageNumber) => {
  dispatch(setCurrentPage(pageNumber))
  }
  
  return (
    <main>
      <CardsCont>
        {currentGuitars?.map((item) => (
          <DivCont key={item.id}>
             <img src={item.img} alt="" />
            <div className="text-cont">
           <h2>{item.brand}</h2>
              <h3>{item.model}</h3>
              <p>$ {item.price}</p>
              <Link to={`/${item.id}`}> <FaGuitar/> Show Details</Link>
              <button className="cartbtn" onClick={() => dispatch(getProductToCart(item))}><BsCart2/> Add Cart</button>
            </div>
          </DivCont>
        ))}
      </CardsCont>
      <Pagination 
          handleChange={handlePageChange}
          totalCards={products.length}
          currentPage={currentPage}
          guitarsPerPage={guitarsPerPage}/>
    </main>
  );
};

const DivCont = styled.div`
  width: 350px;
  height: 350px;
  border: 1px solid gray;
  background-color: white;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 30px;
  text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;

  a{
    text-decoration: none;
    color: blue;

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
  button{
    background: none;
    border: 1px solid black;
    padding: 10px 7px;
    margin-top: 7px;
    border-radius: 10px;
    width: 85%;
    cursor: pointer;
  }
  .cartbtn{
    background-color: rgb(41, 73, 143);
    color: whitesmoke;
    font-weight: 600;
  }
`;
const CardsCont = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: 25px;
`;

export default Home;
