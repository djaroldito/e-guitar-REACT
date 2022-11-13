import axios from 'axios';
import { useEffect } from 'react'
import { getUserId } from '../../Redux/SignupActions'
import {useDispatch, useSelector} from 'react-redux'
import React, { useRef, useState } from 'react';

const Profile = () =>{
    const dispatch = useDispatch()    
    const idUser = sessionStorage.getItem("userId")
    console.log(idUser)
        
    useEffect(() => {
        dispatch(getUserId(idUser))/* 
         user = axios.get(`/ruser/${idUser}`) */
    },[idUser,dispatch])

    const user = useSelector(state => state.signup.userId)

    console.log(user)
    
    //formulario para que el user cargue sus datos
    const [userComplete, setUser] = useState({
        fullname: "",
        address: "",
        province: "",
        city: "",
        zipcode: "",
        phone:""
      });

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({
          ...userComplete,
          [name]: value
        });
       
      };

      async function handleSubmit(e){
        e.preventDefault();

        const { data } = await axios.get("/ruser/email", {
            params: {
              email: user.email
            }})

            if(data){
                axios.put("/dataUser")
            }

      }
      
    return(
        <div>
        <div>
        { user.hasOwnProperty("id") ?
        <div>
        <h2>Nombre completo: {user?.fullname}</h2>
       <img src={user?.avatar.src} alt={user?.fullname}/>
        <p>{user?.address}</p>
        <p>{user?.province}</p>
        <p>{user?.city}</p>
        <p>{user?.zipcode}</p>
        <p>{user?.phone}</p>
        </div> : "no tiene user" }
        </div>
        <div>
        <form onSubmit={handleSubmit}>
            <input type="text"
              name="fullname"
              onChange={handleChange}
              placeholder='Enter name and surname'
              required />
              <div className='supEM'>
              </div>
              <input type="text"
              name="Address"
              onChange={handleChange}
              placeholder='Enter address'
              required />
              <div className='supEM'>
              </div>
              <input type="text"
              name="Province"
              onChange={handleChange}
              placeholder='Enter province'
              required />
              <div className='supEM'>
              </div>
              <input type="text"
              name="city"
              onChange={handleChange}
              placeholder='Enter city'
              required />
              <div className='supEM'>
              </div>
             <input type="text"
              name="Zipcode"
              onChange={handleChange}
              placeholder='Enter zipcode'
              required />
              <div className='supEM'>
              <input type="text"
              name="Phone"
              onChange={handleChange}
              placeholder='Enter phone'
              required />
              <div className='supEM'>
              </div>
              </div>
              
          </form>
        </div>
        </div>
    )
}

export default Profile