import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByName } from "../../Redux/productActions";
import { setCurrentPage } from "../../Redux/productSlice";
import "./SuggestionCard/SuggestionCard.css"
const SearchBar = () =>{
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { currentPage} = useSelector((state) => state.products.currentPage);
    const handleChange = (e) => {
        setName(e.target.value);
        dispatch(setCurrentPage(1))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(getByName(name,currentPage));
    }

    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder="Search..." onChange={(e) => handleChange(e)}  style={{padding:"14px 16px", width: "90%"} }/>
            </form>
        </div>
    )
}

export default SearchBar