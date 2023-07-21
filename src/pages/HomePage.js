import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, token, user } from '../constants/BASE_URL';
import TrackingInfo from './TrackingInfo';

const HomePage = () => {
    const [apiData, setApiData] = useState(null);
    const [codigo, setCodigo] = useState("")
    const [error, setError] = useState(null)
    const getTracks = async () => {
        setError(null);
        const codePattern = /^[a-zA-Z]{1,2}\d{9}[a-zA-Z]{1,2}$/;
        if (!codigo.match(codePattern)) {
            setError("O código digitado está incorreto. Por favor, insira um código válido no padrão 'NB123456789BR'.");
            return;
        }
        try {
            const res = await axios.get(`${BASE_URL}user=${user}&token=${token}&codigo=${codigo}`)
            setApiData(res.data);
            console.log(res.data);
        } catch (error) {
            setError("Ocorreu um erro ao buscar o código de rastreamento. Por favor, tente novamente mais tarde.");
            console.log(error);
        }
    }

    const handleSearch = async () => {
        // Faz a chamada à API somente quando o usuário clicar no botão "Buscar"
        await getTracks();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <input type='text' placeholder='Digite aqui' value={codigo} onChange={(event) => setCodigo(event.target.value)} />
                <button onClick={handleSearch}>Rastrear</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {apiData ? (
                <div style={{ margin: '10px' }}>
                    <TrackingInfo trackingData={apiData} />
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default HomePage;
