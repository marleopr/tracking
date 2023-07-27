const TrackPrint = ({ handleTrackPrint }) => {
    return (
        <button onClick={handleTrackPrint} className="print-button">
            <span className="print-icon"></span>
        </button>
    )
}
export default TrackPrint