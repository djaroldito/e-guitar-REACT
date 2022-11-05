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

  console.log(filters)

  return (
    <section>
      <Filters>
        <form className="form">
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
        </form>
        {filters.color ? (
          <div>
            {filters.color}
            <button
              onClick={() =>
                dispatch(
                  setFilters({ ...filters, color: '' }),
				  dispatch(setCurrentPage(1))
                )
              }
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ) : null}
        {filters.brand ? (
          <div>
            {filters.brand}
            <button onClick={() =>
                dispatch(
                  setFilters({ ...filters, brand: '' }),
				  dispatch(setCurrentPage(1))
                )
              }>
              <RiDeleteBin6Line />
            </button>
          </div>
        ) : null}
        {filters.type ? (
          <div>
            {filters.type}
            <button onClick={() =>
                dispatch(
                  setFilters({ ...filters, type: '' },
				  dispatch(setCurrentPage(1)))
                )
              }>
              <RiDeleteBin6Line />
            </button>
          </div>
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
  border: 1px solid grey;
  padding: 35px;
  border-radius: 5px;
  background-color: white;
  form {
    display: flex;
    flex-direction: column;
  }
  select {
    border: 1px black solid;
    margin: 10px;
    padding: 5px;
    width: 100%;
    color: whitesmoke;
    border: none;
    background-color: rgb(128, 60, 60);
  }

  .contain {
    margin: 5px;
    padding: 3px 3px;
    border-bottom: 1px solid black;
  }
`;

export default Filter;
