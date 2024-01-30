import React, { useState, useEffect } from "react";
import ApiURL from "../ApiURL";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CompetitionTypeDetail } from "../components/CompetitionTypeDetail";
import { Participation } from "../components/Participation";
import { Loading } from "../components/Loading";

export const SetSeriesAndTracks = () => {
    const navigate = useNavigate();
    const { pk } = useParams();
    const [competitionType, setCompetitionType] = useState({});
    const [participations, setParticipations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [isTrigerred, setIsTrigerred] = useState(1);
    const [clicked, setClicked] = useState(1);
    useEffect(() => {
        axios.get(`${ApiURL}/competition_types/${pk}/`)
        .then(response => {
            setCompetitionType(response.data);
            setLoading(false);
        })
        axios.get(`${ApiURL}/competition_types/${pk}/participations/`)
        .then(response => {
            setParticipations(response.data);
            setLoading2(false);
        })
    }, [pk]);
    const [errors, setErrors] = useState(participations.length);
    const handleTrigger = () => {
        setIsTrigerred(prev => prev +1);
        setClicked(prev => prev +1);
    }
    const handleBack = () => {
        const id = competitionType.competition_id ? competitionType.competition_id.id : null;
        navigate(`/zawody/${id}`);
    }
    return (
        <div className="zawody">
            {loading ? <Loading/> : <h1><CompetitionTypeDetail competitionType={competitionType}/></h1>}
            <div className="div">
                <form>
                    <table className="table table-borderless">
                        {loading2 ? <Loading/> : (
                            <tbody>
                            {participations.length > 0 ? (
                            participations.map((participation) => (
                                <Participation key={participation.id} participation={participation} gotChanged={isTrigerred} set={setIsTrigerred} er={errors} errors={setErrors}/>
                            ))) : (
                                <tr>
                                    <td>
                                        <h1>Jeszcze nikt się nie zgłosił</h1>
                                    </td>
                                </tr>
                            )}
                                <tr>
                                    <td>
                                        <div className="my-4"><button className="btn btn-success" type="button" onClick={handleTrigger} >Zatwierdź</button></div>
                                    </td>
                                    {clicked> 1 ? (
                                        <td><button className="btn btn-success" type="button" onClick={handleBack} >Powrót do zawodów</button></td>
                                    ) : null}
                                </tr>
                            </tbody>
                        )}
                    </table>
                </form>
            </div>
        </div>
    );
}