import React from "react"
import {
	Edit,
	SimpleForm,
	TextInput,
	DateInput,
	//	SelectInput,
	ImageField,
	ArrayInput,
	//fields
	ReferenceField,
	SimpleFormIterator,
	// toolbar
	ListButton,
	TopToolbar,
	//
	useGetOne,
	useRecordContext,
	SelectInput,
} from "react-admin"

import { Box } from "@mui/material"
import { FaChevronLeft } from "react-icons/fa"
import Chip from "@mui/material/Chip"
import Badge from "@mui/material/Badge"

import { useParams } from "react-router-dom"

export const ProductField = (props) => {
	const record = useRecordContext(props)
	return record ? (
		<TextInput
			source={`${record.brand} ${record.model} - ${record.type}`}
			disabled
			sx={{ width: "40%" }}
			variant='outlined'
		/>
	) : null
}
export const PriceField = (props) => {
    const record = useRecordContext(props)
    if (record.discount > 0) {
        const newPrice = record.price * (1 - record.discount/100 )
        record.price = newPrice.toFixed(2)
    }
	return record ? (
        <TextInput
            source='price'
			sx={{ width: 120 }}
			disabled
			variant='outlined'
		/>
	) : null
}

export const CouponField = (props) => {
	const record = useRecordContext(props)
	return record.code ? (
		<Badge badgeContent={`${record.discount}%`} color='warning'>
			<Chip size='medium' color='default' label={`${record.code}`} />
		</Badge>
	) : null
}

const OrderEdit = (props) => {
	const { id } = useParams()
	const { data, isLoading } = useGetOne("order", { id })

	const status = [
		{ id: "PAYMENT COMPLETED", name: "PAYMENT COMPLETED" },
		{ id: "AWAITING PAYMENT", name: "AWAITING PAYMENT" },
		{ id: "CLOSED", name: "CLOSED" },
		{ id: "CANCELED", name: "CANCELED" },
	]
	const delivery = [
		{ id: "PENDING", name: "PENDING" },
		{ id: "DELIVERED", name: "DELIVERED" },
		{ id: "CANCELED", name: "CANCELED" },
	]
	// Toolbars
	const TopToolbarActions = ({ basePath }) => (
		<TopToolbar>
			<ListButton basepath={basePath} label='Cancel' icon={<FaChevronLeft />} />
		</TopToolbar>
	)

	if (isLoading) return null
    // var discount = ''
	// if (data) {
	// 	 discount = data.discount
	// }

	return (
		<Edit
			actions={<TopToolbarActions />}
			submitOnEnter={false}
			title='Edit Order Data'
			mutationMode='pessimistic'
			{...props}
		>
			<SimpleForm>
				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source='id'
							disabled
							variant='outlined'
							label='Order ID'
						/>
					</Box>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<DateInput
							source='createdAt'
							disabled
							variant='outlined'
							label='Created'
						/>
					</Box>
					<Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
						<ReferenceField source='userId' link={false} reference='user'>
							<TextInput fullWidth source='email' disabled variant='outlined' />
						</ReferenceField>
					</Box>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<TextInput
							source='total'
							disabled
							variant='outlined'
							label='Total US$'
						/>
					</Box>
				</Box>

				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<SelectInput
							source='orderStatus'
							optionText='name'
							choices={status}
							variant='outlined'
						/>
					</Box>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<SelectInput
							source='deliveryStatus'
							optionText='name'
							choices={delivery}
							variant='outlined'
						/>
					</Box>
					<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
						<CouponField />
					</Box>
				</Box>

				<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
					<ArrayInput source='orderDetails' label={false}>
						<SimpleFormIterator
							fullWidth
							disableAdd
							disableRemove
							disableReordering
							inline
						>
							<ReferenceField
								source='productId'
								link={false}
								reference='product'
							>
								<>
									<ImageField
										source='img'
										label={false}
										sx={{
											"& .RaImageField-image": {
												width: "40px",
												height: "40px",
											},
										}}
									/>
									<ProductField />
								</>
							</ReferenceField>
							<TextInput
								source='color'
								sx={{ width: 130 }}
								disabled
								variant='outlined'
							/>
							<TextInput
								source='quantity'
								sx={{ width: 100 }}
								disabled
								variant='outlined'
							/>
							<ReferenceField
								source='productId'
								link={false}
								reference='product'
							>
								<PriceField/>
							</ReferenceField>
						</SimpleFormIterator>
					</ArrayInput>
				</Box>
			</SimpleForm>
		</Edit>
	)
}

export default OrderEdit
