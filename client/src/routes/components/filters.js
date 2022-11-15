import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getByFilter } from "../../Redux/productActions";
import { setFilters, setCurrentPage } from "../../Redux/productSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

const Filter = ({filtersShow, setfiltersShow}) => {
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.products.brands);
  const colors = useSelector((state) => state.products.colors);
  const types = useSelector((state) => state.products.types);
  const filters = useSelector((state) => state.products.Filters);
  const currentPage = useSelector((state) => state.products.currentPage);

  const handleChange = (e) => {
    dispatch(setFilters({ ...filters, [e.target.name]: e.target.value }));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    dispatch(getByFilter(filters, currentPage));
  }, [filters, dispatch, currentPage]);


  return (
    <section>

      <Filters filtersShow={filtersShow}>
        <div className="margin">
        <select
          name="sortPrice"
          onChange={handleChange}
          value={filters.sortPrice}
          >
          <option value="">Order by Price</option>
          <option value="ASC">Min to max price</option>
          <option value="DESC">Max to min price</option>
        </select>
        <select name="brand" onChange={handleChange} value={filters.brand}>
          <option label="Brand"></option>
          {brands?.map((item, pos) => (
            <option value={item} key={pos}>
              {item}
            </option>
          ))}
        </select>
        <ColorDiv>
          {colors?.map((item, pos) => (
            <div className="contain" key={pos}>
              <input
                className="radio"
                type="radio"
                onChange={handleChange}
                value={item}
                id={item}
                name="color"
                label={item}
                key={item}
                checked={filters.color === item ? true : false}
                />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </ColorDiv>
        <select name="type" onChange={handleChange} value={filters.type}>
          <option label="type"></option>
          {types?.map((item, pos) => (
            <option value={item} key={pos}>
              {item}
            </option>
          ))}
        </select>
        <PriceDiv>
        <label>Min-Price:</label>
        <div className="priceConta">
          <input
            type="number"
            min="0"
            max={filters.maxPrice}
            step="100"
            onChange={handleChange}
            name="minPrice"
            value={filters.minPrice}
            className="priceInput"
            />{" "}
          {filters.minPrice > 0 ? (
            <button
            onClick={() =>
              dispatch(
                setFilters({ ...filters, minPrice: 0 }),
                dispatch(setCurrentPage(1))
                )
              }
                className="priceButton"
                >
              <RiDeleteBin6Line />
            </button>
          ) : null}
        </div>
        <label>Max-Price:</label>
        <div className="priceConta">
          <input
            type="number"
            min={filters.minPrice}
            max="5000"
            step="100"
            onChange={handleChange}
            className="priceInput"
            name="maxPrice"
            value={filters.maxPrice}
            />
          {filters.maxPrice !== 5000 ? (
            <button
            onClick={() =>
              dispatch(
                setFilters({ ...filters, maxPrice: 5000 }),
                dispatch(setCurrentPage(1))
                )
              }
              className="priceButton"
              >
              <RiDeleteBin6Line />
            </button>
          ) : null}
        </div>
          </PriceDiv>

        {filters.color ? (
          <FilterDiv>
            <div>{filters.color}</div>
            <button
              onClick={() =>
                dispatch(
                  setFilters({ ...filters, color: "" }),
                  dispatch(setCurrentPage(1))
                  )
                }
                >
              <RiDeleteBin6Line />
            </button>
          </FilterDiv>
        ) : null}
        {filters.brand ? (
          <FilterDiv>
            <div>{filters.brand}</div>
            <button
              onClick={() =>
                dispatch(
                  setFilters({ ...filters, brand: "" }),
                  dispatch(setCurrentPage(1))
                  )
                }
                >
              <RiDeleteBin6Line />
            </button>
          </FilterDiv>
        ) : null}
        {filters.type ? (
          <FilterDiv>
            <div>{filters.type}</div>
            <button
              onClick={() =>
                dispatch(
                  setFilters(
                    { ...filters, type: "" },
                    dispatch(setCurrentPage(1))
                    )
                    )
                  }
                  >
              <RiDeleteBin6Line />
            </button>
          </FilterDiv>
        ) : null}
        <button className="button" onClick={() => setfiltersShow(!filtersShow)}>Apply</button>
      </div>
      </Filters>
        </section>
  );
};

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 15px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  width: 135px;
  padding: 35px;
  height: auto;
  border-radius: 5px;
  background-color: white;
  .button {
    border-radius: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    margin: 5px;
    width: 200px;
    background-color: rgb(76, 49, 138);
    color: whitesmoke;
    font-weight: 600;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    display: none;
    @media (max-width: 920px){
    display: flex;
  }
  }
  .margin{
    width: 100%;
    height: 100%;
    @media (max-width: 920px){
      margin-top: 45px;
      label{
    text-align: center;
  }
    }
  }
  @media (max-width: 920px) {
    display: flex;
    width: 100%;
    height: 100vh;
    top: -2%;
    transform: ${props => !props.filtersShow ? 'translateX(300%)' : 'translateX(0)'};
    transition: transform .3s ease-in;
    height: 100vh;
    position: fixed;
    background-color: (29,29,29,.3);
    z-index: 100;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    border-radius: 0;
  }
  @media (max-width: 500px){
    width: 100%;
    height: 100vh;
  }

  .priceInput {
    width: 100px;
    height: 22px;
  }
  select {
    margin: 10px;
    padding: 5px;
    width: 100%;
    border-radius: 10px;
    color: whitesmoke;
    margin-left: auto;
    background-color: rgb(128, 60, 60);
    @media (max-width: 920px) {
      display: flex;
      width: 40%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
    }
  }

  .contain {
    padding: 3px;
  }
  .priceButton {
    text-align: end;
    background: none;
    border: none;
    font-size: 17px;
    margin-top: 5px;
    cursor: pointer;
    margin-left: auto;
  }
  .priceConta {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
    width: 100%;
    @media (max-width: 920px) {
      display: flex;
      width: 70%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      text-align: center;
    }
  }
`;
const FilterDiv = styled.div`
margin-top: 10px;
display: flex;
flex-direction: row;
background-color: rgb(202, 211, 211);
align-items: center;
border-radius: 5px;
overflow: hidden;
width: 100%;
@media (max-width: 920px) {
    display: flex;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }


div {
  justify-content: left;
  padding: 5px;
}
button {
  padding: 7px;
  margin-left: auto;
  background: none;
  border: none;
  color: black;
  height: 100%;
  cursor: pointer;
}
`;
const ColorDiv = styled.div`
display: flex;
flex-direction: column;
@media (max-width: 920px) {
  display: flex;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
`
const PriceDiv = styled.div`
@media (max-width: 920px) {
  display: flex;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  text-align: left;
}

`



;

export default Filter;
