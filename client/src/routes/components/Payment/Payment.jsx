import "./Validation.css";
import {validation} from "../../../Redux/productActions";

const Payment = () => {

   return(
        <div className="card">
            <div>
                <i>✓</i>
            </div>
                <h1>Success</h1> 
                <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
        </div>
    )

}

export default Payment;