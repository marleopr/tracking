import { styled } from "styled-components"
import { StyledTrashIcon } from "../../pages/homePage/HomePageStyled"

const TrackHistory = ({ searchHistory, handleSearchFromHistory, handleDeleteSearch }) => {
    return (
        <div>
            <h3>Histórico de Pesquisas:</h3>
            <HistoryContainer>
                {searchHistory.map((item, index) => (
                    <li key={index} >
                        <CenteredContent>
                            <span onClick={() => handleSearchFromHistory(item.codigo)} >
                                {item.codigo} - {item.status ? item.status : 'Status não disponível'}
                            </span>
                        </CenteredContent>
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
    width: 100%;
    li{
        display: flex;
        align-items: center;
        margin: 5px;
        margin-top: 5px;
        justify-content: space-between; 
        width: 95%; 
        border-bottom: 1px solid #f1f1f1;
        span {
            margin-right: 8px;
        }
    }
    `
const CenteredContent = styled.div`
  display: flex;
  align-items: center;
`;