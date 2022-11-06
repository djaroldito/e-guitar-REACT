import "./Validation.css";
import {validation} from "../../../Redux/productActions";

const Payment = () => {

   return(
        <div className="cardError">
            <div>
                <i>X</i>
            </div>
                <h1>Error</h1> 
                <p>Something went wrong;<br/> Please Try Againg</p>
        </div>
    )

}

export default Payment;