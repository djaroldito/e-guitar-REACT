import { Admin, Resource } from "react-admin"
import dataProvider from './dataProvider'

import ProductList from './Product/ProductList'
import ProductForm from './Product/ProductForm'
import ProductEdit from './Product/ProductEdit'

export default function Dashboard() {

	return (
		<>
			<Admin title='Admin Dashboard' basename='/dashboard' dataProvider={ dataProvider }>
                <Resource name='product' list={ProductList} create={ProductForm} edit={ProductEdit} />
			</Admin>
		</>
	)
}
