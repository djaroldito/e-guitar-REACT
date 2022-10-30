import { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"

export const PreviewImage = ({ file, handleDelete }) => {
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
		<div style={{ display: "inline-block", position: "relative" }}>
			{preview ? (
				<>
					<img src={preview} alt='Preview' width='200px' height='200px' />
					<FaTimes
						style={{ position: "absolute", zIndex: "1", cursor: "pointer" }}
						onClick={handleDelete}
					/>
				</>
			) : (
				"loading..."
			)}
		</div>
	)
}