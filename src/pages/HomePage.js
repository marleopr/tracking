import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, token, user } from '../constants/BASE_URL';
import TrackingInfo from './TrackingInfo';
import { FaTrash } from 'react-icons/fa';

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
            handleSearch(); // Chama a função de pesquisa novamente
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
            <div>
                <input type='text' placeholder='Digite aqui' value={codigo} onChange={(event) => setCodigo(event.target.value)} />
                <button onClick={handleSearch}>Rastrear</button>
            </div>
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
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <h2>Histórico de Pesquisas:</h2>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {searchHistory.map((item, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                        <span onClick={() => handleSearchFromHistory(item)} style={{ cursor: 'pointer' }}>
                                            {item}
                                        </span>
                                        <FaTrash
                                            style={{ marginLeft: '5px', cursor: 'pointer' }}
                                            onClick={() => handleDeleteSearch(index)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                )
            )}
        </div>
    );
};
export default HomePage;
