import React, { useRef, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BiPhotoAlbum } from "react-icons/bi"
// redux
import { useDispatch, useSelector } from "react-redux"
import { postProductForm } from "../../Redux/productActions"
import axios from "axios"

export default function ProductForm() {
	const dispatch = useDispatch()

	const { colors, brands, types } = useSelector((state) => state.products)
	const fileRef = useRef()

	const initialValues = {
		brand: "",
		model: "",
		img: "",
		color: "",
		price: 0,
		strings: 0,
		description: "",
		stock: 0,
		discount: 0,
		type: "",
		leftHand: false,
		aditionalInformation: "",
		files: [],
	}

	return (
		<div className="productContainer">
			<h3>Create new product</h3>
			<Formik
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
					try {
						// upload images
						const { files } = values
						files.length &&
							files.map((file) => {
								const formData = new FormData()
								formData.append("file", file)
								formData.append("upload_preset", "kym7uarq")
								axios
									.post(
										`https://api.cloudinary.com/v1_1/dnzbhrg86/image/upload`,
										formData
									)
									.then(
										(res) =>
											(values.img = values.img.concat(
												", ",
												res.data.secure_url
											))
                                )
                                return true
							})
						// post new product
						const response = await dispatch(postProductForm(values))
						if (response.error) {
							setStatus(response.error)
							setSubmitting(false)
						}
					} catch (error) {
						setStatus(error.message)
						setSubmitting(false)
						console.error("upload_cloudinary", error.message)
					}
				}}
			>
				{({ values, isSubmitting, status, setFieldValue }) => (
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
							<Field type='number' step='0.1' min='0' name='price' />
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
							<label htmlFor='discount'>Discount:
							<Field type='number' min='0' name='discount' />  % </label>
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
									setFieldValue("files", values.files.concat(e.target.files[0]))
								}}
							/>
                        </div>
                        <div>
						{values.files.length > 0 &&
							values.files.map((f, i) => {
								return <PreviewImage file={f} key={i} />
							})}
                        </div>
						<button
							type='button'
							onClick={() => fileRef.current.click()}
							disabled={values.files.length >= 3}
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

export const PreviewImage = ({ file }) => {
	const [preview, setPreview] = useState(null)
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => {
		setPreview(reader.result)
	}

	return (
		<div style={{display:'inline-block'}}>
			{preview ? (
				<img src={preview} alt='Preview' width='200px' height='200px' />
			) : (
				"loading..."
			)}
		</div>
	)
}
