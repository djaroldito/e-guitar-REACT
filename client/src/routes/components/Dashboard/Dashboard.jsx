import { Admin, Resource, defaultTheme, Title } from "react-admin"
import { NavLink } from "react-router-dom"
import dataProvider from "./dataProvider"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { deepPurple, indigo } from "@mui/material/colors"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Chart from "./Chart"

// Products
import ProductList from "./Product/ProductList"
import ProductCreate from "./Product/ProductCreate"
import ProductEdit from "./Product/ProductEdit"
// Users
import UserList from "./User/UserList"
import UserEdit from "./User/UserEdit"
// Orders
import OrderList from "./Order/OrderList"
import OrderEdit from "./Order/OrderEdit"
// Reviews
import ReviewList from "./Review/ReviewList"
// Coupons
import CouponList from "./Coupon/CouponList"
import CouponEdit from "./Coupon/CouponEdit"
import CouponCreate from "./Coupon/CouponCreate"

export default function Dashboard() {
	const theme = {
		...defaultTheme,
		palette: {
			primary: indigo,
			secondary: deepPurple,
			tonalOffset: 0.4,
		},
	}

	return (
		<>
			<Admin
				theme={theme}
				dashboard={AdminDashboard}
				title='Admin Dashboard'
				basename='/dashboard'
				dataProvider={dataProvider}
				disableTelemetry
			>
				<Resource
					name='product'
					list={ProductList}
					create={ProductCreate}
					edit={ProductEdit}
				/>
				<Resource name='user' list={UserList} edit={UserEdit} />
				<Resource name='order' list={OrderList} edit={OrderEdit} />
				<Resource
					name='coupon'
					list={CouponList}
					create={CouponCreate}
					edit={CouponEdit}
				/>
				<Resource
					name='review'
					list={ReviewList}
					// edit={UserEdit}
				/>
			</Admin>
		</>
	)
}

const AdminDashboard = () => (
	<Card>
		<Title title={"{GUITAR CODE}"} />
		<CardContent sx={{ textAlign: "center" }}>
			<h2>Welcome to Admin Dashboard</h2>

            <h3 style={{ textAlign:'left'}} >Orders Incomings </h3>
			<Chart />

			<Stack
				direction='row'
				sx={{ marginTop: "20px" }}
				justifyContent='center'
				alignItems='center'
			>
				<Button variant='contained' href='/home'>
					Back to Shop
				</Button>
			</Stack>
		</CardContent>
	</Card>
)
