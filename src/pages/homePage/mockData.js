// mockData.js
const mockData = {
    codigo: 'NB416643030BR',
    host: 'rd',
    eventos: [
        {
            data: '26/07/2023',
            hora: '10:27',
            local: 'Santa Cruz Do Sul / RS',
            status: 'Objeto postado',
            subStatus: ['Local: Unidade de Distribuição - Santa Cruz Do Sul / RS'],
        },
        {
            data: '26/07/2023',
            hora: '10:27',
            local: 'Santa Cruz Do Sul / RS',
            status: 'Objeto encaminhado',
            subStatus: ['Local: Unidade de Distribuição - Santa Cruz Do Sul / RS'],
        },
        {
            data: '26/07/2023',
            hora: '10:27',
            local: 'Santa Cruz Do Sul / RS',
            status: 'Objeto entregue ao destinatário',
            subStatus: ['Local: Unidade de Distribuição - Santa Cruz Do Sul / RS'],
        },
        // Add more events as needed
    ],
    time: 0.033,
    quantidade: 10,
    // Add other properties if required
};

export default mockData;
