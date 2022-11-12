import {
	Create,
	SimpleForm,
	TextInput,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    	// validation
	number,
	minValue,
    maxValue,
    required,
	// toolbar
	ListButton,
	TopToolbar,
} from "react-admin"

import { Box } from "@mui/material"
import { FaChevronLeft } from "react-icons/fa"

const CouponCreate = (props) => {
    const validateDiscount = [required(), number(), minValue(0), maxValue(100)]
	// Toolbars
	const TopToolbarActions = ({ basePath }) => (
		<TopToolbar>
			<ListButton basepath={basePath} label='Cancel' icon={<FaChevronLeft />} />
		</TopToolbar>
    )

	return (
		<Create
			actions={<TopToolbarActions />}
			submitOnEnter={false}
            title='Create New Coupon'
            redirect="list"
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
						<Box flex={1} mr={{ xs: 0, sm: "0.9em" }}>
                            <TextInput required source='code' fullWidth={true} inputProps={{style: {textTransform: 'uppercase'}}} />
						</Box>

						<Box flex={1} mr={{ xs: 0, sm: "0.9em" }}>
							<TextInput source='discount' fullWidth={true} validate={validateDiscount}/>
						</Box>
						<Box flex={2} mr={{ xs: 0, sm: "0.9em" }}>
                            <ReferenceInput source="userId" label='User' reference="user">
                                <SelectInput fullWidth={true} optionText="email" />
                            </ReferenceInput>
						</Box>

						<Box flex={1} sx={{ display:'flex', alignItems:'center',justifyContent :'center'}} >
							<BooleanInput source='isUsed' label='Used' />
						</Box>
					</Box>
				</Box>
			</SimpleForm>
		</Create>
	)
}

export default CouponCreate
