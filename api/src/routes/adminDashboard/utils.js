const getPagination = (page, size) => {
	let nPage = page - 1
	const limit = size ? +size : 4
	const offset = nPage ? nPage * limit : 0

	return { limit, offset }
}
const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: itemList } = data
	const currentPage = page ? +page : 1
	const pageCount = Math.ceil(totalItems / limit)

	return { itemList, pageCount, currentPage, totalItems }
}

const updateOrCreate = async (model, where, newItem) => {
	try {
		// First try to find the record
		const foundItem = await model.findOne({ where })
		if (!foundItem) {
			// Item not found, create a new one
			const item = await model.create({ newItem })
			return { data: item, created: true }
		}
		// Found an item, update it
		await model.update(newItem, { where })
		return { data: foundItem, created: false }
	} catch (error) {
		console.error(error)
		return { error: error.message }
	}
}

// const processImagesToCloudinary = async (data) => {
// 	try {
// 		const imgArray = await Promise.all(
// 			productImages.map(async (item) => {
// 				if (item.src) {
// 					// original path
// 					return item.src
// 				} else {
// 					// file to update
// 					const formData = new FormData()
// 					formData.append("file", file)
// 					formData.append("upload_preset", "kym7uarq")
// 					const res = await axios.post(
// 						`https://api.cloudinary.com/v1_1/dnzbhrg86/image/upload`,
// 						formData
// 					)
// 					return res.data.url
// 				}
// 			})
// 		)
// 		return imgArray.join(",")
// 	} catch (error) {
// 		console.error(error)
// 		return { error: error.message }
// 	}
// }

module.exports = { getPagination, getPagingData, updateOrCreate }
