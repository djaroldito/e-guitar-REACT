import styled from 'styled-components'
import {FaCcPaypal, FaShippingFast} from 'react-icons/fa' 
import {RiSecurePaymentFill} from 'react-icons/ri'
import {BsTelephoneForward} from 'react-icons/bs'
import {BiMailSend} from 'react-icons/bi'
import {TfiLocationPin} from 'react-icons/tfi'




const Footer = () =>{
return(
    <footer>
         <ConDiv>
            <ColumDiv>
            <h4>SOPORT</h4>
            <p>Frequent questions</p>
            <p>Refund policies</p>
            <p>Changes policies</p>
            </ColumDiv>
            <ColumDiv>
            <h4>SERVICES</h4>
            <p><FaShippingFast/> FREE Shipping</p>
            <p><FaCcPaypal/> Payment By Paypal</p>
            <p><RiSecurePaymentFill/> Protected Purchase</p>
            </ColumDiv>
            <ColumDiv>
            <h4>CONTACT</h4>
            <a href='#'><BsTelephoneForward/> +54 1122332233</a>
            <a href='#'><BiMailSend/> samplemain@emain.com</a>
            <a href='#'><TfiLocationPin/> Evergreen Terrace 742, Springfield</a>
            </ColumDiv>
         </ConDiv>
            <CopyDiv>All rights reserved © Guitar Commers, 2022.</CopyDiv>
    </footer>
)
}

const ConDiv = styled.div`
max-width: 100%;
color: whitesmoke;
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: row;
`
/* margin-top: 50px; (va en la línea 46)*/
const ColumDiv = styled.div`
width: 33%;
text-align: left;
display: flex;
flex-direction: column;
margin-top: 50px;
border-left: 1px solid white;
border-right: 1px solid white;
align-content: center;
h4, p, a{
   margin-left: 20px;
   color: whitesmoke;
   text-decoration: none;
}
a{
   margin-top: 10px;
   margin-bottom: 25px;
}
h4{
   margin-bottom: 40px;
}
`
const CopyDiv = styled.div`
margin-left: auto;
margin-right: auto;
color: whitesmoke;
margin-top: 25px;
padding: 20px;
`

export default Footer