import { Admin, Resource, defaultTheme, Title } from "react-admin"
import dataProvider from "./dataProvider"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

import { deepPurple, indigo, } from "@mui/material/colors"

import ProductList from "./Product/ProductList"
import ProductCreate from "./Product/ProductCreate"
import ProductEdit from "./Product/ProductEdit"

import UserList from "./User/UserList"
import UserEdit from "./User/UserEdit"

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
				<Resource
					name='user'
					list={UserList}
                    edit={UserEdit}
				/>
			</Admin>
		</>
	)
}

const AdminDashboard = () => (
	<Card>
		<Title title={"{GUITAR CODE}"} />
		<CardContent> Wellcome to Admin Dashboard</CardContent>
	</Card>
)
