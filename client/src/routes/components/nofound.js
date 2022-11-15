import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setFilters } from "../../Redux/productSlice";
import Pic1 from '../../pics/Home/broken.jpg'

const NoFound = () => {
  const dispatch = useDispatch();
  const Filters = {
    color: "",
    type: "",
    brand: "",
    fullName: "",
    minPrice: 0,
    maxPrice: 5000,
    sortPrice: " ",
  };
  const handleError = () => {
    dispatch(setFilters(Filters));
  };
  return (
    <NoDiv>
      <h2>Product No Found</h2>
      <img
        src={`https://media.istockphoto.com/photos/broken-guitar-picture-id187814021?b=1&k=20&m=187814021&s=170667a&w=0&h=W0o-rErkxNSFKI9nw29U2Sgq1u5Jgj26-UYAMMkbeRQ=`}
        alt="no guitar found "
      />
      <div className="buttonCont">
        <button onClick={() => handleError()}>TRY AGAIN</button>
      </div>
    </NoDiv>
  );
};

const NoDiv = styled.div`
  width: 80%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
  @media (max-width: 920px) {
    display: flex;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
  }

  .buttonCont {
    button {
      background: none;
      border: none;
      margin-top: 30px;
      background: rgb(82, 54, 139);
      padding: 10px 30px ;
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
