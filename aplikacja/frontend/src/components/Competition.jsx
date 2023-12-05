export const Competition = ({competition, fn}) => {
    return (
        <li key={competition.id}>
            <div className="rectangle">
                <p className="text-wrapper">{competition.date_start} - {competition.date_stop}</p>
                <div className="div">{competition.name}</div>
                <div className="text-wrapper-2">Status: {competition.status}</div>
                <div className="text-wrapper-3">{competition.swimming_facility_id}</div>
                <a href="/edytujZawody"><button>Edytuj</button></a>
                <button onClick={fn}>Usuń</button>
            </div>
        </li>
    )
}