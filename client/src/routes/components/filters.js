import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getByFilter } from "../../Redux/productActions";
import { setFilters } from "../../Redux/productSlice";

const Filter = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.products.brands);
  const colors = useSelector((state) => state.products.colors);
  const types = useSelector((state) => state.products.types);
  const filter = useSelector((state) => state.products.Filters);

  

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
    useEffect(() => {dispatch(getByFilter(filtered))
    dispatch(setFilters(filtered))
    }, [filtered,dispatch])

  return (
    <section>
      <Filters>
        <form className="form">
        <select name='brand' onChange={handleChange} >
          <option  label="Brand"></option>
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
                name='color'
                label={item}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
          <select name='type' onChange={handleChange} >
          <option label="type"></option>
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

  select{
    border: 1px black solid;
    margin: 10px;
    padding: 5px;
    width: 100%;
    color: whitesmoke;
    border:none;
    background-color: rgb(128, 60, 60);
  }
 
  .contain {
    margin: 5px;
    padding: 3px 3px;
    border-bottom: 1px solid black;
  }
`;

export default Filter;
