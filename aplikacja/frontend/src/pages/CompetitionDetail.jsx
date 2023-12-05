import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import axios from "axios";

export const CompetitionDetail = () => {
    const { pk } = useParams();
    const [competition, setCompetition] = useState();
    const [competitionTypes, setCompetitionTypes] = useState();
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`)
        .then(response => {
            console.log(response);
            setCompetition(response.data);
        })
    }, [pk])
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/competition_types/`)
        .then(response => {
            console.log(response);
            setCompetitionTypes(response.data);
        })
    }, [pk])
    console.log(competition);
    return (
        <div className="rectangle">
            <p className="text-wrapper">{competition.date_start} - {competition.date_stop}</p>
                <div className="div">{competition.name}</div>
                <div className="text-wrapper-2">Status: {competition.status}</div>
                <div className="text-wrapper-3">{competition.swimming_facility_id}</div>
                <h2>Dostępne konkurencje:</h2>
                <ul>
                    {competitionTypes.length > 0 ? (
                        competitionTypes.map((competitionType) => (
                            <li key={competitionType.id}>
                                <p>{competitionType.length} m styl {competitionType.style}</p>
                            </li>
                        ))) : (
                            <h1>Brak konkurencji</h1>
                        )}
                </ul>
        </div>
    )
}