import React from "react"
import {
	List,
	Datagrid,
	TextField,
	DateField,
	TextInput,
	useRecordContext,
	DeleteButton,
} from "react-admin"
import Rating from "@mui/material/Rating"

export const ProductField = (props) => {
	const record = useRecordContext(props)
	return (
		<span>{`${record.product.brand} ${record.product.model} (${record.product.type})`}</span>
	)
}
export const StarsField = (props) => {
	const record = useRecordContext(props)
	return (
		<Rating
			readOnly={true}
			name='stars'
			defaultValue={record.stars}
			size='small'
		/>
	)
}

const ReviewList = (props) => {
	const filters = [<TextInput label='Search' source='q' alwaysOn />]
	return (
		<List title='List of Reviews' filters={filters} {...props}>
			<Datagrid bulkActionButtons={false}>
				<ProductField
					sortBy='product.brand'
					label='Product'
					sx={{ fontSize: "12px" }}
				/>
				<StarsField sortBy='stars' label='Stars' />
				<TextField source='user.email' sx={{ fontSize: "12px" }} />
				<TextField
					source='message'
					sortable={false}
					sx={{ fontSize: "12px" }}
				/>
				<DateField source='createdAt' label='Date' sx={{ fontSize: "12px" }} />
				<DeleteButton basepath='/review' sx={{ fontSize: "12px" }} />
			</Datagrid>
		</List>
	)
}

export default ReviewList
