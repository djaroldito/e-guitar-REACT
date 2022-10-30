import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BiPhotoAlbum } from "react-icons/bi";
// redux
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, postProductForm } from "../../Redux/productActions";
import "./ProductForm/ProductForm.css";

export default function ProductForm() {
	const { id } = useParams()
	const isAddMode = !id
	const dispatch = useDispatch()

	const { colors, brands, types, detail } = useSelector(
		(state) => state.products
	)
	const fileRef = useRef()

	useEffect(() => {
        if (id) {
            console.log(id)
            dispatch(getById(id))
		}
	}, [id, dispatch])

	const initialValues = isAddMode
		? {
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
				images: [],
		  }
		: { ...detail, images: detail.img ? detail.img.split(",") : [] }

	return (
		<>
		<div className="prdHeader"> {/* HEADER ---------------------------------------------- */}
			<h2>Create Product</h2>
		</div>

		<div className="prdFormContiner">			
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
						<div className="prdGrid">
						{!!status && <p>{status}</p>}
						<div className="prdFeatures"> {/* FEATURES ---------------- */}

						<div className="prdFormType"> {/* Type & LHand ------------ */}
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

							<Field type='checkbox' name='leftHand' />
							<label htmlFor='model'>Left-hand</label>
						</div>

						<div className="prdFormBrand"> {/*Brand-------------------  */}
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
						<div className="prdFormModel"> {/* Model ------------------ */}
							<label htmlFor='model'>Model:</label>
							<Field type='text' name='model' />
							<ErrorMessage name='model' component='div' />
						</div>
						<div className="prdColor"> {/* Color ---------------------- */}
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
						<div className="prdStrings"> {/* Strings ------------------ */}
							<label htmlFor='strings'>Strings:</label>
							<Field type='number' min='0' name='strings' />
							<ErrorMessage name='strings' component='div' />
						</div>
						<div className="prdImgload"> {/* Img load ------------------ */}
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
							{values.images.length}

							{/* {values.files.length > 0 &&
								values.files.map((f, i) => {
									return <PreviewImage file={f} key={i} />
                                })} */}
							{values.images.length > 0 &&
								values.images.map((f, i) => <PreviewImage file={f} key={i} />)}
						</div>
						<button /*  Button ------------------------------------------ */
							type='button'
							onClick={() => fileRef.current.click()}
							disabled={values.images.length >= 3}
							className="prdButton">
							<BiPhotoAlbum /> Upload Image
						</button>
						</div>
				{/* ----------------------------------------------------------------- */}
						
						<div className="prdValuation"> {/* VALUATION ------------- */}
						<div className="prdPrice"> {/* Price --------------------- */}
							<label htmlFor='price'>Price: $</label>
							<Field type='number' step='0.1' min='0' name='price' />
							<ErrorMessage name='price' component='div' />
						</div>

						<div className="prdDiscount"> {/* Discount ---------------- */}
							<label htmlFor='discount'>
								Discount:
								<Field type='number' min='0' name='discount' /> %{" "}
							</label>
							<ErrorMessage name='discount' component='div' />
						</div>

						<div className="prdStock"> {/* Stock -----------------------*/}
							<label htmlFor='stock'>Stock:</label>
							<Field type='number' min='0' name='stock' />
							<ErrorMessage name='stock' component='div' />
						</div>

						<div className="prdDescription"> {/* Description ----------- */}
							<label htmlFor='description'>Description:</label>
							<Field as='textarea' name='description' />
							<ErrorMessage name='description' component='div' />
						</div>

						<div className="prdAdInfo"> {/* Add Info ------------------- */}
							<label htmlFor='aditionalInformation'>
								Additional Information:
							</label>
							<Field as='textarea' name='aditionalInformation' />
							<ErrorMessage name='aditionalInformation' component='div' />
						</div>
						<button type='submit' disabled={isSubmitting} className="prdSubmit">
							Create
						</button>
						</div>
						</div>
					</Form>
				)}

			</Formik> {/* -------------------------------------------------------------------------- */}
		</div>
		</>
	)
}

export const PreviewImage = ({ file }) => {
	const [preview, setPreview] = useState("")

	useEffect(() => {
		if (typeof file === "string") {
			setPreview(file)
		} else {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				setPreview(reader.result)
			}
		}
	}, [file])

	return (
		<div style={{ display: "inline-block" }}>
			{preview ? (
				<img src={preview} alt='Preview' width='200px' height='200px' />
			) : (
				"loading..."
			)}
		</div>
	)
}
