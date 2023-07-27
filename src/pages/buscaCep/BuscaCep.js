import axios from "axios"
import { useState } from "react"

const BuscaCep = () => {
    const [codigo, setCodigo] = useState("")

    const getCep = async () => {
        const cep = await axios.get(`https://viacep.com.br/ws/${codigo}/json/`)
        console.log(cep)

    }
    const handleGetCep = () => {
        getCep()
    }

    return (
        <div>
            Busca CEP
            <input type="number" value={codigo} onChange={(event) => setCodigo(event.target.value)} />
            <button onClick={handleGetCep} />
        </div>
    )
}
export default BuscaCep

