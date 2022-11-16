import { fetchUtils } from "react-admin"
import { stringify } from "query-string"
import axios from "axios"

const backUrl = process.env.REACT_APP_API || "http://localhost:3001"
const apiUrl = `${backUrl}/admin`
const httpClient = fetchUtils.fetchJson

const dataProvider = {
	getRestore: (resource, params) => {
		return httpClient(`${apiUrl}/${resource}/restore/${params.id}`, {
			method: "POST",
		}).then(({ json }) => ({ data: json }))
	},
	getSummarize: (resource, params) => {
		return httpClient(`${apiUrl}/${resource}/summarize`, {
			method: "GET",
		}).then(({ json }) => ({ data: json }))
	},
	getChartData: (resource, params) => {
		return httpClient(`${apiUrl}/${resource}/chartData`, {
			method: "GET",
		}).then(({ json }) => ({ data: json }))
	},
	getList: (resource, params) => {
		const { page, perPage } = params.pagination
		const { field, order } = params.sort

		const query = {
			sort: JSON.stringify([field, order]),
			// range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			range: JSON.stringify([page, perPage]),
			filter: JSON.stringify(params.filter),
		}
		const url = `${apiUrl}/${resource}?${stringify(query)}`

		return httpClient(url).then(({ headers, json }) => ({
			data: json.data,
			total: json.total,
		}))
	},

	getOne: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
			data: json,
		})),

	getMany: (resource, params) => {
		const query = {
			ids: JSON.stringify(params.ids),
		}
		const url = `${apiUrl}/${resource}/many?${stringify(query)}`
		return httpClient(url).then(({ json }) => ({ data: json }))
	},

	// getManyReference: (resource, params) => {
	//     const { page, perPage } = params.pagination;
	//     const { field, order } = params.sort;
	//     const query = {
	//         sort: JSON.stringify([field, order]),
	//         range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
	//         filter: JSON.stringify({
	//             ...params.filter,
	//             [params.target]: params.id,
	//         }),
	//     };
	//     const url = `${apiUrl}/${resource}?${stringify(query)}`;

	//     return httpClient(url).then(({ headers, json }) => ({
	//         data: json,
	//         total: parseInt(headers.get('content-range').split('/').pop(), 10),
	//     }));
	// },

    update: async (resource, params) => {
        console.log(params.data.avatar)
		if (resource === "product") {
			params = await manageProducts(params)
		}
		if (resource === "user" && params.data.avatar) {
			if ( params.data.avatar.hasOwnProperty('rawFile') ) {
				const file = params.data.avatar
				const formData = new FormData()
				formData.append("file", file.rawFile)
				formData.append("upload_preset", "kym7uarq")
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/dnzbhrg86/image/upload`,
					formData
				)
				params.data.avatar = res.data.secure_url
            } else {
                params.data.avatar = params.data.avatar.src
            }
		}
		return httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: "PUT",
			body: JSON.stringify(params.data),
		})
			.then(({ json }) => ({ data: json }))
			.catch((error) => {
				if (error.status === 409) error.message = "The CODE already exists!"
				return Promise.reject(error) // rethrow it
			})
	},

	// updateMany: (resource, params) => {
	//     const query = {
	//         filter: JSON.stringify({ id: params.ids}),
	//     };
	//     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
	//         method: 'PUT',
	//         body: JSON.stringify(params.data),
	//     }).then(({ json }) => ({ data: json }));
	// },

	create: async (resource, params) => {
		if (resource === "product") {
			params = await manageProducts(params)
		}
		return httpClient(`${apiUrl}/${resource}`, {
			method: "POST",
			body: JSON.stringify(params.data),
		})
			.then(({ json }) => ({
				data: { ...params.data, id: json.id },
			}))
			.catch((error) => {
				if (error.status === 409) error.message = "The CODE already exists!"
				return Promise.reject(error) // rethrow it
			})
	},

	delete: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: "DELETE",
		}).then(({ json }) => ({ data: json })),

	// deleteMany: (resource, params) => {
	//     const query = {
	//         filter: JSON.stringify({ id: params.ids}),
	//     };
	//     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
	//         method: 'DELETE',
	//     }).then(({ json }) => ({ data: json }));
	// }
}

const manageProducts = async (params) => {
	let imgTxt = ""
	if (params.data.img) {
		const imgArray = await Promise.all(
			params.data.img.map(async (item) => {
				if (item.hasOwnProperty("rawFile")) {
					// file to update
					const formData = new FormData()
					formData.append("file", item.rawFile)
					formData.append("upload_preset", "kym7uarq")
					const res = await axios.post(
						`https://api.cloudinary.com/v1_1/dnzbhrg86/image/upload`,
						formData
					)
					return res.data.secure_url
				} else {
					return item.src
				}
			})
		)
		imgTxt = imgArray.join(",")
		params.data.img = imgTxt
	}
	if (params.data.color) {
		params.data.color = params.data.color.join(", ")
	}
	return params
}

export default dataProvider
