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
import { goToBuscaCep } from '../../routes/Cordinator';
import { useNavigate } from 'react-router-dom';
import TrackButton from '../../components/loadersButtons/TrackButton';

// import mockData from './mockData';

const HomePage = () => {
    const [apiData, setApiData] = useState(null);
    const [codigo, setCodigo] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate()

    const handleNavigate = () => {
        goToBuscaCep(navigate)
    }

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
            console.log(res.data)
            console.log(res.data.eventos[0].status)

            // setSearchHistory(prevHistory => [...prevHistory, codigo]);
            setSearchHistory(prevHistory => [...prevHistory, { codigo: codigo, status: res.data.eventos?.[0]?.status }]);
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
                    <TrackInput placeholder={"Digite seu código aqui"} value={codigo.toUpperCase()} onChange={(event) => setCodigo(event.target.value)} />
                </span>
                <span>
                    <TrackButtonV2 onClick={handleSearch} buttonClicked={buttonClicked} label='Rastrear' iconSvg={<path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />} />
                </span>

            </TrackCointainer>
            <LinksExternos />
            <TrackButton onClick={handleNavigate} label='Buscar CEP' iconSvg={<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />} />
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
                            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            </div> */}
                            <TrackHistory searchHistory={searchHistory} handleSearchFromHistory={handleSearchFromHistory} handleDeleteSearch={handleDeleteSearch} />
                        </HistoricDiv>
                    )
                )
            )}
        </div>
    );
};
export default HomePage;
