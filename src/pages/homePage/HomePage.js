import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, token, user } from '../../constants/BASE_URL';
import TrackingInfo from '../TrackingInfo';
import LinksExternos from '../../components/linksExternos/LinksExternos';
import { HistoricDiv, StyledTrashIcon, TrackCointainer } from './HomePageStyled';
import TrackButton from '../../components/loadersButtons/TrackButton';
import TrackInput from '../../components/loadersButtons/TrackInput';
const HomePage = () => {
    const [apiData, setApiData] = useState(null);
    const [codigo, setCodigo] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Função auxiliar para recuperar o histórico do localStorage
    const getSearchHistoryFromLocalStorage = () => {
        const savedHistory = localStorage.getItem('searchHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    };
    const [searchHistory, setSearchHistory] = useState(getSearchHistoryFromLocalStorage());

    const handleDeleteSearch = (indexToDelete) => {
        setSearchHistory((prevHistory) => {
            const updatedHistory = prevHistory.filter((item, index) => index !== indexToDelete)
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
            return updatedHistory
        })
    }

    // Salvar o histórico no localStorage sempre que for atualizado
    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);



    const getTracks = async () => {
        setError(null);
        const codePattern = /^[a-zA-Z]{1,2}\d{9}[a-zA-Z]{1,2}$/;
        if (!codigo.match(codePattern)) {
            setError("O código digitado está incorreto. Por favor, insira um código válido no padrão 'NB123456789BR'.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}user=${user}&token=${token}&codigo=${codigo}`);
            setApiData(res.data);
            setLoading(false);
            setSearchHistory(prevHistory => [...prevHistory, codigo]);
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            setError("Ocorreu um erro ao buscar o código de rastreamento. Por favor, tente novamente mais tarde.");
            console.log(error);
        }
    };

    const handleSearch = async () => {
        await getTracks();
    };

    // Função para realizar a pesquisa sempre que o estado `codigo` for atualizado
    useEffect(() => {
        if (codigo.trim() !== '') {
            // handleSearch(); // Chama a função de pesquisa novamente
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codigo]);

    // Função para realizar uma nova pesquisa com o código clicado no histórico
    const handleSearchFromHistory = (codigo) => {
        setCodigo(codigo); // Define o código para realizar a pesquisa
        setError(null); // Limpa o estado de erro
        setApiData(null); // Limpa o estado de dados da API
        handleSearch(); // Chama a função de pesquisa novamente
    };



    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <TrackCointainer>
                <span>
                    {/* <input type='text' placeholder='Digite aqui' value={codigo} onChange={(event) => setCodigo(event.target.value)} /> */}
                    <TrackInput value={codigo} onChange={(event) => setCodigo(event.target.value)} />
                </span>
                <span>
                    {/* <button onClick={handleSearch}>Rastrear</button> */}
                    <TrackButton handleSearch={handleSearch}>Rastrear</TrackButton>
                </span>

            </TrackCointainer>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Carregando...</p>
            ) : (
                apiData ? (
                    <div style={{ margin: '10px' }}>
                        <TrackingInfo trackingData={apiData} />
                    </div>
                ) : (
                    searchHistory.length > 0 && (
                        <HistoricDiv style={{ marginTop: '20px', textAlign: 'center' }}>
                            <LinksExternos />
                            <h2>Histórico de Pesquisas:</h2>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {searchHistory.map((item, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
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
                            </ul>
                        </HistoricDiv>
                    )
                )
            )}
        </div>
    );
};
export default HomePage;
