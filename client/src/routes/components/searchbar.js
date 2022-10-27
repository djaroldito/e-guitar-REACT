import { useState } from "react"
import SuggestionCard from "./SuggestionCard/SuggestionCard"
import { useSelector } from "react-redux"
import "./SuggestionCard/SuggestionCard.css"
const SearchBar = ({handler}) =>{
    const [Search, setSearch] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const products = useSelector(state => state.products.products);
    
    const handleChange = (e) => {
        filter(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handler(Search);
    }
    const handleClick = () => {
        setIsSelected(current => !current)
    }
    
    const filter = (searched) => {
        var result = products.filter(r => {
            const name = r.brand.toString().toLowerCase() + ' ' + r.model.toString().toLowerCase();
            console.log(name);
            if(name.includes(searched.toLowerCase()))
            return r;
        })
        if(searched == ''){
            setSearch([]);
        }else{
                setSearch(result);
            }
        }
    

    
    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder="Search..." onChange={(e) => handleChange(e)} onFocus={handleClick} onBlur={handleClick} style={{padding:"14px 16px", width: "90%"} }/> 
            </form>
            <div className="SContainer">                
                {isSelected && Search?.slice(0, 3).map(r => {
                    return(
                        <SuggestionCard 
                            id={r.id}
                            model={r.model}
                            brand={r.brand}
                            price={r.price}
                            img={r.img}
                        />
                    )
                }) 
            }
            </div>
        </div>
    )
}

export default SearchBar