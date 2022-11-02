import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByFilter } from "../../Redux/productActions"
import { setFilters, setCurrentPage } from "../../Redux/productSlice"
import "./SuggestionCard/SuggestionCard.css"
import { AiOutlineSearch } from "react-icons/ai"
import styled from "styled-components"

const SearchBar = () => {
	const dispatch = useDispatch()
	const { Filters: filter, currentPage } = useSelector(
		(state) => state.products
	)
	const [isActive, setIsActive] = useState(false)

    const Filters = {
            color: '',
            type: '',
            brand: '',
            fullName: ''
    }

	const handleChange = (e) => {
		dispatch(setFilters({ ...filter, fullName: e.target.value }))
		dispatch(setCurrentPage(1))
	}
    const handleClick = () => {
        if (isActive && filter.fullName)
            dispatch(setFilters({ Filters }))
		setIsActive((current) => !current)
	}
	useEffect(() => {
        if (filter.fullName) {
            setIsActive(true)
        }
    }, [filter])

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(getByFilter(filter, currentPage))
	}

	return (
		<Search>
			<div
				style={
					isActive
						? { display: "block", width: "30%" }
						: { display: "none", width: "30%" }
				}
			>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						value={filter.fullName}
						name='fullName'
						type='text'
						placeholder='Search...'
						onChange={(e) => handleChange(e)}
						style={{ padding: "14px 16px", width: "90%" }}
					/>
				</form>
			</div>
			<button onClick={handleClick}>
				<AiOutlineSearch />
			</button>
		</Search>
	)
}

const Search = styled.div`
	padding: 14px 16px;
	display: flex;
	justify-content: center;
	button {
		background-color: transparent;
		border: none;
		font-size: 30px;
	}
`

export default SearchBar
