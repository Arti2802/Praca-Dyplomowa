import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import axios from "axios";
import { CompetitionTypeDetail } from "../components/CompetitionTypeDetail";
import { DownloadButton } from "../components/DownloadButton";

export const ResultsList = () => {
    const { pk2 } = useParams();
    const [competitionType, setCompetitionType] = useState({});
    const [participations, setParticipations] = useState([]);
    useEffect(() => {
        axios.get(`${ApiURL}/competition_types/${pk2}/`)
        .then(response => {
            console.log(response);
            setCompetitionType(response.data);
        })
        axios.get(`${ApiURL}/competition_types/${pk2}/results/`)
        .then(response => {
            console.log(response);
            setParticipations(response.data);
        })
    }, [pk2])
    return (
        <div className="rectangle px-2">
            <h1><CompetitionTypeDetail competitionType={competitionType}/></h1>
            <DownloadButton link={'results'} competition_type={competitionType} desc={'wyniki'} label={"Pobierz wyniki"}/>
            <h2>Wyniki:</h2>
            <table>
                <thead>
                    <th>Lp.</th>
                    <th>Imię i nazwisko</th>
                    <th>Seria</th>
                    <th>Tor</th>
                </thead>
                <tbody>
                    {participations.length > 0 ? (
                        participations.map((participation) => (
                            <tr key={participation.id}>
                                <td className="col-1">{participation.place}.</td>
                                <td className="col-1">{participation.competitor_id.first_name} {participation.competitor_id.last_name}</td>
                                <td className="col-1">{participation.disqualification ? 'Dyskwalifikacja' : participation.result}</td>                                
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan={3}><h1>Wyniki nie są jeszcze dostępne</h1></td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}