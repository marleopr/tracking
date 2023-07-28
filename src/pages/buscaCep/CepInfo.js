import TrackPrint from "../../components/loadersButtons/TrackPrint"

const CepInfo = ({ cepData }) => {
    if (!cepData) {
        return null
    }
    console.log(cepData)
    const handleTrackPrint = () => {
        window.print()
    }

    return (
        <div>
            <h3>Dados do CEP {cepData.cep}</h3>
            <div className="card">
                <div className="tools">
                    <div className="circle">
                        <span className="red box"></span>
                    </div>
                    <div className="circle">
                        <span className="yellow box"></span>
                    </div>
                    <div className="circle">
                        <span className="green box"></span>
                    </div>
                </div>
                <div className="card__content">
                </div>
                <div style={{ textAlign: 'start' }}>
                    <p><strong>CEP:</strong> {cepData.cep}</p>
                    <p><strong>Logradouro:</strong> {cepData.logradouro}</p>
                    <p><strong>Cidade:</strong> {cepData.localidade} - {cepData.uf}</p>
                    <p><strong>complemento:</strong> {cepData.complemento}</p>
                    <p><strong>Bairro:</strong> {cepData.bairro}</p>
                    <p><strong>DDD:</strong> {cepData.ddd}</p>
                    <p><strong>IBGE:</strong> {cepData.ibge}</p>
                    <p><strong>Código do município (SIAFI):</strong> {cepData.siafi}</p>
                </div>
                <h6>Powered by API ViaCEP</h6>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <TrackPrint handleTrackPrint={handleTrackPrint} />
            </div>
        </div>
    )
}
export default CepInfo