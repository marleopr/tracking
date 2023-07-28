import { styled } from "styled-components"
import { StyledTrashIcon } from "../../pages/homePage/HomePageStyled"

const CepHistory = ({ cepHistory, handleCepFromHistory, handleDeleteCep }) => {
    return (
        <div>
            <h3>Histórico de Pesquisas:</h3>
            <CepHistoryContainer>
                {cepHistory.map((item, index) => (
                    <li key={index} >
                        <CenteredContent>
                            <span onClick={() => handleCepFromHistory(item.cep)} >
                                {item.cep} - {item.localidade}
                            </span>
                        </CenteredContent>
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