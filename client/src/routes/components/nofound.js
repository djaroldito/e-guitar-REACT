import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getAllProducts, setFilters } from "../../Redux/productSlice";

const NoFound = () => {
  const dispatch = useDispatch();
  const Filters = {
    color: '',
    type: '',
    brand: '',
    fullName: '',
  minPrice: 0,
  maxPrice: 1800,
  sortPrice: ' '
  };
  return (
    <NoDiv>
      <h2>Product No Found</h2>
      <img
        src={`https://images.unsplash.com/photo-1522008224169-e5992bed5fae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnJva2VuJTIwZ3VpdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80`}
        alt="no guitar found "
      />
      <div className="buttonCont">
        <button onClick={() => dispatch(setFilters(Filters), getAllProducts())}>TRY AGAIN</button>
      </div>
    </NoDiv>
  );
};

const NoDiv = styled.div`
  width: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  background-color: white;

  .buttonCont {
    button {
      background: none;
      border: none;
      margin-top: 30px;
      background: rgb(82, 54, 139);
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 30px;
      color: whitesmoke;
      cursor: pointer;
    }
  }

  img {
    width: 250px;
  }
`;

export default NoFound;
