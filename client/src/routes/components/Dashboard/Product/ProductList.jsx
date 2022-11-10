import React from "react"
import {
	List,
	Datagrid,
	ImageField,
	TextField,
	NumberField,
	TextInput,
	EditButton,
	DeleteWithConfirmButton,
	Button,
	useRecordContext,
} from "react-admin"
import { Done, Clear, RestartAlt } from "@mui/icons-material"

export const SoftDeleteField = (props) => {
	const record = useRecordContext(props)
	return <span>{record.deletedAt ? <Clear /> : <Done />}</span>
}
export const CustomActions = (props) => {
	const handleRestore = () => {
		alert("Restore the product")
	}
	const record = useRecordContext(props)
	if (record.deletedAt) {
		return (
			<Button onClick={handleRestore} color='primary'>
				<RestartAlt sx={{ marginRight: "5px" }} /> Restore{" "}
			</Button>
		)
	} else {
		return (
			<div style={{ display: "inline-flex" }}>
				<EditButton label='' basepath='/product' sx={{ fontSize: "12px" }} />
				<DeleteWithConfirmButton
					label=''
					basepath='/product'
					sx={{ fontSize: "12px" }}
				/>
			</div>
		)
	}
}

export const ColorField = (props) => {
	const record = useRecordContext(props)
	return record ? <span>{record.color?.join(" | ")}</span> : null
}
export const DiscountField = (props) => {
	const record = useRecordContext(props)
	return record ? (
		<span style={{ fontSize: "12px" }}>{record.discount} %</span>
	) : null
}
DiscountField.defaultProps = {
	textAlign: "right",
}

const ProductList = (props) => {
	const filters = [
		<TextInput label='Type' source='type' />,
		<TextInput label='Brand' source='brand' />,
	]
	return (
		<List title='List of Products' filters={filters} {...props}>
			<Datagrid bulkActionButtons={false}>
				<ImageField
					source='img'
					label={false}
					sx={{ "& .RaImageField-image": { width: "40px", height: "40px" } }}
				/>
				<TextField source='type' sx={{ fontSize: "12px" }} />
				<TextField source='brand' sx={{ fontSize: "12px" }} />
				<TextField source='model' sx={{ fontSize: "12px" }} />
				<ColorField source='color' sx={{ fontSize: "12px" }} />
				<NumberField
					source='price'
					options={{
						maximumFractionDigits: 2,
						style: "currency",
						currency: "USD",
					}}
					locales='es-ES'
					sx={{ fontSize: "12px" }}
				/>
				<DiscountField source='discount' />
				<NumberField source='stock' sx={{ fontSize: "12px" }} />
				<SoftDeleteField label='Active' />
				<CustomActions />
			</Datagrid>
		</List>
	)
}

export default ProductList
