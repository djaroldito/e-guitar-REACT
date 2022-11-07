import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
// redux
import { useDispatch } from "react-redux"
import { loginAdminUser } from "../../../Redux/dashboardSlice"

export default function Login() {
	const dispatch = useDispatch()

	return (
		<div>
			<h1>Login to Dashboard!</h1>
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => {
					const errors = {}
					if (!values.email) {
						errors.email = "Required"
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = "Invalid email address"
					}
					return errors
				}}
				onSubmit={async ({ email, password }, { setSubmitting, setStatus }) => {
                    const response = await dispatch(loginAdminUser({ email, password }))
					if (response.error) {
						setStatus(response.error)
						setSubmitting(false)
					}
				}}
			>
				{({ isSubmitting, status }) => (
					<Form>
						{!!status && <p>{status}</p>}
						<Field type='email' name='email' />
						<ErrorMessage name='email' component='div' />
						<Field type='password' name='password' />
						<ErrorMessage name='password' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Login
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
