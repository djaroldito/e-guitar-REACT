import axios from 'axios'
import { useEffect } from 'react'
import { getUserId } from '../../Redux/SignupActions'
import {useDispatch, useSelector} from 'react-redux'


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
    
    return(
        <div>
        <h2>{user.fullname}</h2>
       <img src={user.avatar.src} alt={user.fullname}/>
        <p>{user.address}</p>
        <p>{user.province}</p>
        <p>{user.city}</p>
        <p>{user.zipcode}</p>
        <p>{user.phone}</p> 
        </div>
    )
}

export default Profile