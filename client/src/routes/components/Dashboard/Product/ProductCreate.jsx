import React, { useEffect,useState } from "react"
import {
	Create,
	SimpleForm,
	TextInput,
	SelectInput,
	BooleanInput,
	ImageInput,
	ImageField,
	SelectArrayInput,
	// validation
	number,
	minValue,
    maxValue,
    required,
	// toolbar
	ListButton,
	TopToolbar,
    ShowButton,
} from "react-admin"

import {
	RichTextInput,
	RichTextInputToolbar,
	LevelSelect,
	FormatButtons,
	ListButtons,
	LinkButtons,
	ClearButtons,
} from "ra-input-rich-text"
import { Box } from "@mui/material"
import { FaChevronLeft } from "react-icons/fa"

import { useDispatch, useSelector } from "react-redux"
import {
	getTypes,
	getBrands,
	getColors,
} from "../../../../Redux/productActions"

const ProductCreate = (props) => {
    const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTypes())
		dispatch(getBrands())
		dispatch(getColors())
	}, []) //eslint-disable-line

    const { types, colors, brands } = useSelector((state) => state.products)

	// VALUES FOR SELECTS
    const [typeChoices, setTypeChoices] = useState( types.map(x => ({ id:x, name: x }) ) )
    const [typeValue, setTypeValue] = useState(null )
    const [brandChoices, setBrandChoices] = useState( brands.map(x => ({ id:x, name: x }) ) )
    const [brandValue, setBrandValue] = useState(null )

	const colorChoices = colors.map((value) => ({ id: value, name: value }))

	const validateMin = [number(), minValue(0)]
	const validateStrings = [number(), minValue(6), maxValue(18)]
	const validateDescription =[required()]

	// Toolbars
	const TopToolbarActions = ({ basePath }) => (
		<TopToolbar>
			<ListButton basepath={basePath} label='Cancel' icon={<FaChevronLeft />} />
			<ShowButton label='Preview' />
		</TopToolbar>
	)

	const PreviewImage = ({ record, source }) => {
		if (typeof record == "string") {
			record = {
				[source]: record,
			}
		}
		return <ImageField record={record} source={source} />
	}
	return (
		<>
            <Create
                actions={<TopToolbarActions />}
				submitOnEnter={false}
				title='Create New Product'
				{...props}
			>
				<SimpleForm>
					<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
						<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                            <SelectInput
								source='type'
                                choices={typeChoices}
                                value={typeValue}
                                optionText="name"
                                sx={{ width: '100%' }}
                                onChange={(e)=>{
                                    if (typeof e === "string") {
											setTypeValue({ id: e, name: e })
										}
                                }}
                                onCreate={() => {
                                    const newName = prompt("Enter a new type")
                                    const newType = { id: newName, name: newName }
                                    setTypeChoices([...typeChoices,newType])
                                    return newType
								}}
							/>

						</Box>
						<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
							<SelectInput
								source='brand'
                                choices={brandChoices}
                                value={brandValue}
                                sx={{ width: '100%' }}
                                optionText="name"
                                onChange={(e)=>{
                                    if (typeof e === "string") {
											setBrandValue({ id: e, name: e })
										}
                                }}
                                onCreate={() => {
                                    const newName = prompt("Enter a new brand")
                                    const newBrand = { id: newName, name: newName }
                                    setBrandChoices([...brandChoices,newBrand])
                                    return newBrand
								}}
							/>
						</Box>
						<Box flex={1}>
							<TextInput source='model' sx={{ width: "100%" }} required />
						</Box>
					</Box>
					<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
						<Box flex={1} mr={{ xs: 0, sm: "0.3em" }}>
							<TextInput
                                source='price'
                                label='Price $'
								required
								sx={{ width: 150 }}
								validate={validateMin}
							/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: "0.3em" }}>
							<TextInput
								source='discount'
								label='Discount %'
								sx={{ width: 150 }}
								validate={validateMin}
							/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: "0.3em" }}>
							<TextInput
								source='stock'
								required
								sx={{ width: 100 }}
								validate={validateMin}
							/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
							<SelectArrayInput source='color' choices={colorChoices} />
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: "0.3em" }}>
							<TextInput
								source='strings'
								required
								sx={{ width: 100 }}
								validate={validateStrings}
							/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: "0.3em" }}>
							<BooleanInput
								source='leftHand'
								label='Left-Hand'
								labelplacement='top'
							/>
						</Box>
					</Box>
					<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
						<Box flex={1} mr={{ xs: 0, sm: "0.9em" }}>
							<RichTextInput
								toolbar={
									<RichTextInputToolbar>
										<LevelSelect />
										<FormatButtons />
										<ListButtons />
										<LinkButtons />
										<ClearButtons />
									</RichTextInputToolbar>
								}
								source='description'
								label='DESCRIPTION:'
								validate={validateDescription}
							/>
						</Box>
						<Box flex={1} mr={{ xs: 0, sm: "0.3em" }}>
							<RichTextInput
								toolbar={
									<RichTextInputToolbar>
										<LevelSelect />
										<FormatButtons />
										<ListButtons />
										<LinkButtons />
										<ClearButtons />
									</RichTextInputToolbar>
								}
								source='aditionalInformation'
								label='Aditional Information:'
							/>
						</Box>
					</Box>
					<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
						<ImageInput
							sx={{ "& .RaFileInput-dropZone": { fontSize: "12px" } }}
							source='img'
							label='PHOTO GALLERY:'
							accept='image/png, image/jpg, image/jpeg'
							multiple
						>
							<PreviewImage source='src' />
						</ImageInput>
					</Box>
				</SimpleForm>
			</Create>
		</>
	)
}



export default ProductCreate
