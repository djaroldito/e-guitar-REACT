import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getByFilter } from "../../Redux/productActions";
import { setFilters, setCurrentPage } from "../../Redux/productSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

const Filter = () => {
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
      <Filters>
          <select name='sortPrice' onChange={handleChange} value={filters.sortPrice}>
            <option value=''>Order by Price</option>
            <option value='ASC'>Min to max price</option>
            <option value='DESC'>Max to min price</option>
          </select>
          <select name="brand" onChange={handleChange} value={filters.brand}>
            <option label="Brand"></option>
            {brands?.map((item, pos) => (
              <option value={item} key={pos}>
                {item}
              </option>
            ))}
          </select>
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
          <select name="type" onChange={handleChange} value={filters.type}>
            <option label="type"></option>
            {types?.map((item, pos) => (
              <option value={item} key={pos}>
                {item}
              </option>
            ))}
          </select>
          <label>Min-Price:</label>
          <div className="priceConta">

          <input
            type="number"
            min="0"
            max={filters.maxPrice}
            step="1000"
            onChange={handleChange}
            name="minPrice"
            value={filters.minPrice}
            className='priceInput'
            /> { filters.minPrice > 0? <button  onClick={() =>
              dispatch(
                setFilters({ ...filters, minPrice: 0 }),
                dispatch(setCurrentPage(1))
                )
              } className="priceButton"><RiDeleteBin6Line/></button>: null}
              </div>
          <label>Max-Price:</label>
          <div className="priceConta">
          <input
            type="number"
            min={filters.minPrice}
            max="150000"
            step='1000'
            onChange={handleChange}
            className='priceInput'
            name="maxPrice"
            value={filters.maxPrice}
            />
           { filters.maxPrice !== 150000? <button  onClick={() =>
                dispatch(
                  setFilters({ ...filters, maxPrice: 150000 }),
                  dispatch(setCurrentPage(1))
                )
              } className="priceButton"><RiDeleteBin6Line/></button>: null}
            </div>

        {filters.color ? (
          <FilterDiv>
            <div>
            {filters.color}
            </div>
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
            <div>
            {filters.type}
            </div>
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
      </Filters>
    </section>
  );
};

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 30px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  width: 150px;
  padding: 35px;
  border-radius: 5px;
  background-color: white;

  .priceInput{
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
  }

  .contain {
    padding: 3px;
  }
  .priceButton{
    text-align: end;
    background: none;
    border: none;
    font-size: 17px;
    margin-top: 5px;
    cursor: pointer;
    margin-left: auto;
  }
  .priceConta{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
    width: 100%;
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

div{
  justify-content: left;
  padding: 5px;
}
button{
  padding: 7px;
  margin-left: auto;
  background: none;
  border: none;
  color: black;
  height: 100%;
  cursor: pointer;
}
`

export default Filter;
