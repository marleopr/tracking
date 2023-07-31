import styled from 'styled-components';

export const Main = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    width: 100%;
`
export const Logo = styled.img`
    /* display: inline-block;  */
    margin: 10px; 
    width: 50px;
    height: 20px;
    &:hover {
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);    
    }
`