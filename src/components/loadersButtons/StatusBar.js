import barPost from '../../assets/postagem.gif'
import barAlert from '../../assets/aviso.gif'
import barTransit from '../../assets/transito.gif'
import barReturned from '../../assets/devolucao_transito.gif'
import barDelivered from '../../assets/entrega.gif'

const StatusBar = ({ evento }) => {
    const getBarStatus = (status) => {
        const barStatusDict = {
            "Objeto postado": barPost,
            "Objeto encaminhado": barTransit,
            "Objeto devolvido ao país de origem": barReturned,
            "Objeto entregue ao destinatário": barDelivered,
        }
        return barStatusDict[status] || barAlert
    }

    return (
        <div>
            <img
                src={getBarStatus(evento.status)}
                style={{ display: 'inline-block', margin: '5px', width: '22rem' }}
                alt={evento.status}
                title={evento.status}
            />
        </div>
    )
}
export default StatusBar