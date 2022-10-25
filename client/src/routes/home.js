import styled from "styled-components";
import {BsCart2} from 'react-icons/bs'
import {FaGuitar} from 'react-icons/fa'

const Home = () => {
  let arr = [ {
    id: "1",
    brand: "Femmto",
    model: "CG001-Azul",
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_607586-MLA50209395075_062022-F.webp",
    color: ["naranja", "natural"],
    price: 16.999,
    strings: 6,
    description: "Guitarra recomendada por la mayoría de los profesores para empezar a tocar! Una medida ESTANDAR puede utilizarse tanto para adultos como para chicos! Medidas: 12cm de alto x 96cm de largo x 44cm de ancho. Colores: Azul esfumado; Cedro esfumado naranja; Madera Natural Clarita; Negro Azabache. Incluye manual de instrucciones en español con clases para aprender a tocar. INCLUYE: Guitarra Criolla. Manual De Aprendizaje.",
    stock: "5",
    discount:"0%",
    type: "Criolla",
    AdditionalInformation: "FACTURAS: Realizamos A y B. Si necesitas factura para un CUIT específico, ingrésalo en tus datos de la cuenta antes de realizar la compra. SERVICIO TECNICO: Servicio técnico oficial propio para que tu garantía sea real y accedas a todos los repuestos originales y accesorios que necesites. "
},
{
    id: "2",
    brand: "Yamaha",
    model: "C40",
    img: "https://i.ibb.co/QJfqs4K/1.jpg",
    color: ["negro", "natural"],
    price: 52.830,
    strings: 6,
    description: "Con más de un siglo en la fabricación de instrumentos musicales, Yamaha es una marca que habla por sí sola. Al ser una referente mundial de la industria musical, su sello de calidad en guitarras es un diferencial asegurado para tus canciones.",
    stock: "5",
    discount:"0%",
    type: "Criolla",
    leftHand:false,
    AdditionalInformation: "Un modelo para cada guitarrista. La tapa de abeto genera un tono brillante y claro, incluso en los registros más agudos. "
},
];
  return (
    <main>
      <CardsCont>
        {arr.map((item) => (
          <DivCont key={item.id}>
             <img src={item.img} alt="" />
            <div className="text-cont">
           <h2>{item.brand}</h2>
              <h3>{item.model}</h3>
              <p>$ {item.price}</p>
              <button><FaGuitar/> Show Details</button>
              <button><BsCart2/> Add Cart</button>
            </div>
          </DivCont>
        ))}
      </CardsCont>
    </main>
  );
};

const DivCont = styled.div`
  width: 350px;
  height: 350px;
  border: 1px solid gray;
  background-color: white;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 30px;
  text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;

  h2,
  h3 {
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    text-align: left;
  }
  p {
    margin-left: 15px;
    text-align: left;
  }

  img {
    min-width: 100px;
    width: 200px;
    height: auto;
    max-height: 300px;
    object-fit: contain;
  }
  button{
    background: none;
    border: 1px solid black;
    padding: 10px 7px;
    margin-top: 7px;
    border-radius: 10px;
    width: 85%;
    cursor: pointer;
  }
`;
const CardsCont = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: 25px;
`;

export default Home;
