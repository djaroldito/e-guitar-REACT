import React, { useEffect, useState } from "react"
import {
	Create,
	Edit,
	SimpleForm,
	TextInput,
	SelectInput,
	ImageInput,
	ImageField,
    required,
useGetOne
} from "react-admin"

import { Box } from "@mui/material"
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete"

import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, getBrands } from "../../../../Redux/productActions"
// import Swal from "sweetalert2"

const ProductForm = (props) => {
    const filter = createFilterOptions()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { isLoading, data } = useGetOne("product", { id })

	const [typeField, setTypeField] = useState(data.type)
	const [brandField, setBrandField] = useState(data.brand)
	const { types, colors, brands } = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(getTypes())
		dispatch(getBrands())
	}, [dispatch])

	const typeChoices = types.map((x) => {
		return { name: x }
	})
	const brandChoices = brands.map((x) => {
		return { name: x }
    })
	const colorChoices = colors.map((x) => {
		return { id: x, name: x }
	})
    if (isLoading) return null
	return (
		<>
			{id ? (
				<Edit title='Edit Product' {...props}>
					<SimpleForm>
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
									renderOption={(props, option) => (
										<li {...props}>{option.name}</li>
									)}
                                    sx={{ width: 300 }}
									renderInput={(params) => (
										<TextInput {...params} source='type' label='Type' />
									)}
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
									renderOption={(props, option) => (
										<li {...props}>{option.name}</li>
									)}
									sx={{ width: 300 }}
									freeSolo
									renderInput={(params) => (
										<TextInput {...params} source='brand' label='Brand' />
									)}
								/>
							</Box>
                        </Box>
                        <TextInput source='price' />
					</SimpleForm>
				</Edit>
			) : (
				<Create title='Create new Product' {...props}>
					<Form types={typeChoices} {...props} />
				</Create>
			)}
		</>
	)
}

const Form = (props) => {
	return (
		<SimpleForm>
			<SelectInput source='type' choices={props.types} />
			<SelectInput source='brand' choices={props.types} />

			<span>holis</span>
			<SelectInput source='type' optionText='name' choices={props.types} />
			<TextInput source='price' />
			<TextInput source='strings' />
			<TextInput source='description' fullWidth='true' />
		</SimpleForm>
	)
}

export default ProductForm
