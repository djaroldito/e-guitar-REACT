import styled from "styled-components";
import {BsCart2} from 'react-icons/bs'
import {FaGuitar} from 'react-icons/fa'
import {useState} from "react";

import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import {getAllPrds} from './../Redux/productActions'
import SearchBar from "./components/searchbar"
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'

const Home = () => {
const [isActive, setIsActive] = useState(false);
const [Searched, setSearch] = useState([]);
const dispatch = useDispatch()
const products = useSelector(state => state.products.products)

useEffect(() => {if(products.length === 0) {dispatch(getAllPrds())}},[products.length,dispatch])

const SearchHandler = (value) => {
  setSearch(value)
}
const handleClick = () => {
  setIsActive(current => !current)
}
const ProductRender = (item) => 
  (
    <DivCont key={item.id}>
      <img src={item.img} alt="" />
      <div className="text-cont">
      <h2>{item.brand}</h2>
        <h3>{item.model}</h3>
        <p>$ {item.price}</p>
        <Link to={`/${item.id}`}> <FaGuitar/> Show Details</Link>
        <button className="cartbtn"><BsCart2/> Add Cart</button>
      </div>
  </DivCont>
)


return (
    <main>
      <Search>
              <div style={isActive ? {display: 'block', width:'30%'} : {display:'none', width:'30%'}}>
                  <SearchBar handler={SearchHandler} products={products} Search={Search}/>
              </div>
          <button onClick={handleClick}>
              <AiOutlineSearch/>
          </button>
      </Search>
      <CardsCont>
        {Searched.length>0 ?         
          Searched.map((item) => ProductRender(item)) : products.map((item) => ProductRender(item))
          }
      </CardsCont>
    </main>
  );
};


const Search = styled.div`
    padding: 14px 16px;
    display:flex;
    justify-content: center;
    button{
      background-color:transparent;
      border: none;
      font-size:30px;
    }
`
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
