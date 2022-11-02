import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
    const {user, isAuthenticated} = useAuth0()

    return (
        isAuthenticated && (
            <div>
                {user.picture} ? <img src={user.picture} alt={user?.name} />
                <h2>{user?.name}</h2>
                <p>Email: {user.email}</p> 
                <p>{JSON.stringify(user)}</p>
                
            </div>
        )
    )
}