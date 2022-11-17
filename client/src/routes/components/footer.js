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
            <h4>SUPPORT</h4>
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
max-width: 1200px;
color: whitesmoke;
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: row;
margin-top: 50px;
@media(max-width: 800px){
   flex-direction: column;
}
`
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
@media(max-width: 800px){
   margin-left: 0;
   width: 70%;
   text-align: center;
}
a{
   margin-top: 10px;
   margin-bottom: 25px;
}
h4{
   margin-bottom: 40px;
}
@media(max-width: 800px) {
   width: 100%;
   border-left: none;
   border-right: none
}
`
const CopyDiv = styled.div`
margin-left: auto;
margin-right: auto;
width: 500px;
color: whitesmoke;
margin-top: 25px;
@media(max-width: 800px){
   width: 80%;
}

`

export default Footer