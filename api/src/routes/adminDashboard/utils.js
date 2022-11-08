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
		if (where) {
			// First try to find the record
            const foundItem = await model.findOne({ where })
			if (foundItem) {
				// Found an item, update it
				await model.update(newItem, { where })
				return { data: foundItem, created: false }
			}
        } else {
			// Item not found, create a new one
			const item = await model.create( newItem )
			return { data: item, created: true }
		}
	} catch (error) {
		console.error(error)
		return { error: error.message }
	}
}

module.exports = { getPagination, getPagingData, updateOrCreate }
