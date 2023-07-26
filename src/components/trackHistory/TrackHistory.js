import { styled } from "styled-components"
import { StyledTrashIcon } from "../../pages/homePage/HomePageStyled"

const TrackHistory = ({ searchHistory, handleSearchFromHistory, handleDeleteSearch }) => {
    return (
        <div>
            <h3>Histórico de Pesquisas:</h3>
            <HistoryContainer>
                {searchHistory.map((item, index) => (
                    <li key={index} >
                        <span onClick={() => handleSearchFromHistory(item)} >
                            {item}
                        </span>
                        <StyledTrashIcon
                            onClick={() => handleDeleteSearch(index)}
                            aria-label="Excluir"
                            alt="Lixeira"
                            title="Excluir"
                        />
                    </li>
                ))}
            </HistoryContainer>
        </div>
    )
}
export default TrackHistory
const HistoryContainer = styled.div`
    list-style: none; 
    margin-top: 10px; 
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    background-color: #f8fbfe;
    max-height: 25rem;
    overflow: auto;
    li{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }
`