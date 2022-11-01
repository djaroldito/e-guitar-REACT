import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./ProductForm.css";

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
		<div className="prdImg">
				<>
					<img
						src={preview}
						alt='Preview'
						width='200px'
						height='200px'
						onError={(e) => {
							e.target.onerror = null
							e.target.src = "/assets/imagenotfound.png"  // some replacement image
						}}
					/>
					<FaTimes
						style={{ position: "absolute", zIndex: "1", cursor: "pointer" }}
						onClick={handleDelete}
					/>
				</>
		</div>
	)
}
