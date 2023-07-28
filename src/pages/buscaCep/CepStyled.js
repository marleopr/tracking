import { styled } from "styled-components";

export const CepCointainer = styled.div`
    display: flex;
    flex-direction: row;
    /* border: 1px solid black; */
    align-items: center;
    span{
        margin: 10px;
    }
`
export const HistoricCepDiv = styled.div`
     width: 100%;
     /* padding: 10px; */
     text-align: center; 
     margin-top: 20px;
     /* border: solid green; */
    span {
      &:hover{
        cursor: pointer;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      }
    }
    /* ul {
      border: solid red;
      overflow: auto;
    } */
`