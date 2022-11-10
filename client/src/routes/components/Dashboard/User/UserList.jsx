import React from "react"
import {
	List,
	Datagrid,
	TextField,
	BooleanField,
	DateField,
	EditButton,
	DeleteButton,
	TextInput,
	BooleanInput,
	ImageField,
} from "react-admin"

const UserList = (props) => {
	const filters = [
		<TextInput label='Fullname' source='fullname' />,
		<TextInput label='Email' source='email' />,
		<BooleanInput label='Active' source='active' defaultValue={true} />,
		<BooleanInput label='Admin' source='admin' defaultValue={true} />,
	]

	return (
		<List title='List of Users' filters={filters} {...props}>
			<Datagrid bulkActionButtons={false}>
				{/* <TextField source='id' sx={{ fontSize: "12px" }} /> */}
				<TextField source='email' sx={{ fontSize: "12px" }} />
				<TextField source='fullname' sx={{ fontSize: "12px" }} />
                <ImageField source='avatar' defaultValue='' sx={{"& .RaImageField-image": { width: "40px", height:"40px" }}} />
				<BooleanField label='Active' source='isActive' sx={{ fontSize: "12px" }} />
				<BooleanField label='Admin' source='isAdmin' sx={{ fontSize: "12px" }} />
				<DateField source='createdAt' sx={{ fontSize: "12px" }} />
                <EditButton basepath='/user' sx={{ fontSize: "12px" }} />
                <DeleteButton basepath='/user' sx={{ fontSize: "12px" }} />
			</Datagrid>
		</List>
	)
}

export default UserList
