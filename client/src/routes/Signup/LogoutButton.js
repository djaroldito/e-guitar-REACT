import React from "react"
import { GoogleLogout } from "react-google-login"
import { useNavigate } from "react-router-dom"
import { BiLogOut } from "react-icons/bi"
import styled from "styled-components"

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
		<ContDiv id='signOutButton'>
			<GoogleLogout
				clientId="1071381556347-p8k8tg37ss2e9ag86088tvdds19dot5o.apps.googleusercontent.com"
				buttonText={"Logout"}
				onLogoutSuccess={onSuccess}
				render={(renderProps) => (
					<div className="cart" onClick={renderProps.onClick}>
					<BiLogOut style={{ cursor: 'pointer' }} title="LogOut" onClick={renderProps.onClick}  disabled={renderProps.disabled}/> <Span>Log Out</Span>
					</div>
				)}
			/>
		</ContDiv>
	)
}

const Span = styled.span`
@media (min-width: 900px) {
	display: none;
}
`

const ContDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
cursor: pointer;
font-size: 30px;
.cart{
	display: flex;
	align-items: center;
}
`