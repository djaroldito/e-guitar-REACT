import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import ProductCard from "./components/ProductCard/ProductCard";
import {
  getAllPrds,
  getTypes,
  getColors,
  getBrands,
} from "./../Redux/productActions";
import { AiOutlineSearch } from "react-icons/ai";
import SearchBar from "./components/searchbar";
import Filter from "./components/filters";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllPrds());
      dispatch(getTypes());
      dispatch(getColors());
      dispatch(getBrands());
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const guitarsPerPage = 4;
  const firstIdx = (currentPage - 1) * guitarsPerPage;
  const lastIdx = firstIdx + guitarsPerPage;

  let currentGuitars = products.slice(firstIdx, lastIdx);

 const handlePageChange = (pageNumber) => {
  dispatch(setCurrentPage(pageNumber))
  }

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const constructorCart = () => {
    if (!localStorage.getItem("carrito")) {
      localStorage.setItem("carrito", "[]");
    }
  };

  constructorCart();


  return (
    <main>
      <Search>
        <div
          style={
            isActive
              ? { display: "block", width: "30%" }
              : { display: "none", width: "30%" }
          }
        >
          <SearchBar/>
        </div>
        <button onClick={handleClick}>
          <AiOutlineSearch />
        </button>
      </Search>
      <ContainerDiv>
        <Filter />
        <CardsCont>
          {currentGuitars?.map((item) => (
            <ProductCard
            item={item}
            />
          ))}
        </CardsCont>
      </ContainerDiv>
      <Pagination
        handleChange={handlePageChange}
        totalCards={products.length}
        currentPage={currentPage}
        guitarsPerPage={guitarsPerPage}
      />
    </main>
  );
};

const Search = styled.div`
  padding: 14px 16px;
  display: flex;
  justify-content: center;
  button {
    background-color: transparent;
    border: none;
    font-size: 30px;
  }
`;

const CardsCont = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 25px;
`;

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default Home;
