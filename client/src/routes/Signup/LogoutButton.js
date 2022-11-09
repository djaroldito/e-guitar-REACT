import React from "react"
import { GoogleLogout } from "react-google-login"
import { useNavigate } from "react-router-dom"
import { BiLogOut } from "react-icons/bi"

export const LogoutButton = () => {
	const navigate = useNavigate()

	const onSuccess = () => {
		sessionStorage.removeItem("UserData")
		sessionStorage.removeItem("emailGoogle")
		localStorage.removeItem("carrito")
		sessionStorage.removeItem("userId")
		sessionStorage.removeItem("imageURL")
		console.log("Log out successFull!")
		navigate("/login", { state: { sessionStorage, localStorage } })
	}

	return (
		<div id='signOutButton'>
			<GoogleLogout
				clientId='1071381556347-p8k8tg37ss2e9ag86088tvdds19dot5o.apps.googleusercontent.com'
				buttonText={"Logout"}
				onLogoutSuccess={onSuccess}
				render={(renderProps) => (
					<BiLogOut style={{ cursor: 'pointer' }} title="LogOut" onClick={renderProps.onClick} disabled={renderProps.disabled}/>
				)}
			/>
		</div>
	)
}
