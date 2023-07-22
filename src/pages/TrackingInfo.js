import React from 'react';
import {
    Box,
} from "@chakra-ui/react";
import { FaTruck, FaFlag, FaCheck, FaBox, FaExclamationCircle } from "react-icons/fa"; // Aqui importamos os ícones do pacote react-icons/fa

const getIconForStatus = (status) => {
    const statusDict = {
        "Objeto postado": <FaBox />,
        "Objeto recebido pelos Correios do Brasil": <FaFlag />,
        "Fiscalização aduaneira finalizada": <FaCheck />,
        "Objeto encaminhado": <FaTruck />,
        "Objeto saiu para entrega ao destinatário": <FaExclamationCircle />,
        "Objeto entregue ao destinatário": <FaCheck />
    }
    return statusDict[status] || <FaBox />
}

const TrackingInfo = ({ trackingData }) => {
    if (!trackingData) {
        return null;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <h2>Dados de rastreamento para: {trackingData.codigo}</h2>
                {trackingData.eventos.map((evento, index) => {
                    // Separa a origem e o destino a partir do array subStatus
                    const [origem, destino] = evento.subStatus.map((sub) => sub.split(": ")[1]);

                    return (
                        <div key={index} style={{ border: '1px solid black', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
                            <Box mb="4" fontSize="2xl">
                                {getIconForStatus(evento.status)} {/* Ícone correspondente ao status */}
                                {evento.status}
                            </Box>
                            <p><strong>Local:</strong> {evento.local}</p>
                            <p><strong>Data:</strong> {evento.data} às {evento.hora}</p>
                            <p><strong>Origem:</strong> {origem}</p>
                            {destino && <p><strong>Destino:</strong> {destino}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrackingInfo;
