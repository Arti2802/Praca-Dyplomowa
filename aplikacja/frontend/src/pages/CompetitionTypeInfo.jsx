import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import axios from "axios";

export const CompetitionTypeInfo = () => {
    const {pk, pk2} = useParams();
    const [competitionType, setCompetitionType] = useState({});
    const [participations, setParticipations] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competition_types/${pk2}/`)
        .then(response => {
            console.log(response);
            setCompetitionType(response.data);
        })
        axios.get(`${ApiURL}/competition_types/${pk2}/participations/`)
        .then(response => {
            console.log(response);
            setParticipations(response.data);
        })
    }, [pk2])
    return (
        <div className="rectangle">
            <h1>{competitionType.length} m styl {competitionType.style}</h1>
            <h2>Lista zawodników:</h2>
            <ul>
                {participations.length > 0 ? (
                    participations.map((participation) => (
                        <li key={participation.id}>
                            {participation.competitor_id.first_name} {participation.competitor_id.last_name}
                        </li>
                    ))) : (
                        <h1>Nikt się jeszcze nie zgłosił</h1>
                    )}
            </ul>
        </div>
    )
}