import React, { useEffect, useState } from "react"
import {
	List,
	Datagrid,
	TextField,
	NumberField,
    DateField,
    TextInput,
	EditButton,
	DeleteButton,
	useDataProvider,
} from "react-admin"
import Summarize from "./Summarize"

const OrderList = (props) => {
	const dataProvider = useDataProvider()
	const [summarize, setSumarize] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()

	useEffect(() => {
		dataProvider
			.getSummarize("order")
			.then(({ data }) => {
				setSumarize(data)
				setLoading(false)
			})
			.catch((error) => {
				setError(error)
				setLoading(false)
			})
	}, []) // eslint-disable-line

	if (loading) return null
	if (error) return "error"
	if (!summarize) return null
	const filters = [<TextInput label='Search' source='q' alwaysOn />]
	return (
		<>
			<Summarize data={summarize} />
			<List title='List of Orders' filters={filters} {...props}>
				<Datagrid bulkActionButtons={false}>
					<TextField source='id' label='ID' sx={{ fontSize: "12px" }} />
					<DateField
						source='orderDate'
						label='Date'
						sx={{ fontSize: "12px" }}
					/>
					<TextField source='user.email' sx={{ fontSize: "12px" }} />
					<TextField
						source='orderStatus'
						label='Payment'
						sx={{ fontSize: "12px" }}
					/>
					<TextField
						source='deliveryStatus'
						label='Delivery'
						sx={{ fontSize: "12px" }}
					/>
					<NumberField
						source='total'
						options={{
							maximumFractionDigits: 2,
							style: "currency",
							currency: "USD",
						}}
						locales='es-ES'
						sx={{ fontSize: "12px" }}
					/>
					<EditButton basepath='/order' sx={{ fontSize: "12px" }} />
					<DeleteButton basepath='/order' sx={{ fontSize: "12px" }} />
				</Datagrid>
			</List>
		</>
	)
}

export default OrderList
