import React from "react"
import {
	Edit,
	SimpleForm,
	TextInput,
	//	SelectInput,
	BooleanInput,
	ImageInput,
	ImageField,
	//	SelectArrayInput,
	// validation
	email,
	// toolbar
	ListButton,
	TopToolbar,
	//
	useGetOne,
} from "react-admin"

import { Box } from "@mui/material"
import { FaChevronLeft } from "react-icons/fa"

import { useParams } from "react-router-dom"

const UserEdit = (props) => {
	const { id } = useParams()
	const { isLoading } = useGetOne("user", { id })

	const validateEmail = [email()]

	// Toolbars
	const TopToolbarActions = ({ basePath }) => (
		<TopToolbar>
			<ListButton basepath={basePath} label='Cancel' icon={<FaChevronLeft />} />
		</TopToolbar>
	)

	const PreviewImage = ({ record, source }) => {
		if (typeof record == "string") {
			record = {
				[source]: record,
			}
			console.log(record)
		}
		return <ImageField record={record} source={source} />
	}

	if (isLoading) return null
	return (
		<Edit
			actions={<TopToolbarActions />}
			submitOnEnter={false}
            title='Edit User Data'
            mutationMode='optimistic'
			{...props}
		>
			<SimpleForm>
				<Box
					display={{ xs: "block", sm: "flex", width: "100%" }}
					sx={{ flexDirection: "row" }}
				>
					<Box
						display={{ xs: "block", sm: "flex", width: "80%" }}
						sx={{ flexDirection: "column" }}
					>
						<Box
							display={{ xs: "block", sm: "flex", width: "100%" }}
							sx={{ flexDirection: "row" }}
						>
							<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                                <TextInput
                                    required
									source='email'
									validate={validateEmail}
									sx={{ width: "100%" }}
								/>
							</Box>

							<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
								<TextInput source='fullname' sx={{ width: "100%" }} required />
							</Box>
						</Box>
						<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
							<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
								<BooleanInput
									source='isActive'
									label='Active'
									labelplacement='top'
								/>
							</Box>

							<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
								<BooleanInput
									source='isAdmin'
									label='Admin'
									labelplacement='top'
								/>
							</Box>
						</Box>
						<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
							<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
								<TextInput source='phone' fullWidth={true} />
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
								<TextInput source='address' fullWidth={true} />
							</Box>
						</Box>
						<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
							<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
								<TextInput source='province' fullWidth={true} />
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
								<TextInput source='city' fullWidth={true} />
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
								<TextInput source='zipcode' fullWidth={true} />
							</Box>
						</Box>
					</Box>

					<Box display={{ xs: "block", sm: "flex", width: "20%" }}>
						<ImageInput
							sx={{
								width: "100%",
								"& .RaFileInput-dropZone": { fontSize: "12px" },
							}}
							source='avatar'
							label='Avatar:'
							accept='image/png, image/jpg, image/jpeg, image/webp'
						>
							<PreviewImage source='src' />
						</ImageInput>
					</Box>
				</Box>
			</SimpleForm>
		</Edit>
	)
}

export default UserEdit
