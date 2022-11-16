import styled from 'styled-components'
import { useRef } from 'react'
import { useEffect } from 'react'
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'

const Slideshow = ({children, controles = true}) => {
    const slideshow = useRef(null)
    const slideInterval = useRef(null)

    const next = () => {
        if (slideshow.current && slideshow.current.children.length > 0) {
            const firstElement = slideshow.current.children[0];
            slideshow.current.style.transition = `500ms ease-out all`;
            const widthSlide = slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform = `translateX(-${widthSlide}px)`

            const slideTransition = () => {
                slideshow.current.style.transition = `none`;
                slideshow.current.style.transform = `translateX(0)`;
                slideshow.current.appendChild(firstElement)

                slideshow.current.removeEventListener('transitionend', slideTransition)
            }

            slideshow.current.addEventListener('transitionend', slideTransition)
        }
    }

    const prev = () => {
        if (slideshow.current.children.length > 0) {
            const index = slideshow.current.children.length - 1;
            const lastElement = slideshow.current.children[index];
            slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);

            slideshow.current.style.transition = 'none';
            
            const widthSlide = slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform = `translateX(-${widthSlide}px)`

            setTimeout(() => {
                slideshow.current.style.transition = '500ms ease-out all';
                slideshow.current.style.transform = 'translateX(0)'
                
            }, 30);
            
        }
    }

    useEffect(() => {
        slideInterval.current = setInterval(() => { next()}, 5500);
        slideshow.current.addEventListener('mouseenter', () => {
            clearInterval(slideInterval.current);
        });
        slideshow.current.addEventListener('mouseleave', () => {
            slideInterval.current = setInterval(() => {next()}, 5500);

    });}, []);

    return (
        <PrincipalContainer>
            <SlideshowContainer ref={slideshow} >
              {children}
            </SlideshowContainer>
            {controles && <Controles >
                <Boton onClick={prev}>
                    <AiOutlineLeft />
                </Boton>
                <Boton derecho onClick={next}>
                    <AiOutlineRight />
                </Boton>
            </Controles>}
        </PrincipalContainer>
    )
}

const PrincipalContainer = styled.div`
position: relative;
box-shadow: 5px;
overflow: hidden;
background: rgb(29, 29, 29);
`
const SlideshowContainer = styled.div`
display: flex;
flex-wrap: nowrap;
text-align: center;
`
const Slide = styled.div`
min-width: 100%;
transition: .3s ease all;
z-index: 10;
position: relative;
outline: none;
img {
    width: 100%;
    vertical-align: top;
    object-fit: fill;
}
`

const TextoSlide = styled.div`
width: 80%;
padding: 10px 40px;
position: relative;
text-align: center;
bottom: 0;
margin: auto;
margin-bottom: 10px;
`
const Controles = styled.div`
    position: absolute;
    z-index: 20;
    width: 100%;
    top:0;
    height: 100%;
    pointer-events: none;
    background: none;
`
const Boton = styled.button`
pointer-events: all;
background: none;
border: none;
cursor: pointer;
outline: none;
width: 50px;
height: 100%;
text-align: center;
position: absolute;
transition: 0.3s ease all;
border: none;
&:hover {
    background: rgba(0,0,0,.2);
    path{
        fill: #fff;
    }
}
path{
    filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'}
}
${props => props.derecho ? 'right: 0' : 'left: 0'} 
`;

export default Slideshow
export {Slide, TextoSlide}