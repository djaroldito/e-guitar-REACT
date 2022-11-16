import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getUserId } from '../../Redux/SignupActions';
import "./Styles/Profile.css"
import axios from 'axios';
import Swal from "sweetalert2";

const Profile = () =>{
    const dispatch = useDispatch()    
    const idUser = sessionStorage.getItem("userId")
    console.log(idUser)
        
    useEffect(() => {
        dispatch(getUserId(idUser))/* 
         user = axios.get(`/ruser/${idUser}`) */
    },[idUser,dispatch])

    const user = useSelector(state => state.signup.userId);
    const [errors, setErrors] = useState({});

    let FaltanDatos;
    if(user.address && user.province && user.city && user.zipcode && user.phone){
      FaltanDatos = true;
    }

    //formulario para que el user cargue sus datos
    const [userComplete, setUser] = useState({
        fullname: "",
        address: "",
        province: "",
        city: "",
        zipcode: "",
        phone:"",
        id: idUser,
      });

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({
          ...userComplete,
          [name]: value
        });
        setErrors(validate({
          ...user,
          [e.target.name]: e.target.value
        }));
      };

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

      async function handleSubmit(e){
        e.preventDefault();
        const { data } = await axios.get("/ruser/email", {
          params: {
            email: user.email
          }})
          console.log(userComplete);

          if(data){
            await axios.put("/ruser/dataUser", userComplete);
            Swal.fire("Data updated successfully");
          }
      }
      
    return(
      <div className='profileBox'>
      <div className='profileContainer'>
        {user.hasOwnProperty("id") ? (
          <div>
            <div className='profileImg'>
              <img className='profileProf' src={user?.avatar.src} alt={user?.fullname} />
            </div>

            <div className='profileInfo'>
              <h2>{user?.fullname}</h2>
              

              <div className='profileText'>
                <label>User:</label>
                <p>{user?.fullname}</p>
              </div>

              <div className='profileText'>
                <label>Adress:</label>
                <p>{user?.address}</p>
              </div>

              <div className='profileText'>
                <label>Province:</label>
                <p>{user?.province}</p>
              </div>

              <div className='profileText'>
                <label>City:</label>
                <p>{user?.city}</p>
              </div>

              <div className='profileText'>
                <label>Zip code:</label>
                <p>{user?.zipcode}</p>
              </div>

              <div className='profileText'>
                <label>Phone:</label>
                <p>{user?.phone}</p>
              </div>
            </div>
          </div>
        ) : (
          "no tiene user"
        )}
      </div>
      { !FaltanDatos ?
        <div className='profileForm'>
        <form onSubmit={handleSubmit}>

          <div className="style">
            <div className='profileInputBox'>
              <input
                type="text"
                name="fullname"
                onChange={handleChange}
                placeholder="Enter name and surname"
                required
              />
              {errors.fullname && <p className='profileError'>{errors.fullname}</p>}
            </div>

            <div className='profileInputBox'>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                placeholder="Enter address"
                required
              />
              {errors.address && <p className='profileError'>{errors.address}</p>}
            </div>

            <div className='profileInputBox'>
              <input
                type="text"
                name="province"
                onChange={handleChange}
                placeholder="Enter province"
                required
              />
              {errors.province && <p className='profileError'>{errors.province}</p>}
            </div>

            <div className='profileInputBox'>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
              {errors.city && <p className='profileError'>{errors.city}</p>}
            </div>

            <div className='profileInputBox'>
              <input
                type="text"
                name="zipcode"
                onChange={handleChange}
                placeholder="Enter zipcode"
                required
              />
              {errors.zipcode && <p className='profileError'>{errors.zipcode}</p>}
            </div>

            <div className='profileInputBox'>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                placeholder="Enter phone"
                required
              />
              {errors.phone && <p className='profileError'>{errors.phone}</p>}
            </div>
          </div>

          <button className='profileBtn'>Send</button>

        </form>
      </div>
    : ""}
    </div>
    )
}

export default Profile