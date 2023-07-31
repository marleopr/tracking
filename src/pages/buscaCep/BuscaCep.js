import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import CepInfo from "./CepInfo"
import TrackLoader from "../../components/loadersButtons/TrackLoader"
import { useNavigate } from "react-router-dom"
import { goToHomePage } from "../../routes/Cordinator"
import TrackButtonV2 from "../../components/loadersButtons/TrackButtonV2"
import TrackInput from "../../components/loadersButtons/TrackInput"
import { CepCointainer, HistoricCepDiv } from "./CepStyled"
import TrackButton from "../../components/loadersButtons/TrackButton"
import CepHistory from "../../components/cepHistory/CepHistory"

const BuscaCep = () => {
    const navigate = useNavigate()
    const [codigoCep, setCodigoCep] = useState("")
    const [cepData, setCepData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);


    // Função auxiliar para recuperar o histórico do localStorage
    const getcepHistoryFromLocalStorage = () => {
        const savedCepHistory = localStorage.getItem('cepHistory');
        return savedCepHistory ? JSON.parse(savedCepHistory) : [];
    };
    const [cepHistory, setCepHistory] = useState(getcepHistoryFromLocalStorage());

    const handleDeleteCep = (indexToDeleteCep) => {
        setCepHistory((prevCepHistory) => {
            const updatedCepHistory = prevCepHistory.filter((item, index) => index !== indexToDeleteCep)
            localStorage.setItem('cepHistory', JSON.stringify(updatedCepHistory))
            return updatedCepHistory
        })
    }

    // Salvar o histórico no localStorage sempre que for atualizado
    useEffect(() => {
        localStorage.setItem('cepHistory', JSON.stringify(cepHistory));
    }, [cepHistory]);

    const getCep = async () => {
        try {
            const res = await axios.get(`https://viacep.com.br/ws/${codigoCep}/json/`)
            if (res.data.erro) {
                setCepData(null); // Define como null para indicar que os dados do CEP não foram encontrados
                setLoading(false);
                toast.error("O CEP digitado não foi encontrado ou é inválido.");
            } else {
                setCepData(res.data);
                setLoading(false);
                setCepHistory(prevCepHistory => [...prevCepHistory, { cep: codigoCep, localidade: res.data.localidade }]);
                toast.success("CEP encontrado!");
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.");
        }
    };

    const handleGetCep = async () => {
        await getCep()
    }

    useEffect(() => {
        if (buttonClicked) {
            handleGetCep()
            setButtonClicked(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonClicked])

    // Função para realizar uma nova pesquisa com o código clicado no histórico
    const handleCepFromHistory = (codigoCep) => {
        setCodigoCep(codigoCep); // Define o código para realizar a pesquisa
        setCepData(null); // Limpa o estado de dados da API
        setButtonClicked(true);
    };
    const handleReloadHomePage = () => {
        window.location.reload();
    };

    const isCodigoValido = codigoCep.trim() !== '';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <TrackButton onClick={() => goToHomePage(navigate)} label='Voltar' iconSvg={<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <CepCointainer>
                    <span>
                        <TrackInput type="number" placeholder="Digite o CEP aqui" value={codigoCep} onChange={(event) => setCodigoCep(event.target.value)} />
                    </span>
                    <span>
                        <TrackButtonV2 onClick={handleGetCep} disabled={!isCodigoValido} label='Buscar' iconSvg={<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />} />
                    </span>
                </CepCointainer>
            </div>
            {loading ? (
                <TrackLoader />
            ) : (
                cepData ? (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <TrackButton onClick={handleReloadHomePage} label='Nova pesquisa' style={{ fontSize: '14px' }} iconSvg={<path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />} />
                        </div>
                        <CepInfo cepData={cepData} />
                    </div>
                ) : (
                    cepHistory.length > 0 && (
                        <HistoricCepDiv >
                            <CepHistory cepHistory={cepHistory} handleCepFromHistory={handleCepFromHistory} handleDeleteCep={handleDeleteCep} />
                        </HistoricCepDiv>

                    )
                )
            )}
            <ToastContainer />

        </div>
    )
}
export default BuscaCep