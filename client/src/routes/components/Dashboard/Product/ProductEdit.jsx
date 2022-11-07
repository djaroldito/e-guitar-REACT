import React, { useEffect, useState } from "react"
import {
	Edit,
	SimpleForm,
	TextInput,
	SelectInput,
	BooleanInput,
	ImageInput,
	ImageField,
	useGetOne,
} from "react-admin"
// toolbar
import {
	Toolbar,
	ListButton,
	SaveButton,
	DeleteButton,
	TopToolbar,
	ShowButton,
} from "react-admin"
// validations
import { number, minValue, maxValue } from "react-admin"
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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete"

import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
	getTypes,
	getBrands,
	getColors,
} from "../../../../Redux/productActions"
// import Swal from "sweetalert2"

const ProductEdit = (props) => {
	const filter = createFilterOptions()
	const dispatch = useDispatch()
	const { id } = useParams()
	const { isLoading, data } = useGetOne("product", { id })

	const [typeField, setTypeField] = useState(isLoading ? null : data.type)
	const [brandField, setBrandField] = useState(isLoading ? null : data.brand)
	const { types, colors, brands } = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(getTypes())
		dispatch(getBrands())
		dispatch(getColors())
	}, []) //eslint-disable-line

	// GET VALUES FOR SELECTS
	const typeChoices = types.map((x) => {
		return { name: x }
	})
	const brandChoices = brands.map((x) => {
		return { name: x }
	})
	const colorChoices = colors.map((x) => {
		return { id: x, name: x }
	})

	// Validations
	const validateDescription = (values) => {
		const errors = {}
		if (!values.description) {
			errors.description = "The description is required"
		}
		return errors
	}
	const validateMin = [number(), minValue(0)]
	const validateStrings = [number(), minValue(6), maxValue(18)]

	// Toolbars
	const ToolbarActions = () => (
		<Toolbar>
			<div className='RaToolbar-defaultToolbar'>
				<DeleteButton />
				<SaveButton alwaysEnable />
			</div>
		</Toolbar>
	)
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

	// transform before submit
	const transform = (data) => ({
		...data,
		type: typeField.name ? typeField.name : data.type,
		brand: brandField.name ? brandField.name : data.brand,
	})

	if (isLoading) return null
	return (
		<>
			{isLoading ? (
				""
			) : (
				<Edit
					actions={<TopToolbarActions />}
					transform={transform}
					submitOnEnter={false}
					title='Edit Product'
					{...props}
				>
					<SimpleForm
						validate={validateDescription}
						toolbar={<ToolbarActions />}
					>
						<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
							<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
								<Autocomplete
									value={typeField}
									onChange={(e, newValue) => {
										if (typeof newValue === "string") {
											setTypeField({
												name: newValue,
											})
										} else if (newValue && newValue.inputValue) {
											// Create a new value from the user input
											setTypeField({
												name: newValue.inputValue,
											})
										} else {
											setTypeField(newValue)
										}
									}}
									filterOptions={(options, params) => {
										const filtered = filter(options, params)
										const { inputValue } = params
										// Suggest the creation of a new value
										const isExisting = options.some(
											(option) => inputValue === option.name
										)
										if (inputValue !== "" && !isExisting) {
											filtered.push({
												inputValue,
												name: `Add "${inputValue}"`,
											})
										}
										return filtered
									}}
									selectOnFocus
									clearOnBlur
									handleHomeEndKeys
									id='type'
									options={typeChoices}
									getOptionLabel={(option) => {
										// Value selected with enter, right from the input
										if (typeof option === "string") {
											return option
										}
										// Add "xxx" option created dynamically
										if (option.inputValue) {
											return option.inputValue
										}
										// Regular option
										return option.name
									}}
									freeSolo
									renderOption={(props, option) => (
										<li {...props}>{option.name}</li>
									)}
									renderInput={(params) => (
										<TextInput source='type' label='Type' {...params} />
									)}
									required
								/>
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
								<Autocomplete
									value={brandField}
									onChange={(e, newValue) => {
										if (typeof newValue === "string") {
											setBrandField({
												name: newValue,
											})
										} else if (newValue && newValue.inputValue) {
											// Create a new value from the user input
											setBrandField({
												name: newValue.inputValue,
											})
										} else {
											setBrandField(newValue)
										}
									}}
									filterOptions={(options, params) => {
										const filtered = filter(options, params)
										const { inputValue } = params
										// Suggest the creation of a new value
										const isExisting = options.some(
											(option) => inputValue === option.name
										)
										if (inputValue !== "" && !isExisting) {
											filtered.push({
												inputValue,
												name: `Add "${inputValue}"`,
											})
										}
										return filtered
									}}
									selectOnFocus
									clearOnBlur
									handleHomeEndKeys
									id='brand'
									options={brandChoices}
									getOptionLabel={(option) => {
										// Value selected with enter, right from the input
										if (typeof option === "string") {
											return option
										}
										// Add "xxx" option created dynamically
										if (option.inputValue) {
											return option.inputValue
										}
										// Regular option
										return option.name
									}}
									freeSolo
									renderOption={(props, option) => (
										<li {...props}>{option.name}</li>
									)}
									renderInput={(params) => (
										<TextInput {...params} source='brand' label='Brand' />
									)}
									required
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
									required
									sx={{ width: 150 }}
									validate={validateMin}
								/>
							</Box>
							<Box flex={1} mr={{ xs: 0, sm: "0.3em" }}>
								<TextInput
									source='discount'
									label='Discount %'
									sx={{ width: 100 }}
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
								<SelectInput
									sx={{ width: 300 }}
									source='color'
									optionLabel='name'
									choices={colorChoices}
									required
								/>
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
									labelPlacement='top'
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
				</Edit>
			)}
		</>
	)
}

export default ProductEdit
