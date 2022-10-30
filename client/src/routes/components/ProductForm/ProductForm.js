import React, { useRef, useState, useEffect } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BiPhotoAlbum } from "react-icons/bi"
// redux
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
	getById,
	postProductForm,
	editProductForm,
} from "../../../Redux/productActions"
import { clearDetail } from "../../../Redux/productSlice"
import { PreviewImage } from "./PreviewImage"

export default function ProductForm() {
	const { id } = useParams()
	const dispatch = useDispatch()

	const { colors, brands, types, detail } = useSelector(
		(state) => state.products
	)
	const fileRef = useRef()

	useEffect(() => {
		if (id) {
			dispatch(getById(id))
			setProductImages(detail.img.split(","))
		} else {
			setProductImages([])
		}
		return () => {
			dispatch(clearDetail())
			setProductImages([])
		}
	}, [id, dispatch]) // eslint-disable-line

    const initialValues = {
        id: detail.id || "",
		brand: detail.brand || "",
		model: detail.model || "",
		img: detail.img || "",
		color: detail.color || "",
		price: detail.price || 0,
		strings: detail.strings || 0,
		description: detail.description || "",
		stock: detail.stock || 0,
		discount: detail.discount || 0,
		type: detail.type || "",
		leftHand: detail.leftHand || false,
		aditionalInformation: detail.aditionalInformation || "",
		images: [],
	}

	const [productImages, setProductImages] = useState([])

	const handleDeleteImage = (file) => {
		setProductImages(productImages.filter((f) => f !== file))
	}

	return (
		<div>
			<h3>Product Detail</h3>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				validate={(values) => {
					const errors = {}
					const requiredFields = [
						"type",
						"brand",
						"model",
						"color",
						"price",
						"strings",
						"description",
					]
					requiredFields.map((f) => {
						if (!values[f]) errors[f] = "Required"
						return true
					})
					return errors
				}}
				onSubmit={async (values, { setSubmitting, setStatus }) => {
					//try {
					// upload images
					if (productImages.length) {
						const imgArray = await Promise.all(
							productImages.map(async (file) => {
								if (typeof file === "string") {
									// original path
									return file
								} else {
									// file to update
									const formData = new FormData()
									formData.append("file", file)
									formData.append("upload_preset", "kym7uarq")
									const res = await axios.post(
										`https://api.cloudinary.com/v1_1/dnzbhrg86/image/upload`,
										formData
									)
									return res.data.url
								}
							})
						)
						values.img = imgArray.join(",")
					}
					// // post new product
					const response = id ? await dispatch(editProductForm(values)) : await dispatch(postProductForm(values))

					if (response.error) {
						console.error("response", response.error)
						setStatus(response.error)
						setSubmitting(false)
					}
				}}
			>
				{({ isSubmitting, status }) => (
					<Form>
						{!!status && <p>{status}</p>}
						<div>
							<label htmlFor='type'>Type:</label>
							<Field as='select' name='type'>
								<option value=''>Select type</option>
								{types &&
									types.map((x) => (
										<option key={x} value={x}>
											{x}
										</option>
									))}
							</Field>
							<ErrorMessage name='type' component='div' />
						</div>
						<div>
							<label htmlFor='brand'>Brand:</label>
							<Field as='select' name='brand'>
								<option value=''>Select a brand</option>
								{brands &&
									brands.map((x) => (
										<option key={x} value={x}>
											{x}
										</option>
									))}
							</Field>
							<ErrorMessage name='brand' component='div' />
						</div>
						<div>
							<label htmlFor='model'>Model:</label>
							<Field type='text' name='model' />
							<ErrorMessage name='model' component='div' />
						</div>
						<div>
							<label htmlFor='color'>Color:</label>
							<Field as='select' name='color'>
								<option value=''>Select a color</option>
								{colors &&
									colors.map((x) => (
										<option key={x} value={x}>
											{x}
										</option>
									))}
							</Field>
							<ErrorMessage name='color' component='div' />
						</div>
						<div>
							<label htmlFor='price'>Price: $</label>
							<Field type='float' min='0' name='price' />
							<ErrorMessage name='price' component='div' />
						</div>
						<div>
							<label htmlFor='strings'>Strings:</label>
							<Field type='number' min='0' name='strings' />
							<ErrorMessage name='strings' component='div' />
						</div>
						<div>
							<Field type='checkbox' name='leftHand' />
							<label htmlFor='model'>Left-hand</label>
						</div>
						<div>
							<label htmlFor='stock'>Stock:</label>
							<Field type='number' min='0' name='stock' />
							<ErrorMessage name='stock' component='div' />
						</div>
						<div>
							<label htmlFor='discount'>
								Discount:
								<Field type='number' min='0' name='discount' /> %{" "}
							</label>
							<ErrorMessage name='discount' component='div' />
						</div>
						<div>
							<label htmlFor='description'>Description:</label>
							<Field as='textarea' name='description' />
							<ErrorMessage name='description' component='div' />
						</div>
						<div>
							<label htmlFor='aditionalInformation'>
								Additional Information:
							</label>
							<Field as='textarea' name='aditionalInformation' />
							<ErrorMessage name='aditionalInformation' component='div' />
						</div>
						<div>
							<input
								type='file'
								ref={fileRef}
								hidden
								onChange={(e) => {
									// setProductImages(productImages.push(e.target.files[0]))
									setProductImages([...productImages, e.target.files[0]])
								}}
							/>
						</div>
						<div>
							{/* Render Images */}
							{productImages.length > 0 &&
								productImages.map((f, i) => (
									<PreviewImage
										file={f}
										key={i}
										handleDelete={() => handleDeleteImage(f)}
									/>
								))}
						</div>
						<button
							type='button'
							onClick={() => fileRef.current.click()}
							disabled={productImages.length >= 3}
						>
							<BiPhotoAlbum /> Upload Image
						</button>
						<button type='submit' disabled={isSubmitting}>
							Create
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
