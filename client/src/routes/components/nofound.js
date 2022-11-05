import styled from "styled-components"

const NoFound = () =>{
    return(
        <NoDiv>
            <h2>
            no se encontro nada mi ciela
            </h2>
            <img src={`https://images.unsplash.com/photo-1522008224169-e5992bed5fae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnJva2VuJTIwZ3VpdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80`} />
        </NoDiv>
    )
}

const NoDiv = styled.div`
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
display: flex;
flex-direction: column;

img{
    width: 250px;
}
`

export default NoFound