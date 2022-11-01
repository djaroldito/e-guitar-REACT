import { useState } from "react"
import { useDispatch } from "react-redux"
import { getByName } from "../../Redux/productActions";
import "./SuggestionCard/SuggestionCard.css"
const SearchBar = () =>{
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(getByName(name));
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