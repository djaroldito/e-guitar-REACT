import { fetchUtils } from "react-admin"
import { stringify } from "query-string"
import axios from "axios"

const apiUrl = "http://localhost:3001/admin"
const httpClient = fetchUtils.fetchJson

const dataProvider = {
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

	// getMany: (resource, params) => {
	//     const query = {
	//         filter: JSON.stringify({ id: params.ids }),
	//     };
	//     const url = `${apiUrl}/${resource}?${stringify(query)}`;
	//     return httpClient(url).then(({ json }) => ({ data: json }));
	// },

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
						return res.data.url
					} else {
						return item.src
					}
				})
			)
			imgTxt = imgArray.join(",")
			params.data.img = imgTxt
        }
        if (params.data.color) {
            params.data.color = params.data.color.join(',')
        }
		return httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: "PUT",
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }))
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
						return res.data.url
					} else {
						return item.src
					}
				})
			)
			imgTxt = imgArray.join(",")
			params.data.img = imgTxt
        }
        if (params.data.color) {
            params.data.color = params.data.color.join(',')
        }
        return httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
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

export default dataProvider
