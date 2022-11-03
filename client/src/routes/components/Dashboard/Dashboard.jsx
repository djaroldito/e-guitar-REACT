import React from "react"
import NavBar from "./AdminNavBar"
import ProductList from "./ProductList"

export default function Dashboard() {

    return (
		<>
			<NavBar />
			<h3>Dashboard</h3>
			<ProductList />
		</>
	)
}
