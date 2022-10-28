import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getByFilter } from "../../Redux/productActions";

const Filter = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.products.brands);
  const colors = useSelector((state) => state.products.colors);
  const types = useSelector((state) => state.products.types);

  const [filtered,setFiltered] = useState({
    color: '',
    type: '',
    brand: ''
  });

  const handleChange = (e) => {
      setFiltered({
          ...filtered,
          [e.target.name]: e.target.value
        })
    };
    useEffect(() => dispatch(getByFilter(filtered)), [filtered,dispatch])

  return (
    <section>
      <Filters>
        <form className="form">
        <select name='brand' onChange={handleChange} >
          <option label="Brand"></option>
          {brands?.map((item, pos) => (
            <option  value={item} key={pos}>
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
                name='color'
                label={item}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
          <select>

            {types?.map((item, pos) => (
              <option value={item} key={pos}>
              {item}
            </option>))}
              </select>
        </form>
      </Filters>
    </section>
  );
};

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .radio {
    /* display: none; */
  }
  .contain {
    margin: 5px;
    border-radius: 5px;
    padding: 4px 7px;
    border: 1px solid black;
  }
`;

export default Filter;
