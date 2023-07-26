import barPost from '../../assets/postagem.gif'
import barAlert from '../../assets/aviso.gif'
import barTransit from '../../assets/transito.gif'
import barDelivered from '../../assets/entrega.gif'

const StatusBar = ({ evento }) => {
    const getBarStatus = (status) => {
        const barStatusDict = {
            "Objeto postado": barPost,
            "Objeto encaminhado": barTransit,
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
        // <div>
        //     {trackingData.eventos.map((item, index) => {
        //         return (
        //             <img
        //                 key={index}
        //                 src={getBarStatus(item.status)}
        //                 style={{ display: 'inline-block', margin: '5px' }}
        //                 alt={item.status}
        //                 title={item.status}
        //             />
        //         )
        //     })}

        // </div>
    )
}
export default StatusBar