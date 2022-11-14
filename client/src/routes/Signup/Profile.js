import axios from "axios";
import { useEffect } from "react";
import { getUserId } from "../../Redux/SignupActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const Profile = () => {
  const dispatch = useDispatch();
  const idUser = sessionStorage.getItem("userId");
  console.log(idUser);

  useEffect(() => {
    dispatch(getUserId(idUser)); /* 
         user = axios.get(`/ruser/${idUser}`) */
  }, [idUser, dispatch]);

  const user = useSelector((state) => state.signup.userId);
  const [errors, setErrors] = useState({});

  let FaltanDatos;
  if(user.address && user.province && user.city && user.zipcode && user.phone){
    FaltanDatos = true;
  }

  console.log(user);

  //formulario para que el user cargue sus datos
  const [userComplete, setUser] = useState({
    fullname: "",
    address: "",
    province: "",
    city: "",
    zipcode: "",
    phone: "",
    id: idUser,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...userComplete,
      [name]: value,
    });
    setErrors(validate({
        ...user,
        [e.target.name]: e.target.value
      }));
  }

  
  function validate(user) {
    let errors = {};

    if (!userComplete.fullname.trim()) {
      errors.fullname = 'Username is required';
    };
    if (!userComplete.address) {
      errors.address = 'Address is required';
    };

    if (!userComplete.province) {
      errors.province = 'Province is required';
    } 
    if (!userComplete.city) {
      errors.city = 'City is required';
    }
    if(!userComplete.zipcode){
        errors.zipcode = 'Zipcode is required';
    } 
    if(!userComplete.phone){
        errors.phone = 'Phone is required';
    }

    return errors;
  }
  
    
  
  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await axios.get("/ruser/email", {
      params: {
        email: user.email,
      },
    });
    console.log(userComplete);

    if (data) {
        
      await axios.put("/ruser/dataUser", userComplete);
      Swal.fire("Data updated successfully");
    } 
    
  }

  return (
    <div>
      <div>
        {user.hasOwnProperty("id") ? (
          <div>
            <h2>Nombre completo: {user?.fullname}</h2>
            <img src={user?.avatar.src} alt={user?.fullname} />
            <p>{user?.address}</p>
            <p>{user?.province}</p>
            <p>{user?.city}</p>
            <p>{user?.zipcode}</p>
            <p>{user?.phone}</p>
          </div>
        ) : (
          "no tiene user"
        )}
      </div>
      { !FaltanDatos ?
        <ColumDiv>
        <form onSubmit={handleSubmit}>
          <div className="style">
            <label>Fullname: </label>
            <input
              type="text"
              name="fullname"
              onChange={handleChange}
              placeholder="Enter name and surname"
              required
            />
            {errors.fullname && <p>{errors.fullname}</p>}
            <label>Address: </label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
            {errors.address && <p>{errors.address}</p>}
            <label>Province: </label>
            <input
              type="text"
              name="province"
              onChange={handleChange}
              placeholder="Enter province"
              required
            />
            {errors.province && <p>{errors.province}</p>}
          </div>
          <div className="style">
            <label>City: </label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
            {errors.city && <p>{errors.city}</p>}
            <label>Zipcode: </label>
            <input
              type="text"
              name="zipcode"
              onChange={handleChange}
              placeholder="Enter zipcode"
              required
            />
            {errors.zipcode && <p>{errors.zipcode}</p>}
            <label>Phone: </label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder="Enter phone"
              required
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
          <button>Send</button>
        </form>
      </ColumDiv>
    : ""}
    </div>
  );
};

const ColumDiv = styled.div`
  text-align: left;
  display: flex;


  form {
    display: flex;
    flex-direction: row;
    width: 80%;
    flex-wrap: wrap;
  }

  .style {
    display: flex;
    flex-direction: column;
    width: 40%;
  }
`;

export default Profile;
