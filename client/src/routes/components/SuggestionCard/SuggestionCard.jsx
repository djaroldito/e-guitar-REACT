import { Link } from "react-router-dom";
import "./SuggestionCard.css";

const SuggestionCard = (data) => {
    return (
        <Link to={`/home/${data.id}`} className="Link">
            <div className="SCard">
                <h2>{data.brand} {data.model}</h2>
                <h4>${data.price}</h4>
                <img src={data.img} className="ImgContainer" alt=""/>
            </div>
        </Link>

    )

}


export default SuggestionCard;
