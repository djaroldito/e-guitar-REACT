import { Admin, Resource } from "react-admin"
import dataProvider from './dataProvider'

import ProductList from './Product/ProductList'
import ProductCreate from './Product/ProductCreate'
import ProductEdit from './Product/ProductEdit'

export default function Dashboard() {

	return (
		<>
			<Admin title='Admin Dashboard' basename='/dashboard' dataProvider={ dataProvider }>
                <Resource name='product' list={ProductList} create={ProductCreate} edit={ProductEdit} />
			</Admin>
		</>
	)
}
