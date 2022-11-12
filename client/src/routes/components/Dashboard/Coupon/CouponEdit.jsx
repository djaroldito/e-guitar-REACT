import {
	Edit,
	SimpleForm,
	TextInput,
	BooleanInput,
	// toolbar
	ListButton,
	TopToolbar,
	//
	useGetOne,
} from "react-admin"

import { Box } from "@mui/material"
import { FaChevronLeft } from "react-icons/fa"

import { useParams } from "react-router-dom"

const CouponEdit = (props) => {
	const { id } = useParams()
	const { isLoading } = useGetOne("coupon", { id })

	// Toolbars
	const TopToolbarActions = ({ basePath }) => (
		<TopToolbar>
			<ListButton basepath={basePath} label='Cancel' icon={<FaChevronLeft />} />
		</TopToolbar>
	)

	if (isLoading) return null
	return (
		<Edit
			actions={<TopToolbarActions />}
			submitOnEnter={false}
			title='Edit User Data'
			{...props}
		>
			<SimpleForm>
				<Box
					display={{ xs: "block", sm: "flex", width: "100%" }}
					sx={{ flexDirection: "row" }}
				>
					<Box
						display={{ xs: "block", sm: "flex", width: "100%" }}
						sx={{ flexDirection: "row" }}
					>
						<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
							<TextInput required source='code' sx={{ width: "150" }} />
						</Box>

						<Box flex={1} mr={{ xs: 0, sm: "0.8em" }}>
							<TextInput source='discount' sx={{ width: "150" }} required />
						</Box>

						<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
							<BooleanInput source='isUsed' label='Used' />
						</Box>
					</Box>
				</Box>
			</SimpleForm>
		</Edit>
	)
}

export default CouponEdit
