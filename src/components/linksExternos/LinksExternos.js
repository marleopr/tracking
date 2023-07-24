import { Logo, Main } from "./LinksExternosStyled";

const LinksExternos = () => {
    const transportadoras = [
        {
            nome: 'Azul',
            url: 'https://www.transportadora1.com.br',
            logoUrl: 'https://melhorrastreio.com.br/files/azul-cargo-express.b4f85de7.svg'
        },
        {
            nome: 'BuscoLog',
            url: 'https://www.transportadora2.com.br',
            logoUrl: 'https://melhorrastreio.com.br/files/buslog.8c89e02f.svg'
        },
        {
            nome: 'JadLog',
            url: 'https://www.transportadora1.com.br',
            logoUrl: 'https://melhorrastreio.com.br/files/jadlog.e67d781e.svg'
        },
        {
            nome: 'Latam',
            url: 'https://www.transportadora2.com.br',
            logoUrl: 'https://melhorrastreio.com.br/files/latam-airlines.95faa23b.svg'
        },
        {
            nome: 'Loggi',
            url: 'https://www.transportadora1.com.br',
            logoUrl: 'https://melhorrastreio.com.br/files/loggi.b39c8df1.svg'
        },
        {
            nome: 'MelhorEnvio',
            url: 'https://www.transportadora2.com.br',
            logoUrl: 'https://melhorrastreio.com.br/files/melhorenvio.3b490f17.svg'
        },
        {
            nome: 'ViaMundo',
            url: 'https://www.transportadora1.com.br',
            logoUrl: 'https://app.melhorrastreio.com.br/files/correios.abc01ab5.svg'
        },
        {
            nome: 'Transportadora 2',
            url: 'https://www.transportadora2.com.br',
            logoUrl: 'https://melhorrastreio.com.br/files/viamundo.59c8a0ff.svg'
        },
        {
            nome: 'Total Express',
            url: 'https://totalexpress.com.br/rastrear-um-produto/',
            logoUrl: 'https://logodownload.org/wp-content/uploads/2019/09/total-express-logo-2.png'
        },

    ];
    return (
        <Main>
            {transportadoras.map((transportadora, index) => (
                <a
                    key={index}
                    href={transportadora.url}
                    alt={transportadora.nome}
                    title={transportadora.nome}
                    target="_blank"
                    rel="noopener noreferrer"
                    // style={{ display: 'inline-block', margin: '10px', width: '50px', height: '20px' }}
                >
                    <Logo className="nomeDaClassDaFoto" src={transportadora.logoUrl} alt={transportadora.nome} />
                </a>
            ))}
        </Main>
    );
};
export default LinksExternos