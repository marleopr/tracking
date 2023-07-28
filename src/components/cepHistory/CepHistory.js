import { styled } from "styled-components"
import { StyledTrashIcon } from "../../pages/homePage/HomePageStyled"

const CepHistory = ({ cepHistory, handleCepFromHistory, handleDeleteCep }) => {
    return (
        <div>
            <h3>Histórico de Pesquisas:</h3>
            <CepHistoryContainer>
                {cepHistory.map((item, index) => (
                    <li key={index} >
                        <span onClick={() => handleCepFromHistory(item)} >
                            {item}
                        </span>
                        <StyledTrashIcon
                            onClick={() => handleDeleteCep(index)}
                            aria-label="Excluir"
                            alt="Lixeira"
                            title="Excluir"
                        />
                    </li>
                ))}
            </CepHistoryContainer>
        </div>
    )
}
export default CepHistory
const CepHistoryContainer = styled.div`
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