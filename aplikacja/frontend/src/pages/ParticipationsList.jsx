import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiURL from "../ApiURL";
import axios from "axios";
import { CompetitionTypeDetail } from "../components/CompetitionTypeDetail";
import { DownloadButton } from "../components/DownloadButton";
import { Loading } from "../components/Loading";

export const ParticipationsList = () => {
    const { pk2 } = useParams();
    const [competitionType, setCompetitionType] = useState({});
    const [participations, setParticipations] = useState([]);
    const [loading, setLoading] = useState(true);
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
            setLoading(false);
        })
    }, [pk2])
    return (
        <div className="rectangle px-2">
            <h1><CompetitionTypeDetail competitionType={competitionType}/></h1>
            <DownloadButton link={'participations'} competition_type={competitionType} desc={'lista_zawodników'} label={'Pobierz listę zawodników'}/>
            <h2>Lista zawodników:</h2>
            <table>
                <thead>
                    <th>Lp.</th>
                    <th>Imię i nazwisko</th>
                    <th>Seria</th>
                    <th>Tor</th>
                </thead>
                <tbody>
                    {loading ? (
                        <Loading/>
                    ) : (
                        participations.length > 0 ? (
                            participations.map((participation, index) => (
                                <tr key={participation.id}>
                                    <td className="col-1">{index+1}.</td>
                                    <td className="col-1">{participation.competitor_id.first_name} {participation.competitor_id.last_name}</td>
                                    <td className="col-1">{participation.series_nr || '-'}</td>
                                    <td className="col-1">{participation.track_nr || '-'}</td>                                
                                </tr>
                            ))) : (
                                <tr>
                                    <td colSpan={4}><h1>Nikt się jeszcze nie zgłosił</h1></td>
                                </tr>
                            )
                    )}
                </tbody>
            </table>
        </div>
    )
}