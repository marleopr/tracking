import { styled } from "styled-components";

export const CepCointainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    span{
        margin: 10px;
    }
`
export const HistoricCepDiv = styled.div`
     width: 100%;
     text-align: center; 
     margin-top: 20px;
    span {
      &:hover{
        cursor: pointer;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      }
    }

`