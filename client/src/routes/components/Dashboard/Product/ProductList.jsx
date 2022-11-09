import React from "react"
import {
	List,
	Datagrid,
	TextField,
	DateField,
	EditButton,
	DeleteButton,
	TextInput,
} from "react-admin"

const ProductList = (props) => {
	const filters = [
		<TextInput label='Type' source='type' />,
		<TextInput label='Brand' source='brand' />,
	]

	return (

			<List title='List of Products' filters={filters} {...props}>
				<Datagrid>
					<TextField source='id' sx={{ fontSize: "12px" }} />
					<TextField source='type' sx={{ fontSize: "12px" }} />
					<TextField source='brand' sx={{ fontSize: "12px" }} />
					<TextField source='model' sx={{ fontSize: "12px" }} />
					<TextField source='color' sx={{ fontSize: "12px" }} />
					<TextField source='price' title='Price $' sx={{ fontSize: "12px" }} />
					<TextField source='discount' sx={{ fontSize: "12px" }} />
					<TextField source='stock' sx={{ fontSize: "12px" }} />
					<EditButton basepath='/product' sx={{ fontSize: "12px" }} />
					<DeleteButton basepath='/product' sx={{ fontSize: "12px" }} />
				</Datagrid>
                </List>
	)
}

export default ProductList
