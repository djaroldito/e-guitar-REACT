import React from "react"
import {
	List,
	Datagrid,
	TextField,
    DateField,
    BooleanField,
    useRecordContext,
	DeleteButton,
} from "react-admin"

export const DiscountField = (props) => {
	const record = useRecordContext(props)
	return record ? (
		<span style={{ fontSize: "12px" }}>{record.discount} %</span>
	) : null
}
DiscountField.defaultProps = {
	textAlign: "right",
}

const CuponList = (props) => {

	return (
		<List title='List of Discount Coupons' {...props}>
			<Datagrid bulkActionButtons={false}>
                <TextField source='code' label='Code' sx={{ fontSize: "12px" }} />
                <DiscountField source='discount' />
                <TextField source='user.email' label='User' sx={{ fontSize: "12px" }} />
                <DateField source='createdAt' label='Created' sx={{ fontSize: "12px" }} />
                <BooleanField label='Used' source='isUsed' sx={{ fontSize: "12px" }} />
                <DeleteButton basepath='/coupon' sx={{ fontSize: "12px" }} />
			</Datagrid>
		</List>
	)
}

export default CuponList
