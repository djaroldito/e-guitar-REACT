import React from "react"
import NavBar from "./NavBar"
import ProductList from "./ProductList"

export default function Dashboard() {
    // verificar logueo para renderizar login
	return (
		<>
			<NavBar />
			<h3>Dashboard</h3>
			<ProductList />
		</>
	)
}
