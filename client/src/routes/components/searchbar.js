import { useDispatch, useSelector } from "react-redux"
import { getByFilter } from "../../Redux/productActions"
import { setFilters, setCurrentPage } from "../../Redux/productSlice"
import "./SuggestionCard/SuggestionCard.css"
const SearchBar = () => {
	const dispatch = useDispatch()

	const { Filters:filter, currentPage } = useSelector((state) => state.products)

	const handleChange = (e) => {
		dispatch(setFilters({ ...filter, [e.target.name]: e.target.value }))
		dispatch(setCurrentPage(1))
	}

	const handleSubmit = (e) => {
        e.preventDefault()
		dispatch(getByFilter(filter, currentPage))
	}

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
                <input
                    name='fullName'
					type='text'
					placeholder='Search...'
					onChange={(e) => handleChange(e)}
					style={{ padding: "14px 16px", width: "90%" }}
				/>
			</form>
		</div>
	)
}

export default SearchBar
