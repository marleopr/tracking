import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, token, user } from '../../constants/BASE_URL';
import TrackingInfo from '../TrackingInfo';
import LinksExternos from '../../components/linksExternos/LinksExternos';
import { HistoricDiv, TrackCointainer } from './HomePageStyled';
import TrackInput from '../../components/loadersButtons/TrackInput';
import TrackLoader from '../../components/loadersButtons/TrackLoader';
import TrackHistory from '../../components/trackHistory/TrackHistory';
import TrackButtonV2 from '../../components/loadersButtons/TrackButtonV2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import mockData from './mockData';

const HomePage = () => {
    const [apiData, setApiData] = useState(null);
    const [codigo, setCodigo] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

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
            // setError("O código digitado está incorreto. Por favor, insira um código válido no padrão 'NB123456789BR'.");
            toast.error("O código digitado está incorreto. Insira um código válido no padrão 'NB123456789BR'.")
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}user=${user}&token=${token}&codigo=${codigo}`);
            setApiData(res.data);
            setLoading(false);
            setSearchHistory(prevHistory => [...prevHistory, codigo]);
            toast.success('Encomenda rastreada!')
            //DADOS MOCKADOS:
            // setApiData(mockData); // Use the mockData instead
            // setLoading(false);
            // setSearchHistory(prevHistory => [...prevHistory, codigo]);
            // console.log(mockData); // For debugging purposes, log the mockData

        } catch (error) {
            setLoading(false);
            // setError("Ocorreu um erro ao buscar o código de rastreamento. Por favor, tente novamente mais tarde.");
            toast.error("Ocorreu um erro ao buscar o código de rastreamento. Por favor, tente novamente mais tarde.")
        }
    };

    const handleSearch = async () => {
        await getTracks();
    };
    useEffect(() => {
        if (buttonClicked) {
            handleSearch(); // Chama a função de pesquisa
            setButtonClicked(false); // Reseta buttonClicked para false após a pesquisa
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonClicked]);

    // Função para realizar uma nova pesquisa com o código clicado no histórico
    const handleSearchFromHistory = (codigo) => {
        setCodigo(codigo); // Define o código para realizar a pesquisa
        setError(null); // Limpa o estado de erro
        setApiData(null); // Limpa o estado de dados da API
        setButtonClicked(true);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <ToastContainer />
            <TrackCointainer>
                <span>
                    <TrackInput value={codigo.toUpperCase()} onChange={(event) => setCodigo(event.target.value)} />
                </span>
                <span>
                    <TrackButtonV2 handleSearch={handleSearch} buttonClicked={buttonClicked} >Rastrear</TrackButtonV2>
                </span>

            </TrackCointainer>
            {error && <p style={{ color: 'red', width: '70%' }}>{error}</p>}
            {loading ? (
                <TrackLoader />
            ) : (
                apiData ? (
                    <div style={{ margin: '10px' }}>
                        <TrackingInfo trackingData={apiData} />
                    </div>
                ) : (
                    searchHistory.length > 0 && (
                        <HistoricDiv >
                            <LinksExternos />
                            <TrackHistory searchHistory={searchHistory} handleSearchFromHistory={handleSearchFromHistory} handleDeleteSearch={handleDeleteSearch} />
                        </HistoricDiv>
                    )
                )
            )}
        </div>
    );
};
export default HomePage;
