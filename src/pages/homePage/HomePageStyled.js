import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

export const TrackCointainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    span{
        margin: 5px;
    }
`

export const ButtonTrack = styled.div`
    cursor: pointer;

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
