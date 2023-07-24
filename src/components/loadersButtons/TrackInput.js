const TrackInput = ({ value, onChange }) => {
    return (
        <input type="text" placeholder="Digite aqui" name="text" className="input" value={value} onChange={onChange}></input>
    )
}
export default TrackInput