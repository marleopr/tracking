import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

export const TrackCointainer = styled.div`
    display: flex;
    flex-direction: row;
    /* border: 1px solid black; */
    align-items: center;
    span{
        margin: 10px;
    }
`

export const ButtonTrack = styled.div`
    cursor: pointer;

`
export const HistoricDiv = styled.div`
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
export const StyledTrashIcon = styled(FaTrash)`
  margin-left: 5px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: red; 
  }
  &:active {
    color: #930000;
  }
`
